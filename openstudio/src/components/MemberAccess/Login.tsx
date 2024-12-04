import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";

import { baseUrl } from "../../config";

import { LoginProps } from "../../interfaces/member";

function Login({ fetchMember }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors([]);

    try {
      const response = await axios.post(`${baseUrl}/members/login/`, formData);
      localStorage.setItem("token", response.data.token);
      if ("gallery_id" in response.data) {
        localStorage.setItem("gallery_id", response.data.gallery_id);
      }
      fetchMember();

      navigate("/");
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
