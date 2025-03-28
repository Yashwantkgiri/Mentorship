import { useState, useContext } from "react";
import { AppContext } from "../../context/Context";
import "./login.css";
import Swal from "sweetalert2";
import { Checkbox } from "semantic-ui-react";
import Axios from "axios";
import { BsSoundwave } from "react-icons/bs";

function Registration({ handleRegister, showPassword, setShowPassword }) {
  const { setUserData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "mentee",
    agreedToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function handleLoading() {
    const isEmpty = Object.values(formData).some((value) => value === "");
    if (isEmpty || !formData.agreedToTerms) {
      setLoading(false);
    } else setLoading(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:8001/api/register", formData)
      .then((response) => {
        setUserData(response.data);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Thank you for registering! Proceed to log in with your new credentials",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "mentee",
          agreedToTerms: false,
        });
        handleRegister();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Sorry, an error occurred during registration.",
        });
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="navbar-logo">
        <h1 className="ui large header">
          Mentor<span>Wave</span>
          <BsSoundwave />
        </h1>
      </div>
      <div id="login-page">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>First Name</label>
            <input
              name="firstName"
              placeholder="Enter your first name"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input
              name="lastName"
              placeholder="Enter your last name"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Email</label>
            <input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              minLength={8}
              placeholder="********"
              title="Password must contain numbers and letters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            <span> {!showPassword ? "Show" : "Hide"} Password</span>
          </div>

          <div className="input-field">
            <label>Account Type</label>
            <select
              name="role"
              className="ui select dropdown register-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <div className="input-field">
            <label>
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
              />{" "}
              I agree to the terms and conditions
            </label>
          </div>

          <button
            onClick={handleLoading}
            type="submit"
            className={
              !loading
                ? "register-btn"
                : "ui fluid loading primary button"
            }
          >
            <i className="signup icon"></i> Register
          </button>
        </form>

        <div className="ui bottom attached message" id="register-message">
          Already signed up? <a onClick={handleRegister}>Login here</a> instead.
        </div>
      </div>
    </div>
  );
}

export default Registration;
