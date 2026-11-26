// Navbar.jsx
// Navigation bar for the personal portfolio website.

import { NavLink } from "react-router-dom";

import {useSession,request} from "../auth/session";
function Navbar() {
 const {session,save}=useSession();
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Custom portfolio logo */}
        <NavLink to="/" className="logo">
          JHW
        </NavLink>

        {/* Main navigation links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About Me</NavLink>
          </li>

          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>

          <li>
            <NavLink to="/education">Education</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact Me</NavLink>
          </li>
        {session ? <><li><NavLink to="/records/contacts">Records ({session.user.role})</NavLink></li><li><button onClick={async()=>{try{await request("/auth/signout")}catch{ /* Clear local session even if server is unavailable. */ }finally{save(null)}}}>Sign out</button></li></> : <><li><NavLink to="/signin">Sign in</NavLink></li><li><NavLink to="/signup">Sign up</NavLink></li></>}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;