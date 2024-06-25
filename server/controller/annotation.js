const { json } = require('express');
const database = require('../model/database');
const { array } = require('../middleware/upload');
const mysql_promise = database.promise()


async function addAnnotation(req, res) {

    const data = req.body; // No need to await req.body

    const query = `
        INSERT INTO annotations (book_id, annotation)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
        annotation = VALUES(annotation)
    `;
    const values = [data.book_id, data.annotation];

    try {
        const [results] = await mysql_promise.execute(query, values); // Destructure the results to get the data
        // Ensure that only necessary data is sent back
        res.json({ message: 'Annotation added or updated successfully', results });
    } catch (error) {
        console.error('Error executing query:', error.code);
        res.status(500).json({ error: 'An error occurred while adding or updating the annotation.' });
    }
}


async function getAnnotation(req, res) {

    const data = req.body; // No need to await req.body

    const query = 'SELECT annotation FROM annotations WHERE book_id = ?';
    const values = [data.book_id]; // Ensure values is an array

    console.log(values);

    try {
        const [results] = await mysql_promise.execute(query, values); // Destructure the results to get the data
        // Ensure that only necessary data is sent back
        console.log(results[0].annotation);
        const annotations = results[0].annotation
        res.json(annotations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching annotations.' });
    }
}

async function addNote (req, res) {
    const data = req.body; // No need to await req.body
    const book_id = data.book_id
    const note = JSON.stringify(data.note)
    const user_id = req.user_id

    const query = `
    INSERT INTO notes (user_id, book_id, notes)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE notes = VALUES(notes);
  `;


    console.log(book_id, note, user_id);
    console.log(Array.isArray(note));

    try {
        const [results] = await mysql_promise.execute(query, [user_id, book_id, note]); // Destructure the results to get the data
        // Ensure that only necessary data is sent back
        res.json({ message: 'notes added or updated successfully', results });
    } catch (error) {
        console.error('Error executing query:', error.code);
        res.status(500).json({ error: 'An error occurred while adding or updating the annotation.' });
    }
}

module.exports = { addAnnotation, getAnnotation, addNote };