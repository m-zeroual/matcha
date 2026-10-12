import { useState } from "react";
import "./Login.css";

const Login = ({ onSignUp, onLogin }) => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch login");
        }
        return res.json();
      })
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.error("Error fetching login:", error);
      });

    if (onLogin) {
      onLogin({ username, password });
    } else {
      console.log({ username, password });
    }
  };

  const handleRemove = () => {
    setUsername("");
    setPassword("");
    setShowForm(true);
  };

    const AccountCard = ({ users }) => {
    return (
        <section className="account-card">
        <div className="avatar">H</div> 

        <div className="account-info">
            <p className="welcome">Welcome back, {users[0].username}</p>
        </div>

        <button
            type="button"
            className="remove-button"
            onClick={handleRemove}
        >
            Remove
        </button>
        </section>
    );
    };
  
  return (
    <div className="login-page">
      <header className="login-header">
        <h2 className="logo">Matcha</h2>

        <button
          className="menu-button"
          onClick={() => setShowForm(!showForm)}
          type="button"
        >
          <span className="menu-icon">☰</span>
          Menu
        </button>
      </header>

      <main className="login-container">
        <section className="login-intro">
          <h1>Login</h1>
          <p>Please select your account</p>
        </section>


        {!showForm && (
            <AccountCard users={users} />
        )}

        <button
          type="button"
          className="different-account"
          onClick={() => setShowForm(!showForm)}
        >
          <span>＋</span>
          Login to a different account
        </button>

        {showForm && (
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show password
            </label>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        )}

        {!showForm && (
          <button
            type="button"
            className="login-button"
            onClick={() => setShowForm(true)}
          >
            Login
          </button>
        )}

        <div className="signup-link">
          <span>Don't have an account?</span>
          <button type="button" onClick={onSignUp}>
            Sign up
          </button>
        </div>
      </main>

      <footer className="login-footer">
        <p>© 2026 ELBOD2i</p>
      </footer>
    </div>
  );
};

export default Login;