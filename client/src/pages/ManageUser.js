import React from 'react'
import { useLocation } from 'react-router-dom';
import Icon from 'utilities/Icon';
import { useState, useEffect } from 'react';
import Sidebar from '../utilities/Sidebar';
function ManageUser() {

    const transfare = useLocation();
    const userInfo = transfare.state?.userInfo; // Access the data using optional chaining

    const [userInfoState, settUserInfoState] = useState(userInfo);
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [usersLib, setUsersLib] = useState([])
    const [isUserDeleted, setIsUserDeleted] = useState(false)
    const [isDeleteIconhoverd, setIsDeleteIconHoverd] = useState(false)
    const [isEditIconhoverd, setIsEditIconHoverd] = useState(false)
    const [isUpdateIconHoverd, setIsUpdateIconHoverd] = useState(false)
    const [isEditUSer, setIsEditUSer] = useState(false)

    const [newUserName, setNewUserName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [changedUsername, setChangedUsername] = useState('')
    const [changedEmail, setchangedEmail] = useState('')

    const [isEditBook, setIsEditBook] = useState(false)
    const [isDeleteBookIconhoverd, setisDeleteBookIconhoverd] = useState(false)


    const [isDeleteIconHovered, setIsDeleteIconHovered] = useState(null);
    const [isUpdateIconHovered, setIsUpdateIconHovered] = useState(null);
    const [isEditIconHovered, setIsEditIconHovered] = useState(null);




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
            console.log(userInfoState);
        }
        fetchUsers();
    }, [limit, offset])

    async function deleteCurrentUser() {

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ user_id: userInfo.user_id })
        }

        const response = await fetch('http://localhost:3001/admin/deleteUser', requestOptions);
        const res = await response.json();
        setIsUserDeleted(true)
        console.log(res);

    }

    async function updateUserInfo() {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ user_id: userInfo.user_id, username: newUserName, email: newEmail })
        }

        const response = await fetch('http://localhost:3001/admin/updateUser', requestOptions);
        const res = await response.json();

        setChangedUsername(newUserName)
        setchangedEmail(newEmail)

        console.log(res);
        console.log(newUserName);
    }

    function editUserInfo() {
        setIsEditUSer(!isEditUSer)
        setIsEditIconHoverd(false)
    }

    function handleBook() {
        console.log("fff");
    }

    function handleBookEnter() {
        setisDeleteBookIconhoverd(true)
        console.log("iiii");
    }
    function handleBookLeave() {
        setisDeleteBookIconhoverd(false)
        console.log("iiii");
    }




    function listUserLib() {
        return (
            usersLib.map((item) => {
                return (
                    <ul className="table-row" key={item.book_id}>
                        <li>{item.book_id}</li>
                        {isEditUSer ? 
                            <input
                                style={{
                                    'flex-basis': '30%', 'flex-basis': '30%',
                                    'padding': '10px',
                                    'border-radius': '8px',
                                    'outline': 'none',
                                    'border': '1px solid #c5c5c5'
                                }}
                                onChange={(e) => setNewUserName(e.target.value)}
                                value={newUserName}
                                placeholder={item.title}
                            /> : 
                            <li>{changedUsername ? newUserName : item.title}</li>
                        }
                        {isEditUSer ? 
                            <input
                                style={{
                                    'flex-basis': '35%', margin: '0 10px',
                                    'padding': '10px',
                                    'border-radius': '8px',
                                    'outline': 'none',
                                    'border': '1px solid #c5c5c5'
                                }}
                                onChange={(e) => setNewEmail(e.target.value)}
                                value={newEmail}
                                placeholder={item.author}
                            /> : 
                            <li style={{ margin: '0 10px' }}>{changedEmail ? newEmail : item.author}</li>
                        }
                        {!isEditUSer &&
                            <span
                                style={{ 'flex-basis': '10%' }}
                                onMouseEnter={() => setIsDeleteIconHovered(item.book_id)}
                                onMouseLeave={() => setIsDeleteIconHovered(null)}
                            >
                                <Icon
                                    name={'Trash2'}
                                    color={isDeleteIconHovered === item.book_id ? 'red' : 'black'}
                                    size={22}
                                    fill={"none"}
                                    strokeWidth={2}
                                    onClick={() => { deleteCurrentUser() }}
                                />
                            </span>
                        }
                        {isEditUSer &&
                            <span
                                style={{ 'flex-basis': '10%' }}
                                onMouseEnter={() => setIsUpdateIconHovered(item.book_id)}
                                onMouseLeave={() => setIsUpdateIconHovered(null)}
                            >
                                <Icon
                                    name={'SquareArrowRight'}
                                    color={isUpdateIconHovered === item.book_id ? 'green' : 'black'}
                                    size={22}
                                    fill={"none"}
                                    strokeWidth={2}
                                    onClick={() => { updateUserInfo() }}
                                />
                            </span>
                        }
                        {!isEditUSer &&
                            <span
                                onMouseEnter={() => setIsEditIconHovered(item.book_id)}
                                onMouseLeave={() => setIsEditIconHovered(null)}
                                onClick={editUserInfo}
                            >
                                <Icon
                                    name={'Pencil'}
                                    color={isEditIconHovered === item.book_id ? 'blue' : 'black'}
                                    size={22}
                                    fill={"none"}
                                    strokeWidth={2}
                                />
                            </span>
                        }
                        {isEditUSer &&
                            <span onClick={editUserInfo}>
                                <Icon name={'CircleX'} color={'black'} size={22} fill={"none"} strokeWidth={2} />
                            </span>
                        }
                    </ul>
                )
            })
        )
    }

    return (
        <div className='manage-user'>
            <Sidebar></Sidebar>
            <div className='content'>
                {!isUserDeleted && <div style={{ width: '80%' }}>
                    <div className="table">
                        <ul className="table-head">
                            <li>User ID</li>
                            <li >Username</li>
                            <li style={{ margin: '0 10px' }}>Email</li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="table-body">
                            <ul className="table-row">
                                <li>{userInfo.user_id}</li>
                                {isEditUSer ? <input style={{
                                    'flex-basis': '30%', 'flex-basis': '30%',
                                    'padding': '10px',
                                    'border-radius': '8px',
                                    'outline': 'none',
                                    'border': '1px solid #c5c5c5'
                                }} onChange={(e) => setNewUserName(e.target.value)} value={newUserName} placeholder={userInfo.username}></input> : <li>{changedUsername ? newUserName : userInfo.username}</li>}
                                {isEditUSer ? <input style={{
                                    'flex-basis': '35%', margin: '0 10px',
                                    'padding': '10px',
                                    'border-radius': '8px',
                                    'outline': 'none',
                                    'border': '1px solid #c5c5c5'
                                }} onChange={(e) => setNewEmail(e.target.value)} value={newEmail} placeholder={userInfo.email}></input> : <li style={{ margin: '0 10px' }}>{changedEmail ? newEmail : userInfo.email}</li>}
                                {!isEditUSer &&
                                    <span style={{ 'flex-basis': '10%' }} onMouseEnter={() => setIsDeleteIconHoverd(true)} onMouseLeave={() => setIsDeleteIconHoverd(false)}>
                                        <Icon name={'Trash2'} color={isDeleteIconhoverd ? 'red' : 'black'} size={22} fill={"none"} strokeWidth={2} onClick={() => { deleteCurrentUser() }}></Icon>
                                    </span>
                                }
                                {isEditUSer &&
                                    <span style={{ 'flex-basis': '10%' }} onMouseEnter={() => setIsUpdateIconHoverd(true)} onMouseLeave={() => setIsUpdateIconHoverd(false)}>
                                        <Icon name={'SquareArrowRight'} color={isUpdateIconHoverd ? 'green' : 'black'} size={22} fill={"none"} strokeWidth={2} onClick={() => { updateUserInfo() }}></Icon>
                                    </span>
                                }
                                {!isEditUSer &&
                                    <span onMouseEnter={() => setIsEditIconHoverd(true)} onMouseLeave={() => setIsEditIconHoverd(false)} onClick={editUserInfo}>
                                        <Icon name={'Pencil'} color={isEditIconhoverd ? 'blue' : 'black'} size={22} fill={"none"} strokeWidth={2}></Icon>
                                    </span>
                                }
                                {isEditUSer &&
                                    <span onClick={editUserInfo}>
                                        <Icon name={'CircleX'} color={'black'} size={22} fill={"none"} strokeWidth={2}></Icon>
                                    </span>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="list-user-container" style={{ width: '100%', margin: '0' }}>
                        <div className="list-user-header">List of user's library</div>
                        <div className="table">
                            <ul className="table-head">
                                <li>Book ID</li>
                                <li style={{ flexBasis: '40%' }}>Title</li>
                                <li style={{ padding: '0 30px' }}>Author</li>
                            </ul>
                            <div className="table-body">
                                {listUserLib()}
                            </div>
                        </div>
{/* 
                        <div className="list-user-footer">
                            <button onClick={() => setOffset(offset + 5)}>Load more</button>
                        </div> */}
                    </div>
                </div>}

                {isUserDeleted && <div>User got deleted</div>}
            </div>
        </div>


    )
}

export default ManageUser;




