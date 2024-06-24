import React from 'react'
import { useLocation } from 'react-router-dom';
import Icon from 'utilities/Icon';
import { useState , useEffect} from 'react';
function ManageUser() {

    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [usersLib, setUsersLib] = useState([])



    const transfare = useLocation();
    const userInfo = transfare.state?.userInfo; // Access the data using optional chaining

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ limit: limit, offset: offset, user_id: userInfo.user_id })
    }

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3001/admin/getUserLibrary', requestOptions);
            const res = await response.json();
            setUsersLib(res.result)
            console.log(res);
        }
        fetchUsers();
    }, [limit, offset])

    function handleUser () {

    }

    function listUserLib() {
        return (
            usersLib.map((item) => {
                return (
                    <ul key={item.book_id} className="table-row">
                        <li>{item.book_id}</li>
                        <li style={{flexBasis : '40%'}}>{item.title}</li>
                        <li style={{padding: '0 30px'}}>{item.author}</li>
                    </ul>
                )
            })
        )
    }



    return (
        <div style={{width : '60%'}}>


            <div className="table">
                <ul className="table-head">
                    <li>User ID</li>
                    <li>Username</li>
                    <li>Email</li>
                </ul>
                <div className="table-body">
                <ul className="table-row">
                        <li>{userInfo.user_id}</li>
                        <li>{userInfo.username}</li>
                        <li>{userInfo.email}</li>
                        <Icon name={'SquareArrowRight'} color={"black"} size={22} fill={"none"} strokeWidth={2} onClick={()=>{handleUser()}}></Icon>
                    </ul>
                </div>
            </div>

            <div className="list-user-container">
            <div className="list-user-header">List of user's library</div>
            <div className="table">
                <ul className="table-head">
                    <li>Book ID</li>
                    <li style={{flexBasis : '40%'}}>Title</li>
                    <li style={{padding: '0 30px'}}>Author</li>
                </ul>
                <div className="table-body">
                    {listUserLib()}
                </div>
            </div>

            <div className="list-user-footer">
                <button onClick={() => setOffset(offset + 5)}>Load more</button>
            </div>
        </div>


        </div>
    )
}

export default ManageUser
