import '../style/sidebar.css'
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import Icon from './Icon';
import menuIcon from '../images/Menu.svg'
import fakeAvatar from '../images/avatar.svg'
import { useReadLocalStorage } from 'usehooks-ts'
import ListItem from './ListItem';


function Sidebar() {

    let isLoggedInString = localStorage.getItem("IsLoggedIn");
    let username = localStorage.getItem("username");

    


    const [collapsed, setCollapsed] = useState(false)
    const userType = useReadLocalStorage('user-type')


    function handleCollapsedSidebar (){
        setCollapsed(!collapsed);
        console.log(userType);
        // console.log(isLoggedInString);
        console.log(username);
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
                        <ListItem icon={<Icon name={"Home"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/'>Home</ListItem>
                        <ListItem icon={<Icon name={"Library"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/library'>Library</ListItem>
                        <ListItem icon={<Icon name={"LayoutDashboard"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/dashboard'>{userType ==='admin' ? 'Admin Dashboard' : 'Dashboard'}</ListItem>
                        {
                            isLoggedInString === 'false' ? (
                                <>
                                <ListItem icon={<Icon name={"Landmark"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/register'>Register</ListItem>
                                <ListItem icon={<Icon name={"LogIn"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/LogInOptions'>Login</ListItem>
                                </>

                            ) : null
                        }
                        {
                            isLoggedInString === 'true' ? (
                              <ListItem icon={<Icon name={"LogOut"} color={"black"} size={25} strokeWidth={2} fill={"none"}></Icon>} collapsed={collapsed} url='/logout'>Logout</ListItem>
                            ) : null
                        }

                    </ul>
                </nav>
            </div>
    )
}

export default Sidebar;