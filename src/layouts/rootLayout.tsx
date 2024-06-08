// import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import styles from "./styles/rootLayout.module.css";
import { useEffect, useState } from "react";
import Loading from "@/pages/Loading";

export default function RootLayout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an authentication status check delay
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the time as needed
    }, []);
    return (
        <div className={styles['container']}>
            <Navbar/>
            <main>
            <Loading isLoading={loading} />
                <Outlet/>
            </main>
        </div>
    );
    
}