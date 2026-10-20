
import { useState, useEffect } from "react";
import "./Login.css";

const STORAGE_KEY = "rememberedUsers";

async function getUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}

async function userAuth(username, password) {
  
  const url = "/api/login/"

  console.log(url)

  const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    });

  console.log("response :", response)

  return ;
}

const AccountCard = ({ username, onRemove, onSelect }) => {
  return (
    <section className="account-card">
      <div className="avatar">
        {username.charAt(0).toUpperCase()}
      </div>

      <div className="account-info">
        <p className="welcome">
          Welcome back, {username}
        </p>
      </div>

      <button
        type="button"
        className="login-button"
        onClick={onSelect}
      >
        Login
      </button>

      <button
        type="button"
        className="remove-button"
        onClick={onRemove}
      >
        Remove
      </button>
    </section>
  );
};

const Login = ({ onSignUp, onLogin }) => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load only remembered accounts when the page opens.
  useEffect(() => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setUsers(Array.isArray(savedUsers) ? savedUsers : []);

      if (!Array.isArray(savedUsers) || savedUsers.length === 0) {
        setShowForm(true);
      }
    } catch {
      setUsers([]);
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remember an account after successful authentication.
  const rememberUser = (user) => {
    if (!user || user.id == null || !user.username) {
      return;
    }

    const account = {
      id: user.id,
      username: user.username,
    };

    setUsers((previousUsers) => {
      const exists = previousUsers.some(
        (item) => String(item.id) === String(account.id)
      );

      const updatedUsers = exists
        ? previousUsers
        : [...previousUsers, account];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedUsers)
      );

      return updatedUsers;
    });
  };

  // Remove the account only from the remembered list.
  const handleRemove = (userId) => {
    const updatedUsers = users.filter(
      (user) => String(user.id) !== String(userId)
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedUsers)
    );

    if (updatedUsers.length === 0) {
      setShowForm(true);
    }
  };

  // Select a remembered account.
  const handleSelect = (user) => {
    setUsername(user.username);
    setPassword("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!onLogin) {
        console.log({ username, password });
        userAuth(username, password)
        setError("Login handler is not configured.");
        return;
      }

      // onLogin should authenticate with the backend
      // and return the authenticated user on success.
      const authenticatedUser = await onLogin({
        username,
        password,
      });

      if (authenticatedUser) {
        rememberUser(authenticatedUser);
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  if (loading) {
    return <p>Loading accounts...</p>;
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <h2 className="logo">Dokoko</h2>
      </header>

      <main className="login-container">
        <section className="login-intro">
          <h1>Login</h1>
          <p>Please select your account</p>
        </section>

        {!showForm && (
          <>
            {users.map((user) => (
              <AccountCard
                key={user.id}
                username={user.username}
                onSelect={() => handleSelect(user)}
                onRemove={() => handleRemove(user.id)}
              />
            ))}

            {users.length === 0 && (
              <p>No remembered accounts.</p>
            )}

            <button
              type="button"
              className="login-button"
              onClick={() => {
                setUsername("");
                setPassword("");
                setShowForm(true);
              }}
            >
              Login to another account
            </button>
          </>
        )}

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

            {error && (
              <p className="error-message">{error}</p>
            )}

            <button type="submit" className="login-button">
              Login
            </button>

            {users.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setShowForm(false);
                }}
              >
                Back to saved accounts
              </button>
            )}
          </form>
        )}

        <div className="signup-link">
          <span>Don't have an account?</span>
          <button type="button" onClick={onSignUp}>
            Sign up
          </button>
        </div>
      </main>

      <footer className="login-footer" />
    </div>
  );
};

export default Login;
