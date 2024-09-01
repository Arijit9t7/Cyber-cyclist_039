import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import Logo from '../../assets/Logo.png'

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerMain}>
                <div className={styles.footerLogo}>
                    <img src={Logo} alt="havenHomes" />
                    <div>
                        <RiFacebookFill className={styles.footerIcons} />
                        <FaTwitter className={styles.footerIcons} />
                        <FaInstagram className={styles.footerIcons} />
                        <FaLinkedinIn className={styles.footerIcons} />
                        <FaYoutube className={styles.footerIcons} />
                    </div>
                </div>
                <div className={styles.footerLinks}>
                    <h4>Product</h4>
                    <Link to="/rent">Rent Property</Link>
                    <Link to="/advertise">Advertise</Link>
                    <Link to="/find-agent">Our agent</Link>
                </div>
                <div className={styles.footerLinks}>
                    <h4>Company</h4>
                    <Link to="/about">About</Link>
                    <Link to="/contact-us">Contact us</Link>
                </div>
                <div className={styles.footerLinks}>
                    <h4>Support</h4>
                    <Link to="/getting-started">Getting started</Link>
                    <Link to="/help-center">Help center</Link>
                    <Link to="/report-bug">Report a bug</Link>
                    <Link to="/chat-support">Chat support</Link>
                </div>
                <div className={styles.footerLinks}>
                    <h4>Contact us</h4>
                    <Link to="mailto:beehome@gmail.com">contact@havenhomes.com</Link>
                    <Link to="tel:"> (414)687-5892</Link>
                    <Link to="/">Karnataka, India</Link>
                </div>
            </div>
            <hr />
            <div className={styles.footerMainDown}>
                <span>Copyright © HavenHomes - 2024</span>
                <span>All rights reserved | Terms & Conditions | Privacy Policy</span>
            </div>
        </footer>
    );
};

export default Footer;