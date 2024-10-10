import { Link, useNavigate } from "react-router-dom";
import { IMember } from "../interfaces/member";

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
        <nav className="navbar has-background-danger-dark is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item has-text-white-ter">
                Home
              </Link>
              <Link
                to="/marketplace"
                className="navbar-item has-text-white-ter"
              >
                Marketplace
              </Link>

              {isArtist && (
                <Link to="/" className="navbar-item has-text-white-ter">
                  Studio
                </Link>
              )}

              {isCollector && (
                <Link to="/" className="navbar-item has-text-white-ter">
                  Gallery
                </Link>
              )}
            </div>

            <div className="navbar-end">
              {!member && (
                <Link to="/register" className="navbar-item has-text-white-ter">
                  Signup
                </Link>
              )}
              {!member && (
                <Link to="/login" className="navbar-item has-text-white-ter">
                  Login
                </Link>
              )}

              {member && (
                <span className="navbar-item has-text-white-ter">{`Hi ${member.first_name}, welcome back to Open Studio`}</span>
              )}
              {member && (
                <button
                  onClick={logout}
                  className="button navbar-item is-ghost"
                >
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
