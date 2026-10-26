import { useState } from 'react';
import './App.css';
import Login from "./Login";
import SignUp from "./SignUp";

var userIdx = 0;

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" ? (
        <Login onSignUp={() => setPage("signup")} />
      ) : (
        <SignUp onLogin={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;