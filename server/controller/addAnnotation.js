const { json } = require('express');
const database = require('../model/database');

async function addAnnotation(req, res) {

    const data = await req.body;

    const query = 'INSERT INTO annotations (book_id, annotation) VALUES (?, ?)';
    const values = [data.book_id, data.annotation];

    database.query(query, values, (error, result) => {
        if (error) {
            if (error.errno == 1062) {
                res.json({ message: 'Already Annotation Exists', insertionCode: error.errno });
            }
            console.error('Error executing query:', error.code);
        } else {
            console.log('Query executed successfully');
            res.json({ message: 'Annotation Added', insertionCode: 1062 });
        }
    });


    
}

module.exports = addAnnotation;