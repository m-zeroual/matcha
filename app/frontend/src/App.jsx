import { useState } from 'react';
import './App.css';
import Login from "./Login";
// import SignUp from "./SignUp";











// const Profile = ({name}) => {
//   return (
//     <div>
//       <profile>
//         <img></img>
//       </profile>
//       <p>Welcome back, {name}</p>
//       <button>Remove</button>
//     </div>
//   );
// };

// const FirstPage = ({ data }) => {
//   return (
//     <div>
//       <Login data={data} />
//       {/* <SignUp data={data} /> */}


//     </div>
//   );
// };






// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/users')
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         return res.json();
//       })
//       .then(users => {
//         setData(users);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {/* <Login data={data} /> */}
//       {/* <SignUp data={data} /> */}

//       <FirstPage data={data} />
//     </div>
//   );
// }

// export default App;









// const Login = ({ onSignUp }) => {
  
//   const [login, set_login] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     const formData = new FormData(e.target);

//     const user = Object.fromEntries(formData.entries());

//     console.log("Form data:", user);

//     fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch login");
//         }
//         return res.json();
//       })
//       .then((res) => {
//         set_login(res);
//       })
//       .catch((error) => {
//         console.error("Error fetching login:", error);
//       });


//   };
  

//   return (
//     <div>
//       <h2>Login</h2>
//       <p>Please select your account</p>

//       <form onSubmit={handleSubmit}>
//         <p>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             required
//           />
//         </p>

//         <p>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//           />
//         </p>

//         <button type="submit">Login</button>
//       </form>

//       <p>{login.message}</p>

//       <p>Don't have an account?</p>
//       <button type="button" onClick={onSignUp}>
//         Go to Sign Up
//       </button>
//     </div>
//   );
// };

const SignUp = ({ onLogin }) => {
  const [sign_up, set_sign_up] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    console.log("Form data:", user);

    fetch("/api/sign_up", {
      method: "POST",
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
        set_sign_up(res);
      })
      .catch((error) => {
        console.error("Error fetching login:", error);
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

      <p>{sign_up.email}</p>

      <p>Already have an account?</p>
      <button type="button" onClick={onLogin}>
        Go to Login
      </button>
    </div>
  );
};



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