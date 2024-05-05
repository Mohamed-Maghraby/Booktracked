import React from 'react'
import Sidebar from '../utilities/Sidebar'
import Search from '../functions/Search'
import Register from './Register'

function Home() {
    return (
        <div className='home'>

            <Sidebar></Sidebar>

            <div className='content'>
                <Search></Search>
            </div>
        </div>
    )
}
export default Home;