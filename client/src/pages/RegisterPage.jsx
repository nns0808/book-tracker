import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post(`${API_URL}/api/users/register`, {
        name,
        email,
        password,
      });

      // redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);

      setErrorMessage(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Registration failed."
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Register</h2>

      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px"
          }}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px"
          }}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            cursor: "pointer"
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;