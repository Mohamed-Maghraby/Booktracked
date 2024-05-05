const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');




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
app.get('/getmehtml', (req, res) => {
    res.sendFile('Testbook.html', { root: path.join(__dirname, 'views') }); // Assuming your HTML is in 'views' directory
  });
  

/*setting up ports */
app.listen(3001, ()=>{
    console.log("Server runing on port : 3001");
});
