const { json, application } = require('express');
const database = require('../model/database');
const path = require('path');
const fs = require('fs').promises;


async function loadBook(req, res) {

    console.log(req.body.book_id + " -> from loadBook");
    let book_id = req.body.book_id;
    const user_id = await req.user_id


    async function getEpubByBookId(book_id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT download_epup FROM books WHERE book_id = ?'
            database.query(query, [book_id], (err, results) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.json({ message: "ERROR" })
                    return;
                }
                const download_epup = results[0].download_epup
                resolve(download_epup);
            })
        });
    }


    const bookUrl = await getEpubByBookId(book_id);; 
  
    try {
      const bookResponse = await fetch(bookUrl);
      const bookData = await bookResponse.blob();
    
      // Create a readable stream
      const readableStream = bookData.stream(); 

  
      // Create user directory if it doesn't exist
      const userDir = path.join(__dirname,'..','public', `${user_id}`);
      await fs.mkdir(userDir, { recursive: true }); // Create directory recursively
  
      // Save book with ID as filename
      const bookPath = path.join(userDir, `${book_id}.epub`);
      await fs.writeFile(bookPath, readableStream);
  
      res.json({ message: 'Book downloaded successfully!', servingUrl: `/public/${user_id}/${book_id}.epub` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error downloading book' });
    }

}

module.exports = loadBook;