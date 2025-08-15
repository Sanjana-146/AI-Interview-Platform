import React from 'react'
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>navigate('/signup')}>Register</button>
    </div>
  )
}

export default Navbar
