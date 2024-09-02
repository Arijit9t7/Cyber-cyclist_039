import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../Context/AuthContext"; 

const Navbar = () => {
    const { isLoggedIn, logout, admin } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let local = JSON.parse(localStorage.getItem("currloginuser")) || 'Welcome';
    const name = local[0][1]?.username;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <div>
                    <img className={styles.logo} src={logo} alt="Havenhomes" />
                </div>
                <div className={`${styles.navlinksContainer} ${isMenuOpen ? styles.open : ""}`}>
                    <div id="navlinksofall" className={styles.navlinks}>
                        <NavLink onClick={()=>setIsMenuOpen(!isMenuOpen)}
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive ? "#4CAF50" : "black",
                            })}
                            className={styles.links}
                        >
                            Home
                        </NavLink>
                        <NavLink
                        onClick={()=>setIsMenuOpen(!isMenuOpen)}
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
                            onClick={()=>setIsMenuOpen(!isMenuOpen)}
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
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        ) : (
                            <>
                                <NavLink
                                onClick={()=>setIsMenuOpen(!isMenuOpen)}
                                    to="/login"
                                    style={({ isActive }) => ({
                                        color: isActive ? "#4CAF50" : "black",
                                    })}
                                    className={styles.links}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                onClick={()=>setIsMenuOpen(!isMenuOpen)}
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
                        <p className={styles.links}>
                        {local[0][1]?.username ? local[0][1]?.username : ""}
                    </p>
                    </div>
                    
                </div>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
