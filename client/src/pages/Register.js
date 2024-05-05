import React, { useState , useEffect} from 'react'
import Button from '../utilities/Button';
import '../style/register_LogIn.css'
import { NavLink } from 'react-router-dom';
import Sidebar from '../utilities/Sidebar';
import { X } from 'lucide-react';

function Register() {

    const [userRegisterInfo, setUserRegisterInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        terms_of_use: false
    })

    const [responseMessage , setResponseMessage] = useState("")
    const [val , setVal] = useState(false)

    function handleuserRegisterInfo(event) {
        const { name, value } = event.target;
        setUserRegisterInfo((preState) => {
            return ({ ...preState, [name]: value })
        })
        console.log(userRegisterInfo);
    }

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegisterInfo)
    }

    function preventFormDefault (event) {
        event.preventDefault();
    }

    async function registerUser() {
        const response = await fetch("http://localhost:3001/user/register", requestOptions);
        const data = await response.json();
        let message = await data.message
        setResponseMessage(message);

        console.log("Request Sent");
    }
    
    useEffect(()=> {
        if (responseMessage === "User Registerd Successfully") {
            localStorage.setItem("IsLoggedIn", "true");
            setVal(true)
            console.log(val + " val from parent");
            console.log(responseMessage);
        }        
    }, [responseMessage])


    return (
        <div className='register'>
            <Sidebar val={val}></Sidebar>

            <div className='content'>
                <div className='register-content'>
                    <div className='register-header'>
                        <h2>Register</h2>
                        <p>Enter your credentials to register an account</p>
                    </div>

                    <form onSubmit={preventFormDefault}>
                        <label>Username</label>
                        <input type='text' placeholder='Enter a username' name='username' value={userRegisterInfo.username} onChange={handleuserRegisterInfo} required></input>

                        <label>Email</label>
                        <input type='text' placeholder='Enter an email' name='email' value={userRegisterInfo.email} onChange={handleuserRegisterInfo} required></input>

                        <label>Password</label>
                        <input type='password' placeholder='Enter a password' name='password' value={userRegisterInfo.password} onChange={handleuserRegisterInfo} required></input>

                        <label>Confirm Password</label>
                        <input type='password' placeholder='Confirm password' name='confirm_password' value={userRegisterInfo.confirm_password} onChange={handleuserRegisterInfo} required></input>

                        <div className='terms'>
                            <input type='checkbox' id='terms' name='terms_of_use' value={userRegisterInfo.terms_of_use} onChange={handleuserRegisterInfo} required></input>
                            <label htmlFor='terms'>I agree to the terms of use</label>
                        </div>

                        <div className='response-message'>
                            <p>{responseMessage}</p>
                        </div>

                        <Button styleClass="button register-button" textContent="Register" handleClick={registerUser}></Button>
                    </form>

                    <div className='register-footer'>
                        <span>Do you already have an account ?</span>
                        <NavLink to={"/SignUp"}>Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;