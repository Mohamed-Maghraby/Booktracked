import React from 'react';
import '../style/dashboard.css';
import Sidebar from '../utilities/Sidebar';
import Share from '../utilities/Share';

function Dashboard() {

  return (
    <div className='dahsboard'>
      <Sidebar></Sidebar>
      <div className='content'>
        <Share></Share>
      </div>
    </div>
  )
}
export default Dashboard;