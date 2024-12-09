import { useState } from "react";
import { LoginProps } from "../../interfaces/member";
import Register from "./Register";
import Login from "./Login";

function MemberAccess({ fetchMember }: LoginProps) {
  const [activeTab, setActiveTab] = useState("login");

  const handleRegisterSuccess = () => {
    setActiveTab("login");
  };

  return (
    <section
      className="section is-flex is-align-items-center"
      style={{ minHeight: "calc(100vh - 3.25rem)" }}
    >
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-full-mobile is-two-thirds">
            <div
              className="box os-content-bk"
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                marginTop: "5rem",
              }}
            >
              <div className="tabs is-centered">
                <ul className="is-size-4-desktop is-size-5-touch">
                  <li className={activeTab === "login" ? "is-active" : ""}>
                    <a onClick={() => setActiveTab("login")}>Login</a>
                  </li>
                  <li className={activeTab === "register" ? "is-active" : ""}>
                    <a onClick={() => setActiveTab("register")}>Register</a>
                  </li>
                </ul>
              </div>
              <div>
                {" "}
                {activeTab === "login" ? (
                  <Login fetchMember={fetchMember} />
                ) : (
                  <Register handleRegisterSuccess={handleRegisterSuccess} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MemberAccess;
