// import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import styles from "./styles/rootLayout.module.css";

export default function RootLayout() {
    return (
        <div className={styles['container']}>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
    
}