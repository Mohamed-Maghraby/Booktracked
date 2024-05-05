const express = require('express')
const router = express.Router()
const search = require('../controller/search')

/*
This is the real api 
router.get('/', async (req, res)=>{
    let keyword = req.query.q
    const response = await fetch(`https://gutendex.com/books?search=${keyword}`);
    const data = await response.json()
    const results = await data.results
    console.log(keyword);

    // const formattedData = JSON.stringify(results, null, 2);
    // res.setHeader('Content-Type', 'application/json');
    // res.send(formattedData);
    res.json(results)
})
*/

/*This is a test api */
// router.get('/', (req, res)=>{
//     let keyword = req.query.q
//     const results = API_Search
//     console.log(keyword);

//     // const formattedData = JSON.stringify(results, null, 2);
//     // res.setHeader('Content-Type', 'application/json');
//     // res.send(formattedData);
//     res.json(results)
// })
router.get('/', search)

module.exports = router;

