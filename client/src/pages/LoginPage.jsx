import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
       });

      const token = response.data.token;

      // Save token
      localStorage.setItem("token", token);

   
      navigate("/");

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Login</h2>

      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Login
        </button>
        <p style={{ marginTop: "10px" }}>
            New here? <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;