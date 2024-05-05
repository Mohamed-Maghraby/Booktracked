import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

function Logout() {

    const [logout, setLogout] = useState()
    const [responseMessage , setResponseMessage] = useState("")


    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: {}
    }

    async function logoutUser () {
        const response = await fetch("http://localhost:3001/user/logout", requestOptions);
        const data = await response.json();
        let message = await data.message
        setResponseMessage(message)
        console.log(message);
    }

    useEffect(()=>{
        localStorage.setItem("IsLoggedIn", "false");
        localStorage.setItem("username", "");
    }, [responseMessage])

    logoutUser()

  return (
    <Navigate to={'/'}></Navigate>
  )
}

export default Logout;