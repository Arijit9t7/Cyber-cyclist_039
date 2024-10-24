import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Login.module.css";
import { auth, provider } from '../../Context/firebase'
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { login, adminLogin } = useAuth();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleGoogleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            axios.get("https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
                .then((res) => {
                    let filterdata = Object.entries(res.data).filter(([key, e]) => {
                        return data.user.email == e.emailID
                    })
                    if (filterdata.length > 0) {
                        localStorage.setItem("currloginuser", JSON.stringify(filterdata))
                        toast.success("Login Successful")
                        login();
                        navigate("/");
                    }
                    else {
                        alert("Please Signup first");
                        navigate("/signup");
                    }
                })
        })

    }

    const handleFOrgotPassword = (e) => {
        toast.success("This feature is not available right now. Please contact the admin for password reset.")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiUrl =
            "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/users.json";

        axios
            .get(apiUrl)
            .then((response) => {
                const users = response.data;

                // Check for admin credentials
                if (email === "admin@gmail.com" && password === "1212") {
                    setStatus("Admin login successful!");
                    adminLogin();
                    navigate("/admin-dashboard/admin"); 
                    return;
                }

                if (!users) {
                    setStatus("Invalid email or password.");
                    return;
                }

                const userFound = Object.values(users).find(
                    (user) => user.email === email && user.password === password
                );

                if (userFound) {
                    setStatus("Login successful!");
                    login();
                    navigate("/");
                } else {
                    setStatus("Invalid email or password.");
                }
            })
            .catch((error) => {
                setStatus("Error logging in. Please try again later.");
                console.error("Error:", error);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.heading}>Log In</h2>
                <p className={styles.subheading}>
                    Welcome back! Please enter your details
                </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className={styles.input}
                    />
                    <a href="#" className={styles.forgotPassword} onClick={handleFOrgotPassword}>
                        Forgot password?
                    </a>
                    <button type="submit" className={styles.button}>
                        Log in
                    </button>
                </form>
                <div className={styles.status}>{status}</div>
                <div className={styles.socialLogin}>
                    <button className={`${styles.socialButton} ${styles.google}`} onClick={handleGoogleClick} >
                        Google Login
                    </button>
                </div>
                <p className={styles.signupPrompt}>
                    Don’t have an account?
                    <Link to="/signup"> Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;