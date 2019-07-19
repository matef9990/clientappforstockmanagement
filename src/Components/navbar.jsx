import React, { Component } from "react";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home{" "}
                <span className="sr-only">
                  <i className="fas fa-business-time" />
                  Home
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-business-time" />
              </a>
            </li>
            <li className="nav-item dropdown" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
