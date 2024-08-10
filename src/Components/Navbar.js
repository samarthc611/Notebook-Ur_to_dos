import React from "react";
import {
    Link,
    useLocation
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";
import { useContext, useRef } from "react";
import noteContext from "../Context/notes/notecontext";

  
const Navbar = (props) => {
  const refeud = useRef(null);
  const context = useContext(noteContext);
  const { editdetails } = context;
  let location = useLocation();
  const history = useHistory(); 
  const logout = () => {
    localStorage.removeItem('tokenlogin');
    history.push("/login")
    props.showalert("Logged out Successfully.","Success!")
  }
  
  const eud = (e)=>{
    e.preventDefault();
    refeud.current.click();
    editdetails();
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="#">
        noteBOOK
      </Link>
      
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname==='/Home'?'active':""}`}>
            <Link className="nav-link" to="/Home">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname==='/About'?'active':""}`}>
            <Link className="nav-link" to="/About">
              About
            </Link>
          </li>
          <li className={`nav-item ${location.pathname==='/About'?'active':""}`}>
            <Link className="nav-link" to="/ud">
              User Details
            </Link>
          </li>
          
          
        </ul>
        <form className="form-inline my-2 my-lg-0">
        {localStorage.getItem('tokenlogin') === null ? (
            <>
              
              <Link className="btn btn-primary mr-3" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mr-3" to="/signup" role="button">
                Sign Up
              </Link>
            </>
          ) : (
            <>
            <button className="btn btn-primary mr-3" onClick={logout}  role="button">
            Logout
          </button>
          </>
          )}
          
        </form>
      </div>
    </nav>
    
    
    </>
  );
};

export default Navbar;
