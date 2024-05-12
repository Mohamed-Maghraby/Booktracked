import Button from './Button';
import Rating from '../images/Rating.svg'
import InfoMessage from './InfoMessage';
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

import { useTimeout } from 'usehooks-ts'
import useTimedInfo from '../functions/useTimedInfo';

function Card(props) {

    const [message, setMessage] = useState('')
    const [oddBookId, setOddBookId] = useState('')
    const [logOutUnauthorized, setlogOutUnauthorized]  = useState(false); 

    const [showInfo, timedInfo] = useTimedInfo(false, 2000)

    const data = {
        book_id : props.book_id,
        cover : props.cover,
        title: props.title,
        author: props.author,
        download_html : props.download_html,
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
            setlogOutUnauthorized(true)
            setMessage(response.statusText);
        }

        let extracted_body =  JSON.parse(requestOptions.body)
        setOddBookId(extracted_body.book_id);

        timedInfo()

    }

    return (
        <>
            {/* {logOutUnauthorized ? <Navigate to={'logout'}></Navigate> : null} */}
            <div className="card-wrapper">
                <img className="book-cover" src={props.cover}></img>
                <h2 className="book-title" title={props.title}>{props.title}</h2>
                <span className="author" title={props.author}>{props.author}</span>
                <img className="rating" src={Rating}></img>
                <Button styleClass="button" textContent="Get Book" handleClick={handleClick}></Button>
                {showInfo ? <InfoMessage InfoMessage={message} key={props.book_id}></InfoMessage> : null}
            </div>
        </>
    )
}

export default Card;