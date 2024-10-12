import { useState, SyntheticEvent } from "react";
import axios from "axios";

interface RegisterProps {
  handleRegisterSuccess: () => void;
}

function Register( {handleRegisterSuccess}: RegisterProps) {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_type: "",
    bio: "",
    website: "",
    artist_address: "",
    collector_address: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;
    const newFormData = {
      ...registerFormData,
      [fieldName]: targetElement.value,
    };
    setRegisterFormData(newFormData);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors([]);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:8000/members/register/",
        registerFormData
      );
      handleRegisterSuccess()
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data.errors) {
          setFormErrors(data.errors);
        } else {
          setFormErrors(["An unexpected error occurred. Please try again."]);
        }
      } else {
        setFormErrors(["An unexpected error occurred. Please try again."]);
      }
    }
  }

  return (
    <div className="section">
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
                <label htmlFor="username" className="label">
                  Username:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="username"
                    value={registerFormData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="first_name" className="label">
                  First Name:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="first_name"
                    value={registerFormData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="last_name" className="label">
                  Last Name:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="last_name"
                    value={registerFormData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={registerFormData.email}
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
                    value={registerFormData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password_confirmation" className="label">
                  Password Confirmation:
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password_confirmation"
                    value={registerFormData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="user_type" className="label">
                  Account Type:
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      name="user_type"
                      value={registerFormData.user_type}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Account Type
                      </option>
                      <option value="artist">Artist</option>
                      <option value="collector">Collector</option>
                    </select>
                  </div>
                </div>
              </div>

              {registerFormData.user_type === "artist" && (
                <>
                  <div className="field">
                    <label htmlFor="bio" className="label">
                      Artist Bio
                    </label>
                    <div className="control">
                      <textarea
                        name="bio"
                        className="textarea"
                        value={registerFormData.bio}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="website" className="label">
                      Website/Social Profile:
                    </label>
                    <div className="control">
                      <input
                        type="url"
                        className="input"
                        name="website"
                        value={registerFormData.website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="artist_address" className="label">
                      Address:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        name="artist_address"
                        value={registerFormData.artist_address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {registerFormData.user_type === "collector" && (
                <>
                  <div className="field">
                    <label htmlFor="collector_address" className="label">
                      Address:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        name="collector_address"
                        value={registerFormData.collector_address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="field is-flex is-justify-content-center mt-4">
                <button className="button is-link">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
