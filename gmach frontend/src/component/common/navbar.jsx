import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <>
        <nav className="container navbar navbar-expand-lg navbar-light shadow-sm ">
          <i class="bi bi-arrow-left-square-fill"></i>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user && user.isAdmin && (
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/status">
                    מצב הבקשות הכללי
                  </NavLink>
                </li>
              )}
              {user && (
                <>
                  <li>
                    <NavLink className="nav-item nav-link" to="/mystatus">
                      מצב הבקשה שלי
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/please">
                      הגשת בקשה להלוואה
                    </NavLink>
                  </li>
                </>
              )}{" "}
              {user && user.isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/list">
                      רשימת הלווים
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signin">
                      כניסת משתמש רשום
                    </NavLink>
                  </li>
                  <li className="nav-item"></li>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-item" to="/signup">
                      רישום לאתר
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-item" to="/logout">
                      התנתק
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/about">
                  אודות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/">
                  דף הבית
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
