const { json, application } = require('express');
const database = require('../model/database');
const API_Search = require('../API_Search.json')

async function getBook(req, res) {

    let user_id = await req.user_id
    console.log(user_id);

    // SQL query to select books from books table based on user_id and book_id in user library using a join table
    const query = `
    SELECT b.*
    FROM user_library ul
    JOIN books b ON ul.book_id = b.book_id
    WHERE ul.user_id = ?
    `;

    // Execute the SQL query
    database.query(query, [user_id], (err, results) => {
        if (err) {
        console.error('Error executing SQL query:', err);
        return;
        }
        // console.log(results);
        res.json({message: `Your User ID Is ${user_id}`, data: results})
    })
}

module.exports = getBook;