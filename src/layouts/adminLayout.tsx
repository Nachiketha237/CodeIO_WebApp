import styles from "./styles/authLayout.module.css";
import { useAuth } from "@/context/authProvider";
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/adminNavbar";

function AdminLayout() {
    const { isLoggedIn } = useAuth();
    return (
        <div className={styles.container} >
            
               
                    {isLoggedIn && (
                        <>
                            <AdminNavbar />
                        </>
                    )}
                    <Outlet />
 
        </div>
    );
}

export default AdminLayout;