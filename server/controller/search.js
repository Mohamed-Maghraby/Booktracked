const API_Search = require('../API_Search.json')

// function search (req, res) {
//     let keyword = req.query.q
//     const results = API_Search
//     console.log(keyword);
//     res.json(results)
// }
async function search (req, res) {
    let keyword = req.query.q
    const response = await fetch(`https://gutendex.com/books?search=${keyword}`);
    const data = await response.json()
    const results = await data.results
    console.log(keyword);

    // const formattedData = JSON.stringify(results, null, 2);
    // res.setHeader('Content-Type', 'application/json');
    // res.send(formattedData);
    res.json(results)
}




module.exports = search;