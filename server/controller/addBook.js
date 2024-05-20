const { json } = require('express');
const database = require('../model/database');

async function addBook(req, res) {

    const data = await req.body;
    console.log(data)

    const query = 'INSERT INTO books (book_id, title, author, cover, download_html) VALUES (?, ?, ?, ?, ?)';
    const values = [data.book_id, data.title, data.author, data.cover, data.download_html];

    database.query(query, values, (error, result) => {
        if (error) {
            console.error('Error executing query:', error.code);
        } else { 
            console.log('Query executed successfully');
        }
    });

    //extract user.id from req and book_id from body 
    const user_id = req.user_id;
    const book_id = data.book_id;
    console.log(user_id + " " + book_id);
    
    const query2 = 'INSERT INTO user_library (user_id, book_id) VALUES (?, ?)';
    const values2 = [user_id, book_id];
    database.query(query2, values2, (error, result) => { 
         if (error) {
            if (error.errno == 1062) {
                res.json({message : 'The book is aleady in your library', insertionCode: error.errno});
            }
            console.error('Error executing query:', error.code);
        } else { 
            console.log('Query executed successfully');
            res.json({message : 'The book has been added to your library', insertionCode: 1062});
        }
    });

    
}

module.exports = addBook;