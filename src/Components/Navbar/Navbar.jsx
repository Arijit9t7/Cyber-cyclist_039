import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import { json, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../Context/AuthContext"; // Use the correct path and hook

const Navbar = () => {
    const { isLoggedIn, logout, admin } = useAuth(); // Access authentication status and logout function


    let local = JSON.parse(localStorage.getItem("currloginuser")) || 'Welcome';
    const name = local[0][1]?.username;
    console.log(name)

    return (
        <header>
            <nav>
                <div>
                    <img className={styles.logo} src={logo} alt="Havenhomes" />
                </div>
                <div className={styles.navlinks}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? "#4CAF50" : "black",
                        })}
                        className={styles.links}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/properties"
                        style={({ isActive }) => ({
                            color: isActive ? "#4CAF50" : "black",
                        })}
                        className={styles.links}
                    >
                        Properties
                    </NavLink>
                    {admin && (
                        <NavLink
                            to="/admin-dashboard/admin"
                            style={({ isActive }) => ({
                                color: isActive ? "#4CAF50" : "black",
                            })}
                            className={styles.links}
                        >
                            Admin Dashboard
                        </NavLink>
                    )}
                    {isLoggedIn || admin ? (
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive ? "#4CAF50" : "black",
                            })}
                            className={styles.links}
                            onClick={logout} // Log out when clicked
                        >
                            Logout
                        </NavLink>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                style={({ isActive }) => ({
                                    color: isActive ? "#4CAF50" : "black",
                                })}
                                className={styles.links}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                style={({ isActive }) => ({
                                    color: isActive ? "#4CAF50" : "black",
                                })}
                                className={styles.links}
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                    <p
                        to="/"
                        className={styles.links}
                    >
                        {local[0][1]?.username ? local[0][1]?.username : "Guest"}
                    </p>
                </div>
            </nav>
        </header>
    );

};

export default Navbar;