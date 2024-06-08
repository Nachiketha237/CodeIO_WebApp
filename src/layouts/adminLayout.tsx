import styles from "./styles/authLayout.module.css";
import { useAuth } from "@/context/authProvider";
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/adminNavbar";
import { useEffect, useState } from "react";
import Loading from "@/pages/Loading";


function AdminLayout() {
    const { isLoggedIn } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an authentication status check delay
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the time as needed
    }, []);
    return (
        
        <div className={styles.container} >
            
               
                    {isLoggedIn && (
                        <>
                            <AdminNavbar />
                        </>
                    )}
                    <Loading isLoading={loading} />
                        <Outlet />
 
        </div>
    );
}

export default AdminLayout;