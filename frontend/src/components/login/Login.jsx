import { useState, useContext } from "react";
import { AppContext } from "../../context/Context";
import "./login.css";
import Swal from "sweetalert2";
import Axios from "axios";
import { BsSoundwave } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Login({ handleRegister, showPassword, setShowPassword }) {
  const { setUserData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.get("http://localhost:8001/api/login", {
      params: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => {
        setUserData(response.data);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${response.data.firstName}`,
        });

        // ✅ Passing user data while navigating
        if (response.data.role === "mentor") {
          navigate("/mentor-dashboard", { state: { user: response.data } });
        } else if (response.data.role === "mentee") {
          navigate("/mentee-dashboard", { state: { user: response.data } });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Unknown Role",
            text: "Please contact admin",
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response?.data?.error || "An unexpected error occurred",
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field checkbox-field">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            <span>{!showPassword ? "Show" : "Hide"} Password</span>
          </div>

          <button
            type="submit"
            className={!loading ? "login-btn" : "ui fluid loading primary button"}
            disabled={loading}
          >
            <i className="sign-in icon"></i> {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="ui bottom attached message" id="register-message">
          New here?{" "}
          <a onClick={handleRegister} style={{ cursor: "pointer" }}>
            Register here
          </a>{" "}
          instead.
        </div>
      </div>
    </div>
  );
}

export default Login;
