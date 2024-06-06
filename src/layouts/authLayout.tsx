
import styles from "./styles/authLayout.module.css"
import svg from "../assets/react.svg"

import { Outlet } from "react-router-dom";

function AuthLayout() {
    return(
        <>
        <div >
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img className={styles.svg} src={svg} alt="Generic Image" />
                </div>

                <Outlet />
            </div>
         </div>
        </>
    )
}

export default AuthLayout