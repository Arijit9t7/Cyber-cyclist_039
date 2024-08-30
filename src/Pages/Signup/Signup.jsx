import React from 'react';
import styles from '../Auth.module.css';
import ls from "../../assets/ls.jpeg";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Sign Up</h2>
        <p className={styles.subheading}>Create an account to get started</p>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
        <p className={styles.loginPrompt}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      <div className={styles.imageContainer}>
      <img src={ls} alt="Fitness" className={styles.image} style={{height:"650px",width:"100%",marginTop:"40px",zIndex:"-1"}} />
      </div>
    </div>
  );
};

export default Signup;
