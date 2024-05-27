const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const File = require('./functions/file'); 




const database = require('./model/database')
const searchRouter = require('./routers/searchRouter');
const addBookRouter = require('./routers/addBookRouter');
const getBookRouter = require('./routers/getBookRouter');
const userRouter = require('./routers/userRouter');

const app = express();

/*Use dotenv*/
dotenv.config({path : './.env'})

/*Use CORS */
const corsOptions ={
    origin: 'http://localhost:3000', // Replace with your frontend domain
    // origin: '*', // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies)
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed request headers
}
app.use(cors(corsOptions));


/*Usee cookie */
app.use(cookieParser())


/*Enable post request body*/
app.use(express.json());
app.use(express.urlencoded({extended : true}));


/*Connect to database */
database.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});


/*Router & APIs */

/*search API*/
app.use('/search', searchRouter);

/*add book*/
app.use('/addBook', addBookRouter)

/*get book*/
app.use('/getBook', getBookRouter)

/*user router, contains all user features logn in, register ... */
app.use('/user', userRouter);

/*test html  */
// app.get('/getmehtml', (req, res) => {
//     res.sendFile('Testbook.html', { root: path.join(__dirname, 'views') }); // Assuming your HTML is in 'views' directory
//   });




const bookFilePath = path.join(__dirname, 'views', 'New-Prince.html');
console.log(bookFilePath);

// File.txtToHTML(bookFilePath, 'New-Prince', { minLetters: 4, minParagraphs: 2 });

// Function to read a specific portion of the book
function getBookSection(startIndex, endIndex) {
    return new Promise((resolve, reject) => {
        fs.readFile(bookFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const section = data.slice(startIndex, endIndex);
                resolve(section);
            }
        });
    });
}

app.get('/getmehtml', async (req, res) => {
    const start = parseInt(req.query.start, 10) || 0;
    const end = parseInt(req.query.end, 10) || 10000; // Default to 1000 characters if no end is provided
    try {
        const section = await getBookSection(start, end);
        res.send(section);
    } catch (error) {
        res.status(500).send('Error reading book section');
    }
});

app.post('/saveeditedcontent', (req, res) => {
    const { content, startIndex, endIndex, delta } = req.body;
    console.log("Request received");

    // const filePath = path.join(__dirname, 'views', 'Prince.txt');

    // Read the HTML file
    fs.readFile(bookFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Replace the content between startIndex and endIndex with the new content
        const newData = data.slice(0, startIndex) + content + data.slice(endIndex);

        // Write the new data back to the file
        fs.writeFile(bookFilePath, newData, 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error writing to file.');
            }

            res.send('Content saved successfully.');
        });
    });
});



/*setting up ports */
app.listen(3001, ()=>{
    console.log("Server runing on port : 3001");
});
