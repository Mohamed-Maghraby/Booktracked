import { useState } from "react";
import { useEffect } from "react";
import Button from "../utilities/Button";
import SearchResult from "../utilities/SearchResult"

function Search () {

    // fetch(`https://openlibrary.org/search.json?q=${paramString}`)

    const [userInput, setUserInput] = useState("")
    const [searchData, setSearchData] = useState()
    const [searchResults, setSearchResults] = useState(false)

    // useCallback(()=>{
    //     setSearchResults(false)
    // })

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
        console.log(searchResults + " When the user changes");
    }

    async function searchBooks (){
        const response = await fetch(`http://localhost:3001/search?q=${userInput}`);
        const data = await response.json();
        console.log(data);
        setSearchData(data)
    }

    const handleClick = ( e => {
        searchBooks()
        setSearchResults(true)
    }) 

    useEffect(()=>{
        console.log(searchData || false);
    },[searchData])

    return (
            <div className="book-search-container">
                <div className="book-search-wrapper">
                    <input className="main-search-bar" type="search" placeholder="Enter Keyword, Work, Book..." value={userInput} onChange={handleUserInput}></input>
                    <Button styleClass="search-button button" textContent="Search" handleClick={handleClick}>Search</Button>
                </div>
                {searchData && searchResults && <SearchResult searchdata={searchData}></SearchResult>}
            </div>
    )
} 

export default Search;