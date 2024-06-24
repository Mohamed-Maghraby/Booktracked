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
        <div>This Is Admin Page</div>
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
      <div className='content'>
        {userType === 'admin'? userIsAdmin() : userIsUser()}
      </div>
    </div>
  )
}
export default Dashboard;