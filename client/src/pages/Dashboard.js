import React from 'react';
import '../style/dashboard.css';
import Sidebar from '../utilities/Sidebar';
import Share from '../utilities/Share';
import { useReadLocalStorage } from 'usehooks-ts'
import ListUsers from 'utilities/ListUsers';

function Dashboard() {

  const userType = useReadLocalStorage('user-type')


  
  function userIsAdmin () {
    return (
      <>
        <h1 style={{'flex-basis' : '100%', margin : '50px 0', 'font-weight' : '600'}}>Admin Dashboard</h1>
        <ListUsers></ListUsers>
        <Share></Share>
      </>
    )
  }

  function userIsUser () {
    return (
      <Share></Share>
    )
  }
  return (
    <div className='dahsboard'>
      <Sidebar></Sidebar>
      <div className='content admin-user-dahsboard-container'>
        {userType === 'admin'? userIsAdmin() : userIsUser()}
      </div>
    </div>
  )
}
export default Dashboard;