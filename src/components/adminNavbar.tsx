import { NavLink } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import CodeIO from "../assets/CodeIO.jpg";
import { Button } from "@chakra-ui/react";
import supabase from "@/config/supabaseClient";
import { useAuth } from "@/context/authProvider";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        let { error } = await supabase.supabase.auth.signOut(); 
        if (error) {
            console.log('Error logging out:', error.message);
            
        } 
        else {
            console.log('Logged out successfully');
            setIsLoggedIn(false);
            navigate('/login'); 
        }
    };

    return (
        <header>
            <nav className={styles.navbar}>
                <div className={styles["nav-wrapper"]}>
                    <img src={CodeIO} alt="CodeIO Logo" className={styles["navbar-logo"]} />
                    <h1 className={styles["navbar-brand"]}>&lt;CodeIO/&gt;</h1>
                </div>
                <ul className={styles["nav-links"]}>
                    <li className={styles["nav-link"]}>
                        <NavLink to="/admin/events/new">New Event</NavLink>
                    </li>
                    {isLoggedIn ? (
                        <li className={styles["nav-link"]}>
                            <Button mt={4} size="sm" fontSize="13px" onClick={handleLogout}>
                                Logout
                            </Button>
                        </li>
                    ) : (
                        <li className={styles["nav-link"]}>
                            {/* Render a disabled button or handle differently if not logged in */}
                            <Button mt={4} size="sm" fontSize="13px" disabled>
                                Logout
                            </Button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
