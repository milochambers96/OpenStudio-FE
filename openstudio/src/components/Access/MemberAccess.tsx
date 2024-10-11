import { useState } from "react";
import { LoginProps } from "../../interfaces/member";
import Register from "./Register";
import Login from "./Login";

function MemberAccess({ fetchMember }: LoginProps) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="section mt-5">
      <div className="container">
        <div className="tabs is-centered">
          <ul>
            <li className={activeTab === "login" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("login")}>Login</a>
            </li>
            <li className={activeTab === "register" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("register")}>Register</a>
            </li>
          </ul>
        </div>
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box is-one-third mt-4">
              {" "}
              {activeTab === "login" ? (
                <Login fetchMember={fetchMember} />
              ) : (
                <Register />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberAccess;
