import { NavLink } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import CodeIO from "../assets/CodeIO.jpg";

export default function AdminNavbar() {
    return (
        <header>
            <nav className={styles["navbar"]}>
                     <div className={styles["nav-wrapper"]}>
                        <img src={CodeIO} alt="CodeIO Logo" className={styles["navbar-logo"]} />
                        <h1 className={ styles["navbar-brand"]}>&lt;CodeIO/&gt;</h1>
                    </div>
                    <ul className={styles["nav-links"]}>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/admin/events/new" >New Event</NavLink>
                        </li>
                        <li className={styles["nav-link"]}>
                            <NavLink to="/logout" >Logout</NavLink>
                        </li>
                       
                        {/* <li className={styles["nav-link"]}>
                            <NavLink to="/logout" >Logout</NavLink>
                        </li> */}
                    </ul>
            </nav>
        </header>
    );
}