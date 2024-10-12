import { useState } from "react";
import { LoginProps } from "../../interfaces/member";
import Register from "./Register";
import Login from "./Login";

function MemberAccess({ fetchMember }: LoginProps) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section className="section mt-5 ">
      <div className="columns is-centered">
        <div className="column is-full-mobile is-two-thirds">
          <div className="box">
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
            <div>
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
    </section>
  );
}

export default MemberAccess;
