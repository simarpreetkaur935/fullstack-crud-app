import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const MainNavbar = () => {
  let navigate = useNavigate();
  const logoutHandler =()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
     <div className="navbar">
     <div className="nav-left">
  <Link className="nav-link" to='/dashboard/category'>Category List</Link>

    <Link className="nav-link" to='/dashboard/addcategory'>Add  New Category</Link>
      </div>
    <br />
     <div className="nav-right">
    <p className="user-name">Hello {localStorage.getItem('userName')}!</p>
    <button  className="logout-btn" onClick={logoutHandler}>Logout</button>
     </div>

    </div>

    </>
  )
}

export default MainNavbar