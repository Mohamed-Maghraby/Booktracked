import Button from './Button';
import Rating from '../images/Rating.svg'
import InfoMessage from './InfoMessage';
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Icon from './Icon';
import { CirclePlus } from 'lucide-react';


import useTimedInfo from '../functions/useTimedInfo';

function Card(props) {

    const [message, setMessage] = useState('')
    const [insertionCode, setInsertionCode] = useState()
    
    const [oddBookId, setOddBookId] = useState('')
    const [logOutUnauthorized, setlogOutUnauthorized] = useState(false);

    const [showInfo, timedInfo] = useTimedInfo(false, 2000)

    useEffect(() => {
        // Logic that depends on errno
        console.log(insertionCode + "58585");
    }, [insertionCode]); // Run this effect whenever errno changes

    const data = {
        book_id: props.book_id,
        cover: props.cover,
        title: props.title,
        author: props.author,
        download_html: props.download_html,
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
        setInsertionCode( (prevInsertionCode) => prevInsertionCode = res.insertionCode)

        if (response.status == 401) {
            console.log(response.status);
            setlogOutUnauthorized(true)
            setMessage(response.statusText);
        }

        let extracted_body = JSON.parse(requestOptions.body)
        setOddBookId(extracted_body.book_id);

        timedInfo()
        console.log(props.isBookExists[props.book_id]);
    }

    return (
        <>
            {/* {logOutUnauthorized ? <Navigate to={'logout'}></Navigate> : null} */}
            <div className="card-wrapper">
                <div className='book-wrapper'>
                    <img className="book-cover" src={props.cover}></img>
                    <h2 className="book-title" title={props.title}>{props.title}</h2>
                    <span className="author" title={props.author}>{props.author}</span>
                    <img className="rating" src={Rating}></img>
                    <Button styleClass="button" textContent="Discover" handleClick={handleClick}></Button>
                    {showInfo ? <InfoMessage InfoMessage={message} key={props.book_id} iconElement={<Icon name={'CircleCheckBig'} color="Green" size={20} strokeWidth={3} fill="none"></Icon>}></InfoMessage> : null}
                </div>
                <div className='book-icon-wrapper'>
                    {console.log(insertionCode)}
                    {props.isBookExists?.[props.book_id] ? (
                        <Icon
                            onClick={handleClick}
                            name="Heart"
                            color="white" // White icon for error 1062
                            size={27}
                            strokeWidth={0}
                            fill="black" // Assuming the Icon component accepts both 'color' and 'fill' props
                        />
                    ) : ( // Corrected the syntax here
                            insertionCode === 1062 ? (
                            <Icon
                                onClick={handleClick}
                                name="Heart"
                                color="white" // Black icon for error 1062
                                size={27}
                                strokeWidth={0}
                                fill="black" // Assuming the Icon component accepts both 'color' and 'fill' props
                            />
                        ) : (
                            <Icon
                                onClick={handleClick}
                                name="Heart"
                                color="black" // Black icon for any other error
                                size={25}
                                strokeWidth={2}
                                fill="white" // Assuming the Icon component accepts both 'color' and 'fill' props
                            />
                        )
                    )}

                    {/* <Icon onClick={handleClick} name={"CirclePlus"} color={errno == 1062 ? "white" : "black"} size={25} strokeWidth={2} fill={errno == 1062 ? "black" : "white"}></Icon> */}
                    <Icon name={"Info"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                </div>
            </div>
        </>
    )
}

export default Card;