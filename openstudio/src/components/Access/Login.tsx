import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { LoginProps } from "../../interfaces/member";

function Login({ fetchMember }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors([]);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/members/login/",
        formData
      );
      localStorage.setItem("token", response.data.token);
      if ("gallery_id" in response.data) {
        localStorage.setItem("gallery_id", response.data.gallery_id);
      }
      setSuccessMessage(response.data.message);
      fetchMember();
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data.errors) {
          setFormErrors(data.errors);
        } else if (data.message) {
          setFormErrors([data.message]);
        } else {
          setFormErrors(["An unexpected error occurred. Please try again."]);
        }
      } else {
        setFormErrors(["An unexpected error occurred. Please try again."]);
      }
    }
  }

  return (
    <div className="section mt-5">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            {successMessage && (
              <div className="notification is-success">{successMessage}</div>
            )}
            {formErrors.length > 0 && (
              <div className="notification is-danger">
                <p>Please correct the following errors:</p>
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit} className="form">
              <div className="field">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password:
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field is-flex is-justify-content-center mt-3">
                <button className="button is-link">Login</button>
              </div>
              <div className="has-text-centered mt-5">
                <p>
                  Don't have an account? Register for an account{" "}
                  <Link to={"/signup"}>here</Link>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
