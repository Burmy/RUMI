import { useState, React, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Axios from "axios";
import "./Form.css";
import configData from "../../Configs/config.json";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../Chat/Firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [fbUsername, setFBUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };

    let email;

    Axios.defaults.withCredentials = true;
    Axios.post(configData.SERVER_URL + "users/login", data)
      .then((response) => {
        console.log("logged in sql db");
        // toast.success("Logged In!", {
        //     position: "top-right",
        //     autoClose: 4000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     closeButton: false,
        //     progress: 0,
        // });
        email = response.data.result.email;
        localStorage.setItem("loggedUserid", Cookies.get("loggedUserid"));
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((cred) => {
        console.log("logged in firebase", cred.user);
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data.err_message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

//   const getEmail = () => {
//     db.collection("users")
//       .where("username", "==", fbUsername)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           setFBUsername(doc.get("email"));
//           console.log(doc.get("email"));
//         });
//       })
//       .catch(function (error) {
//         console.log("Error getting documents: ", error);
//       });
//   };

  return (
    <div className="form-container">
      <div className="login-card">
        <form className="form" noValidate>
          <p className="form-heading">Welcome Back!</p>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            //   setFBUsername(e.target.value);
            }}
          />

          <input
            className="form-input"
            type="text"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            // onClick={getEmail}
          />
          <button className="form-input-btn" onClick={login} type="button">
            Log in
          </button>
          <p className="form-input-login">
            Not a member yet? Sign up{" "}
            <Link className="login-link" to="/register">
              here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
