import { Link, useNavigate } from "react-router-dom";
import { IMember } from "../interfaces/member";
import NavbarNotification from "./NavbarNotifications";

interface NavbarProps {
  member: null | IMember;
  setMember: (member: IMember | null) => void;
  isArtist: boolean;
  isCollector: boolean;
}

function Navbar({ member, setMember, isArtist, isCollector }: NavbarProps) {
  const navigate = useNavigate();

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
            </div>

            <div className="navbar-end">
              {!member && (
                <Link to="/member-access" className="navbar-item navbar-text">
                  Register/Login
                </Link>
              )}

              {member && (
                <span className="navbar-item navbar-message">
                  {/* // prettier-ignore  */}
                  Hi{" "}
                  <span className="navbar-message-special">
                    {member.first_name}
                  </span>
                  , welcome back to{" "}
                  <span className="navbar-message-special">Open Studio</span>
                </span>
              )}

              {member && (
                <button onClick={logout} className="navbar-item is-ghost">
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
