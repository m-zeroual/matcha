import { useState, useEffect } from "react";
import "./SignUp.css";



const SignUp = ({ onLogin }) => {
  const [signUp, set_signUp] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    // console.log("Form data:", user);

    fetch("/api/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to signUp user");
        }
        return res.json();
      })
      .then((res) => {
        set_signUp(res);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };



  return (
    <div>
      <h2>Sign Up</h2>
      <p>Please fill your information below</p>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            required
          />
        </p>

        <p>
          <input
            type="text"
            name="lastname"
            placeholder="Lastname"
            required
          />
        </p>

        <p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          />
        </p>

        <p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </p>

        <button type="submit">Sign Up</button>
      </form>

      <p>{signUp.email}</p>

      <p>Already have an account?</p>
      <button type="button" onClick={onLogin}>
        Go to Login
      </button>
    </div>
  );
};

export default SignUp;
