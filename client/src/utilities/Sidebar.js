import '../style/sidebar.css'
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import Icon from './Icon';
import menuIcon from '../images/Menu.svg'
import fakeAvatar from '../images/avatar.svg'
import { useReadLocalStorage } from 'usehooks-ts'


function Sidebar(props) {

    let isLoggedInString = localStorage.getItem("IsLoggedIn");
    let username = localStorage.getItem("username");
    console.log(isLoggedInString);

    console.log(props.val + " this is val"); 

    const [collapsed, setCollapsed] = useState(false)
    const userType = useReadLocalStorage('user-type')


    function handleCollapsedSidebar (){
        setCollapsed(!collapsed);
        console.log(userType);
    }

    return (
            <div className={`sidebar ${collapsed ? 'collapsed-sidebar' : ''}`}>
                <div className='menu'>
                    <img src={menuIcon} onClick={handleCollapsedSidebar} title={`${collapsed ? 'Collapse Menu' : 'Toggle Menu'}`}></img>

                </div>
                <div className='sidebar-profile'>
                        {isLoggedInString === 'true' && <img src={fakeAvatar} onClick={handleCollapsedSidebar} className={` avatar`}></img>}
                        <span className={`${collapsed ? 'collapsed-span' : ''} username`}>{username}</span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/"}>
                                <Icon name={"Home"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                <span className={`${collapsed ? 'collapsed-span' : ''}`}>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/library"}>
                                <Icon name={"Library"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                <span className={`${collapsed ? 'collapsed-span' : ''}`}>Library</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/dashboard"}>
                                <Icon name={"LayoutDashboard"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                <span className={`${collapsed ? 'collapsed-span' : ''}`}>{userType ==='admin' ? 'Admin Dashboard' : 'Dashboard'}</span>
                            </NavLink>
                        </li>
                        {
                            isLoggedInString === 'false' ? (
                            <li>
                                <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/register"}>
                                    <Icon name={"Landmark"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                    <span className={`${collapsed ? 'collapsed-span' : ''}`}>Register</span>
                                </NavLink>
                            </li>
                            ) : null
                        }
                        {
                            isLoggedInString === 'false' ? (
                            <li>
                                <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/LogInOptions"}>
                                    <Icon name={"LogIn"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                    <span className={`${collapsed ? 'collapsed-span' : ''}`}>Login</span>
                                </NavLink>
                            </li>
                            ) : null
                        }
                        {
                            isLoggedInString === 'true' ? (
                            <li>
                                <NavLink className={`${collapsed ? 'collapsed-a' : ''}`} to={"/logout"}>
                                    <Icon name={"LogOut"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>
                                    <span className={`${collapsed ? 'collapsed-span' : ''}`}>Logout</span>
                                </NavLink>
                            </li>
                            ) : null
                        }

                    </ul>
                </nav>
            </div>
    )
}

export default Sidebar;