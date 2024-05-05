import React, { useRef } from 'react'
import Sidebar from '../utilities/Sidebar';
import Button from '../utilities/Button';
import Rating from '../images/Rating.svg'

import { useState, useEffect } from "react";

function Library() {

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
    body: JSON.stringify({hh : 'hfgh'})
  }

  useEffect(()=>{

    async function fetchData () {
      const response = await fetch('http://localhost:3001/getBook', requestOptions);
      const res = await response.json();
      const data = await res.data;
    
      setMessage(res.message);
      setBooksData(await data)
        
      if (response.status == 401) {
        console.log(response.status);
        // setlogOutUnauthorized(true)
        setMessage(response.statusText);
      }

    }
    
    fetchData()

    // Wait for 2 seconds before displaying content
    const timeoutId = setTimeout(() => {
      setIsDisplay(true);
    }, 500);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);

  },[])

  function handleClick() {
    console.log("you will be dircted");
  }

  const displayCards = booksData.map((item) => {
      let book_id = item.book_id;
      let cover = item.cover;
      // let download_html = item.download_html
      let title = item.title;
      // let author = item.authors[0] ? item.authors[0].name : "Unknown Author"
      let author = item.author
  
      return (
        <div className="card-wrapper">
          <img className="book-cover" src={cover}></img>
          <h2 className="book-title" title={title}>{title}</h2>
          <span className="author" title={author}>{author}</span>
          <img className="rating" src={Rating}></img>
          <Button styleClass="button" textContent="Read" handleClick={handleClick}></Button>
        </div>
      )
  })

  return (
      <div className="library">
        <Sidebar></Sidebar>
        <div className='content'>
          <div className='book-search-container'>

            {/* All Content should be placed here */}
            <h1>Library</h1>
            <div className="search-result container">
              <div className="free-books">{isDisplay && displayCards}</div>
            </div>

          </div>
        </div>
        
      </div>
  );
}

export default Library;