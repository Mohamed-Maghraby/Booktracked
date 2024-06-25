const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const database = require('./model/database')
const searchRouter = require('./routers/searchRouter');
const addBookRouter = require('./routers/addBookRouter');
const getBookRouter = require('./routers/getBookRouter');
const loadBookRouter = require('./routers/loadBookRouter');
const annotationRouter = require('./routers/annotationRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');

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

// /*Enable post request body*/
// app.use(express.json());
// app.use(express.urlencoded({extended : true}));

// Middleware to parse JSON bodies with increased size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


database.getConnection((err, connections)=>{
    connections.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database!');
    });
})


// /*Connect to database */
// database.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database!');
// });

/*Router & APIs */

/*search API*/
app.use('/search', searchRouter);

/*add book*/
app.use('/addBook', addBookRouter)

/*get book*/
app.use('/getBook', getBookRouter)

/*load book*/
app.use('/loadBook', loadBookRouter)

/*add annotation*/
app.use('/', annotationRouter)

/*user router, contains all user features logn in, register ... */
app.use('/user', userRouter);

/*Admin router, contains all user features logn in, register ... */
app.use('/admin', adminRouter);






// Serve the file in server
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.get('/getmehtml', (req, res) => {
//     // res.type('application/epub+zip'); // Set the content type
//     res.sendFile(path.join(__dirname, 'public', 'alice.epub'));
// });


// app.use('/static', express.static(path.join(__dirname, 'public')))


/*setting up ports */
app.listen(3001, ()=>{
    console.log("Server runing on port : 3001");
});
