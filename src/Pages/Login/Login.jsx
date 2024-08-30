import React from 'react';
import styles from '../Auth.module.css';
import ls from "../../assets/ls.jpeg";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Log In</h2>
        <p className={styles.subheading}>Welcome back! Please enter your details</p>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>
        <div className={styles.socialLogin}>
          <button className={`${styles.socialButton} ${styles.google}`}>
            Google
          </button>
          <button className={`${styles.socialButton} ${styles.facebook}`}>
            Facebook
          </button>
        </div>
        <p className={styles.signupPrompt}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
      <div className={styles.imageContainer} >
        <img src={ls} alt="Fitness" className={styles.image} style={{height:"650px",width:"100%",marginTop:"40px",zIndex:"-1"}} />
      </div>
    </div>
  );
};

export default Login;
