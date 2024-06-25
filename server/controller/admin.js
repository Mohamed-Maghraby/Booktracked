const express = require('express')
const database = require('../model/database');
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require("jsonwebtoken");
const { json, query } = require('express');
const upload = require('../middleware/upload'); // Assuming multer middleware is defined in 'middleware/upload.js'




const mysql_promise = database.promise()



async function login (req, res) {
    
    let existed_user_token = req.cookies.user_token

    if (existed_user_token ) {
        res.json({message : "There is a user already logged in, please log out first"});
        return;
    }

    //extract body values
    const data = await req.body;
    let {email , password, terms_of_use} = data;

    //check if any of info is empty
    if(!email|| !password ) {
        res.json({message : "please fill requierd fields"});
        return;
    }

    const emailQuery = "SELECT COUNT(*) AS count FROM admin WHERE email = ?"

    // checks if email exists in database, returns boolean
    async function checkEmailExistence (email) {
        const [count] =  await mysql_promise.execute(emailQuery, [email])
        const checkEmail = count[0].count > 0;
        console.log(checkEmail);
        return checkEmail;
    }

    let isEmailExistes = await checkEmailExistence(email);

    //if user does not exists, no user with this mail
    if (!isEmailExistes) {
        res.json({message : "No user is reisterd with that account"});
        return;
    }

    const retrieveUserInfoQuery = "SELECT admin_id, username, password FROM admin WHERE email = ?"

    //retrieve user infor (id, username, password) from datapase
    async function retrieveUserInfo (email) {
        return new Promise((resolve, reject)=>{
            database.query(retrieveUserInfoQuery, email, (error, result)=>{
                console.log(result);
                const userInfo = result[0];
                resolve(userInfo);
            });
        });
    }

    let userInfoFromDatabase = await retrieveUserInfo(email)

    let storedPassword = userInfoFromDatabase.password
    let storedUsername = userInfoFromDatabase.username
    let storedAdminId= userInfoFromDatabase.user_id

    console.log(storedAdminId);

    //compare password with hashed password
    let comparePassword = await storedPassword === password

    if (comparePassword) {
        const jwtToken = generateToken(storedAdminId, storedUsername)

        res.cookie('user_token', jwtToken,{
            httpOnly: true,
            maxAge: 86400000,
            // secure: true,
            sameSite: 'Lax'
        })
        res.json({
            message: "You are Logged In",
            username : storedUsername,
            userType : 'admin'
        })

        return; 
    } else {
        res.json({message : "Wrong Password"})
        return;
    }

}

async function logout (req, res) {
    res.clearCookie('user_token', {
        httpOnly: true,
        maxAge: 0,
        // secure: true,
        sameSite: 'Lax',
    })    
    res.json("user-logged out") 
}

//Generate jwt token 
const generateToken = (id, username) => {
    return jwt.sign({id, username}, process.env.JWT_SECRET_KEY, {expiresIn : '1d'});
}

async function listUsers(req, res) {
    const { limit, offset } = req.body;

    // Validate limit and offset
    const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10; // default limit to 10 if not provided or invalid
    const validOffset = Number.isInteger(offset) && offset >= 0 ? offset : 0; // default offset to 0 if not provided or invalid

    const listUsersQuery = 'SELECT user_id, username, email FROM user ORDER BY user_id LIMIT ? OFFSET ?';

    try {
        const [rows] = await mysql_promise.execute(listUsersQuery, [validLimit, validOffset]);
        // Ensure that only necessary data is sent back
        const users = rows.map(row => ({
            user_id: row.user_id,
            username: row.username,
            email: row.email,
        }));
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

async function searchUser(req, res) {
    let data = req.body
    const searchValue = data.user_id || data.username || data.email
    const searchParam = Object.entries(req.body).find(([key, val]) => val === searchValue)?.[0];
    const searchUsersQuery = `SELECT user_id, username, email FROM user WHERE ${searchParam} = ?`;

    try {
        const [result] = await mysql_promise.execute(searchUsersQuery, [searchValue]);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

async function deleteUser(req, res) {
    let data = req.body;
    let user_id = data.user_id;
    console.log(user_id);
    const deleteUserQuery = `DELETE FROM user WHERE user_id = ?`;
    try {
        const [result] = await mysql_promise.execute(deleteUserQuery, [user_id]);
        res.json({message : 'User Deleted Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

async function updateUser(req, res) {
    let data = req.body;
    const {user_id, username, email} = data;
    const changedField = {
        state : ''
    }
    const updateUserQuery = ()=>{
        if (username && email) {
            changedField.state = 'both'
            return `UPDATE user SET username = ?, email = ? WHERE user_id = ?`;
        } else if (username) {
            changedField.state = 'username'
            return  `UPDATE user SET username = ? WHERE user_id = ?`;
        } else if (email) {
            changedField.state = 'email'
            return `UPDATE user SET email = ? WHERE user_id = ?`;
        }
    }
    console.log(user_id);
    // const updateUserQuery = `UPDATE user SET username = ?, email = ? WHERE user_id = ?`;
    try {
        const [result] = await mysql_promise.execute(updateUserQuery(), [username, email, user_id]);
        console.log(result);
        res.status(200)
        res.json({message : 'User Updated Successfully', changedField : changedField});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}



async function ListBooks(req, res) {
    const { limit, offset } = req.body;

    // Validate limit and offset
    const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10; // default limit to 10 if not provided or invalid
    const validOffset = Number.isInteger(offset) && offset >= 0 ? offset : 0; // default offset to 0 if not provided or invalid

    const ListBooks = 'SELECT book_id, title, author FROM books ORDER BY book_id LIMIT ? OFFSET ?';

    try {
        const [rows] = await mysql_promise.execute(ListBooks, [validLimit, validOffset]);
        // Ensure that only necessary data is sent back
        const books = rows.map(row => ({
            book_id: row.book_id,
            title: row.title,
            author: row.author,
        }));
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
}

async function getUserLibrary(req, res) {
    let data = req.body
    let user_id = data.user_id

    const getUserLibraryQuery = `
    SELECT b.*
    FROM user_library ul
    JOIN books b ON ul.book_id = b.book_id
    WHERE ul.user_id = ?
    `;

    try {
        const [result] = await mysql_promise.execute(getUserLibraryQuery, [user_id]);
        res.json({message : '', result: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }

}

async function createResource(req, res) {
    // Use multer middleware to handle file uploads
    try {
        const { title, author , resource_type} = req.body;
        const cover = req.files['cover'][0].buffer; // Access the uploaded file buffer
        const original_name = req.files['resource_storage'][0].originalname; // Access the uploaded file originalname
        const mime_type = req.files['resource_storage'][0].mimetype; // Access the uploaded file mimetype
        const resource_storage = req.files['resource_storage'][0].buffer; // Access the uploaded file buffer

        console.log(req.files);

        const query = `
            INSERT INTO local_resources (original_name, resource_type, title, cover, author, mime_type, resource_storage)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [original_name, resource_type, title, cover, author, mime_type, resource_storage];

        const [result] = await mysql_promise.execute(query, values);

        res.status(201).json({ message: 'Book created successfully', resourceId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the book' });
    }
}

async function downloadResource(req, res) {
    const searchParam = req.query.resource_id;
    const downloadResourceQuery = `SELECT original_name, title, mime_type, resource_storage FROM local_resources WHERE resource_id = ?`;

    try {
        const [result] = await mysql_promise.execute(downloadResourceQuery, [searchParam]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        const resource = result[0];
        const originalName = resource.original_name;
        const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
        const fileName = `${resource.title}${fileExtension}`;
        const fileBuffer = resource.resource_storage;

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', resource.mime_type);
        res.setHeader('Content-Length', fileBuffer.length);

        res.send(fileBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the resource.' });
    }
}

async function listResources(req, res) {
    const listResourcesQuery = `SELECT original_name, resource_type, title, cover, author FROM local_resources`;

    try {
        const [result] = await mysql_promise.execute(listResourcesQuery);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the resource.' });
    }
}





module.exports = {login, logout, listUsers, searchUser, deleteUser, getUserLibrary, createResource, downloadResource, listResources, updateUser, ListBooks};