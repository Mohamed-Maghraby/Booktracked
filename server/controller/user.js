const express = require('express')
const database = require('../model/database');
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require("jsonwebtoken");
const { json, query } = require('express');



async function register (req, res) {

    let existed_user_token = await req.cookies.user_token

    if (existed_user_token) {
        res.json({message : "There is a user already logged in, please log out first"});
        return;
    }
    console.log(existed_user_token);


    /* Validation  */

    //extract body values
    const data = await req.body;
    let {username, email , password, confirm_password, terms_of_use} = data;

    //check if any of info is empty
    if(!username || !email|| !password || !confirm_password || !terms_of_use) {
        res.status()
        res.json({message : "please fill requierd fields"});
        return;
    }

    //email constrains , regex
    let emailRegex = new RegExp("^[a-zA-Z0-9]*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    // validate mail
    if(!emailRegex.test(email) ) {
        res.json({message : "unvalid email"})
        return;
    }

    //validate password
    if (!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {

        let passwordConstrains = "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1";
        res.json({message : "unvalid Password "+ passwordConstrains})
        return;
    }
    if (!validator.equals(password, confirm_password)) {
        res.json({message : "confirm Password doesn't match"});
        return;
    }

    //validate terms of usse
    if(terms_of_use = false) {
        res.json({message : "You have to agree on terms of use"});
        return;
    }
   
    /* Check Uniquness of email & username */
    
    const usernameQuery = "SELECT COUNT(*) AS count FROM user WHERE username = ?"
    const emailQuery = "SELECT COUNT(*) AS count FROM user WHERE email = ?"

    //checks if username exists in database, returns boolean
    async function checkUsernameExistence (username) {
        return new Promise((resolve, reject)=>{
            database.query(usernameQuery, username, (error, result)=>{
                //check existince of username
                console.log(result);
                const checkUsername = result[0].count > 0;
                resolve(checkUsername);
            });
        });
    }

    //checks if email exists in database, returns boolean
    async function checkEmailExistence (email) {
        return new Promise((resolve, reject)=>{
            database.query(emailQuery, email, (error, result)=>{
                //check existince of email
                console.log(result);
                const checkEmail = result[0].count > 0;
                resolve(checkEmail);
            });
        });
    }

    let isUsernameExistes = await checkUsernameExistence(username);
    let isEmailExistes = await checkEmailExistence(email);

    //if user exists = true, user can not use current username
    if (isUsernameExistes && isEmailExistes) {
        res.json({message : "Username & Email Existed"})
        console.log("Username & Email Existed");
        return;
    }

    //if username exists = true, user can not use current emil
    if (isUsernameExistes) {
        res.json({message : "Username existed"})
        return;
    }

    //if mail exists = true, user can not use current emil
    if (isEmailExistes) {
        res.json({message : "Email existed"})
        return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //add user query and values
    const addUserQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    const userValue = [username, email, hash];

    //add user to database
    database.query(addUserQuery, userValue, (error, result)=>{
        if (error) {
            res.json({message : "Server Error" + error})
            return;
        }
    })

    const getUserIdQuery = "SELECT user_id FROM user WHERE email = ?"

    //search user id in datapase
    async function getUserId (email) {
        return new Promise((resolve, reject)=>{
            database.query(getUserIdQuery, email, (error, result)=>{
                const userId = result[0].user_id;
                resolve(userId);
            });
        });
    }

    let userId = await getUserId(email);
    console.log(userId);

    console.log(generateToken(userId, username));

    const jwtToken = generateToken(userId, username)

    if (userId) {

        // let currentDate  = new Date();

        res.cookie('user_token', jwtToken,{
            httpOnly: true,
            // maxAge: new Date(currentDate.getTime() + 24 * 60 * 60),
            // secure: true,
            // sameSite: 'Lax'
        })
       await res.json({
            message: "User Registerd Successfully",
            // userToken: generateToken(userId, username)
        })
    }

}


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

    const emailQuery = "SELECT COUNT(*) AS count FROM user WHERE email = ?"

    //checks if email exists in database, returns boolean
    async function checkEmailExistence (email) {
        return new Promise((resolve, reject)=>{
            database.query(emailQuery, email, (error, result)=>{
                //returns true if mail exists
                const checkEmail = result[0].count > 0;
                resolve(checkEmail);
            });
        });
    }

    let isEmailExistes = await checkEmailExistence(email);

    //if user does not exists, no user with this mail
    if (!isEmailExistes) {
        res.json({message : "No user is reisterd with that account"});
        return;
    }

    const retrieveUserInfoQuery = "SELECT user_id, username, password FROM user WHERE email = ?"

    //retrieve user infor (id, username, password) from datapase
    async function retrieveUserInfo (email) {
        return new Promise((resolve, reject)=>{
            database.query(retrieveUserInfoQuery, email, (error, result)=>{
                const userInfo = result[0];
                resolve(userInfo);
            });
        });
    }

    let userInfoFromDatabase = await retrieveUserInfo(email)

    let hashedPassword = userInfoFromDatabase.password
    let storedUsername = userInfoFromDatabase.username
    let storedUserId= userInfoFromDatabase.user_id

    console.log(storedUserId);


    //compare password with hashed password
    let comparePassword = await bcrypt.compare(password, hashedPassword)

    if (comparePassword) {
        const jwtToken = generateToken(storedUserId, storedUsername)

        res.cookie('user_token', jwtToken,{
            httpOnly: true,
            maxAge: 86400000,
            // secure: true,
            sameSite: 'Lax'
        })
        res.json({
            message: "You are Logged In",
            username : storedUsername,
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

module.exports = {register, login, logout};