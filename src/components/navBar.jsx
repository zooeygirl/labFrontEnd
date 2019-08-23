import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="nav">
          <Link className="nav-item nav-link" to="/">
            Home
          </Link>
          <Link className="nav-item nav-link" to="/exercises">
            Exercises
          </Link>
          {!user && (
            <React.Fragment>
              <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-item nav-link" to="/register">
                Register
              </Link>
            </React.Fragment>
          )}
          {user && (
            <Link className="nav-item nav-link" to="/logout">
              Logout
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
