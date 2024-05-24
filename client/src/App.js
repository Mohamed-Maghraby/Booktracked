import React from 'react';
import {Routes, Route, Router} from 'react-router-dom'
import './style/main.css';
import Library from './pages/Library';
import Home from './pages/Home';
import Register from './pages/Register';
import  LogIn  from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import BookReader from './pages/BookReader';
import Reader2 from './pages/Reader2'
import Logout from './pages/Logout';
import BookPublic from './pages/BookPublic';
import Viewer from './pages/Viewer'

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
            <Route path='/logout' element={<Logout/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/BookReader' element={<BookReader/>}></Route>
            <Route path='/Reader2' element={<Reader2/>}></Route>
            <Route path='/bookPublic' element={<BookPublic/>}></Route>
            <Route path='/viewer' element={<Viewer/>}></Route>
          </Routes>
      </div>
  );
}
export default App;  
