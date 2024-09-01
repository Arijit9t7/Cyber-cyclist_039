import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Signup.module.css';
// import ls from "../assets/ls.jpeg";

const Register = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // State for handling form submission status
  const [status, setStatus] = useState('');

  // Initialize useNavigate
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase API endpoint
    const apiUrl = 'https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

    // Make a POST request to save the data
    axios.post(apiUrl, formData)
      .then((response) => {
        setStatus('User registered successfully!');
        console.log('Response:', response.data);

        // Redirect to login page
        navigate('/login');
      })
      .catch((error) => {
        setStatus('Error registering user.');
        console.error('Error:', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Sign Up</h2>
        <p className={styles.subheading}>Create an account to get started</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
        <p className={styles.status}>{status}</p>
        <p className={styles.loginPrompt}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      {/* <div className={styles.imageContainer}>
        <img src={ls} alt="Fitness" className={styles.image} style={{height:"650px", width:"100%", marginTop:"40px", zIndex:"-1"}} />
      </div> */}
    </div>
  );
};

export default Register;