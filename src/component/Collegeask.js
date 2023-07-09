import React from 'react'
import '../css/Collegeask.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget'

function Collegeask() {
  return (
    <div className="collegeask">
        <Navbar/>
        
        <div className='collegeask__content'>
        <Sidebar/>
        <Feed/>
        <Widget/>
        </div>
    </div>
  )
}

export default Collegeask