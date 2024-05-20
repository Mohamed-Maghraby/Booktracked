const API_Search = require('../API_Search.json')
const database = require('../model/database');

async function search(req, res) {

    let user_id = await req.user_id
    console.log(user_id);

    // let keyword = req.query.q
    // const results = API_Search
    // console.log(keyword);
    // // res.json(results)
    // console.log(results[1].id);

        let keyword = req.query.q
        const response = await fetch(`https://gutendex.com/books?search=${keyword}`);
        // const response = await fetch(`http://127.0.0.1:8000/books?search=${keyword}`);
        const data = await response.json()
        const results = await data.results

        if (results.length == 0) {
            res.json({messege : "no results"})
            console.log('no reults');
            return;
        }
    //     console.log(keyword);

    //     // const formattedData = JSON.stringify(results, null, 2);
    //     // res.setHeader('Content-Type', 'application/json');
    //     // res.send(formattedData);
    //     res.json(results)

    let arrayOfIds = results.map((book) => {
        return book.id
    })

    console.log(arrayOfIds);

    async function searchBooksInDatabase(arrayOfIds) {
        // Create a Promise to perform the database query
        return new Promise((resolve, reject) => {
            // Create the SQL query to search for book IDs
            const query = 'SELECT book_id AS book_id FROM user_library WHERE user_id = ? AND book_id IN (?)';

            // Execute the query
            database.query(query, [user_id, arrayOfIds], (error, results) => {
                if (error) {
                    reject(error); // Reject the Promise if there's an error
                } else {
                    // Create an object to store the results
                    const foundBooks = {};
                    const foundBookIds = new Set(results.map(row => row.book_id)); // Efficiently store found IDs

                    const arrayFromSet = Array.from(foundBookIds);
                    console.log(arrayFromSet);

                    arrayOfIds.forEach(bookId => {
                        foundBooks[bookId] = foundBookIds.has(bookId); // Use Set for efficient lookup
                    });

                    resolve(foundBooks); // Resolve the Promise with the array of foundBooks
                }
            });
        });
    }

    // Example usage:
        // searchBooksInDatabase(arrayOfIds)
        //     .then(foundBooks => {
        //         console.log(foundBooks); // Output the array of foundBooks
        //     })
        //     .catch(error => {
        //         console.error('Error searching books:', error);
        //     });

    let isBookInMyDatabase = await searchBooksInDatabase(arrayOfIds)
    console.log(isBookInMyDatabase);

    res.json({results, isBookInMyDatabase})

}

module.exports = search;