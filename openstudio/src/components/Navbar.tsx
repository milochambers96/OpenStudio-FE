import { Link, useNavigate } from "react-router-dom";
import { IMember } from "../interfaces/member";
import NavbarNotification from "./NavbarNotifications";
import { useState } from "react";

import "../styles/NavbarStyles.css";

interface NavbarProps {
  member: null | IMember;
  setMember: (member: IMember | null) => void;
  isArtist: boolean;
  isCollector: boolean;
}

function Navbar({ member, setMember, isArtist, isCollector }: NavbarProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function toggleBurger() {
    setIsActive(!isActive);
  }

  function logout() {
    localStorage.removeItem("token");
    setMember(null);
    navigate("/");
  }

  return (
    <>
      <header>
        <nav className="navbar is-fixed-top navbar-color">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item navbar-text">
                Home
              </Link>
              {/* Burger button for mobile */}
              <a
                role="button"
                className={`navbar-burger ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={toggleBurger}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            {/* Navbar menu that toggles on burger click */}
            <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
              <div className="navbar-start">
                <Link to="/marketplace" className="navbar-item navbar-text">
                  Marketplace
                </Link>

                {isArtist && (
                  <Link to="/studio" className="navbar-item navbar-text">
                    Studio
                    {member && <NavbarNotification />}
                  </Link>
                )}

                {isCollector && (
                  <Link to="/gallery" className="navbar-item navbar-text">
                    Gallery
                    {member && <NavbarNotification />}
                  </Link>
                )}

                <Link to="/about" className="navbar-item navbar-text">
                  About OpenStudio
                </Link>
              </div>

              <div className="navbar-end">
                {!member && (
                  <Link to="/member-access" className="navbar-item navbar-text">
                    Register/Login
                  </Link>
                )}

                {member && (
                  <>
                    <span className="navbar-text navbar-message is-hidden-touch">
                      Hi {member.first_name}, welcome back to OpenStudio
                    </span>
                    <button
                      onClick={logout}
                      className="navbar-logout os-accent-text"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
