import React from 'react'
import BookInfo from '../utilities/BookInfo';
import useTimedInfo from '../functions/useTimedInfo';
import { useState } from 'react';

 function BookPublic() {

  const [showInfo, timedInfo] = useTimedInfo(false, 2000)
  const [message, setMessage] = useState('')
  const [oddBookId, setOddBookId] = useState('')

  const data = {
    // book_id : props.book_id,
    // cover : props.cover,
    // title: props.title,
    // author: props.author,
    // download_html : props.download_html,
};

const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-type': 'application/json',
        // Authorization': `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify(data)
};

  async function handleClick() {
    const response = await fetch('http://localhost:3001/addBook', requestOptions);
    const res = await response.json();

    setMessage(res.message);
    
    if (response.status == 401) {
        console.log(response.status);
        setMessage(response.statusText);
    }

    let extracted_body =  JSON.parse(requestOptions.body)
    setOddBookId(extracted_body.book_id);

    timedInfo()
}


  return (
    <div className='book-public container'>
        <BookInfo></BookInfo>
    </div>
  )
}
export default BookPublic;