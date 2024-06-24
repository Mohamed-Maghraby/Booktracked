import React, { useRef } from 'react'
import Sidebar from '../utilities/Sidebar';
import Button from '../utilities/Button';
import Rating from '../images/Rating.svg'
import { useNavigate } from 'react-router-dom';


import { useState, useEffect } from "react";

function Library() {

  const navigate = useNavigate();

  const [message, setMessage] = useState('')
  const [booksData, setBooksData] = useState([])
  const [isDisplay, setIsDisplay] = useState(false)

  

  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      // Authorization': `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify({ hh: 'hfgh' })
  }

  useEffect(() => {

    async function fetchData() {
      const response = await fetch('http://localhost:3001/getBook', requestOptions);
      const res = await response.json();
      const data = await res.data;

      setMessage(await res.message);
      setBooksData(await data)
    }

    fetchData()

    // Wait for 2 seconds before displaying content
    const timeoutId = setTimeout(() => {
      setIsDisplay(true);
    }, 500);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);

  }, [])

  async function handleClick(book_id) {

    
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      // Authorization': `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify({book_id: book_id})
  }

    const response = await fetch('http://localhost:3001/loadBook', requestOptions);
    const res = await response.json();
    const servingUrl = await res.servingUrl;
    console.log(res);

    navigate('/viewerTest', { state: { book_id: book_id, servingUrl : servingUrl } }); // Redirect with props

  }

  function displayBookData() {
    return (
      booksData.map((item) => {
        let book_id = item.book_id;
        let cover = item.cover;
        // let download_html = item.download_html
        let title = item.title;
        // let author = item.authors[0] ? item.authors[0].name : "Unknown Author"
        let author = item.author

        return (
          <div className="library-book-wrapper">
            <img className="book-cover" src={cover}></img>
            <h2 className="book-title" title={title}>{title}</h2>
            <span className="author" title={author}>{author}</span>
            <img className="rating" src={Rating}></img>
            <Button styleClass="button" textContent="Read" handleClick={() => handleClick(book_id)}></Button>
          </div>
        )
      })
    )
  }

  return (
    <div className="library">
      <Sidebar></Sidebar>
      <div className='content'>
        <div className='book-search-container'>

          {/* All Content should be placed here */}
          <h1>{message == "No token" ? "Please login to discover your library" : "Library"}</h1>
          <div className="search-result container">
            <div className='free-books'>{message !== "No token" && isDisplay && displayBookData()}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
 
export default Library;