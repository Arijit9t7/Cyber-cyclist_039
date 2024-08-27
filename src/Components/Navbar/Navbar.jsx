import React from "react";
import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <header>
            <nav>
                <div>
                    <img className={styles.logo} src={logo} alt="" />
                </div>
                <div className={styles.navlinks}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? "#4CAF50 " : "black",

                        })}
                        className={styles.links}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/login"
                        style={({ isActive }) => ({
                            color: isActive ? "#4CAF50 " : "black",

                        })}
                        className={styles.links}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        style={({ isActive }) => ({
                            color: isActive ? "#4CAF50 " : "black",

                        })}
                        className={styles.links}
                    >
                        Signup
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
