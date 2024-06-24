import React from 'react';
import {Routes, Route, Router} from 'react-router-dom'
import './style/main.css';
import Library from './pages/Library';
import Home from './pages/Home';
import Register from './pages/Register';
import  LogIn  from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import BookPublic from './pages/BookPublic';
import Viewer from './pages/Viewer';
import ViewerTest from 'pages/ViewerTest';
import LogInOptions from 'pages/LogInOptions';
import ManageUser from 'pages/ManageUser';

function App() {
  let stat =  localStorage.getItem("IsLoggedIn")
  if (stat) {
  } else {
    localStorage.setItem("IsLoggedIn", "false")
  }
  

  return (
      <div className='app'>
          <Routes>
            <Route index element={<Home/>}></Route>
            <Route path='/library' element={<Library/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/logIn' element={<LogIn/>}></Route>
            <Route path='/LogInOptions' element={<LogInOptions/>}></Route>
            <Route path='/logout' element={<Logout/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/bookPublic' element={<BookPublic/>}></Route>
            <Route path='/viewer' element={<Viewer/>}></Route>
            <Route path='/viewerTest' element={<ViewerTest/>}></Route>
            <Route path='/ManageUser' element={<ManageUser/>}></Route>
          </Routes>
      </div>
  );
}
export default App;  
