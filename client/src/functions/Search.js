import { useState } from "react";
import { useEffect } from "react";
import Button from "../utilities/Button";
import SearchResult from "../utilities/SearchResult"

function Search () {

    // fetch(`https://openlibrary.org/search.json?q=${paramString}`)

    const [userInput, setUserInput] = useState("")
    const [searchData, setSearchData] = useState()
    const [searchResults, setSearchResults] = useState(false)
    const [isBookExists, setIsBookExists] = useState({})

    // useCallback(()=>{
    //     setSearchResults(false)
    // })

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
        console.log(searchResults + " When the user changes");
    }
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }

    async function searchBooks (){
        const response = await fetch(`http://localhost:3001/search?q=${userInput}`, requestOptions);
        const data = await response.json();
        console.log(data);
        setSearchData(data.results)
        setIsBookExists(data.isBookInMyDatabase)

    }

    const handleClick = ( e => {
        searchBooks()
        setSearchResults(true)
    }) 

    useEffect(()=>{
        console.log(searchData || false);
        console.log(isBookExists);

    },[searchData])

    return (
            <div className="book-search-container">
                <div className="book-search-wrapper">
                    <input className="main-search-bar" type="search" placeholder="Enter Keyword, Work, Book..." value={userInput} onChange={handleUserInput}></input>
                    <Button styleClass="search-button button" textContent="Search" handleClick={handleClick}>Search</Button>
                </div>
                {searchData && searchResults && <SearchResult searchdata={searchData} isBookExists={isBookExists}></SearchResult>}
                {searchData == undefined ? <div className="no-results">Sorry! No Results</div> : null}
            </div>
    )
} 

export default Search;