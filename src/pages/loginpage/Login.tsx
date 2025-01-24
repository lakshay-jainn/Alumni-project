import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FormEvent } from "react";
import styles from "../loginregister.module.css";
import axios from "axios";
import { useContext } from "react";
import {AuthContext} from "@/AuthContext";

function Login() {
  const {setIsLoggedIn , setToken} = useContext(AuthContext)!;

  const navigate = useNavigate()
  const BACKEND_URL = "http://localhost:8080/api/v1/user/signin";


  const [isAlumni, setIsAlumni] = useState(true);
  const handleToggle = (isAlumniSelected: boolean) => {
    setIsAlumni(isAlumniSelected);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.table([email, password, isAlumni]);

    try {
      const response= await axios.post(BACKEND_URL, {
        withCredentials: true,
        email,
        password,
      });
      const data=response.data;

      if (response.status === 200){
        const token = data.token;
        localStorage.setItem("token",token)
        console.log(token)
        setIsLoggedIn(true)
        setToken(token)
        navigate("/")
      }else{
        console.log(data.message)
      }
      
    } catch (e) {
      throw new Error("Login failed. Please try again")
    }
    
  }

  return (
    <div className={styles["mainwrapper"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title-text"]}>
          <div
            style={{
              marginLeft: isAlumni ? "0" : "-50%",
            }}
            className={`${styles["title"]} ${styles["alumni"]}`}
          >
            Alumni Login
          </div>
          <div className={`${styles["title"]} ${styles["student"]}`}>
            Student Login
          </div>
        </div>
        <div className={styles["form-container"]}>
          <div className={styles["slide-controls"]}>
            <button
              onClick={() => handleToggle(true)}
              className={`${styles["slide"]} ${styles["alumni"]} ${
                isAlumni ? styles["active"] : styles["not-active"]
              }`}
            >
              Alumni
            </button>
            <button
              onClick={() => handleToggle(false)}
              className={`${styles["slide"]} ${styles["student"]} ${
                !isAlumni ? styles["active"] : styles["not-active"]
              }`}
            >
              Student
            </button>
            <div
              className={styles["slider-tab"]}
              style={{
                left: isAlumni ? "0" : "50%",
              }}
            ></div>
          </div>
          <div className={styles["form-inner"]}>
            <form onSubmit={onSubmit} className={styles["login"]}>
              <div className={styles["field"]}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className={styles["field"]}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles["pass-link"]}>
                <a href="#">Forgot password?</a>
              </div>
              <div className={`${styles["field"]} ${styles["btn"]}`}>
                <div className={styles["btn-layer"]}></div>
                <input type="submit" value="Login" />
              </div>
              <div className={styles["signup-link"]}>
                Not a member? <Link to="/auth/register">Signup now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
