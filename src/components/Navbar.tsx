import { NavLink } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import CodeIO from "../assets/CodeIO.jpg";

export default function Navbar() {
    return (
        <header>
            <nav className={styles["navbar"]}>
                     <div className={styles["nav-wrapper"]}>
                        <img src={CodeIO} alt="CodeIO Logo" className={styles["navbar-logo"]} />
                        <h1 className={ styles["navbar-brand"]}>&lt;CodeIO/&gt;</h1>
                    </div>
                    <ul className={styles["nav-links"]}>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/" >Home</NavLink>
                        </li>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/events" >Events</NavLink>
                        </li>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/pastactivities" >Past Activities</NavLink>
                        </li>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/about" >About</NavLink>
                        </li>
                        {/* <li className={styles["nav-link"]}>
                            <NavLink to="/contact" >Contact</NavLink>
                        </li> */}
                        {/* <li className={styles["nav-link"]}>
                            <NavLink to="/logout" >Logout</NavLink>
                        </li> */}
                    </ul>
            </nav>
        </header>
    );
}