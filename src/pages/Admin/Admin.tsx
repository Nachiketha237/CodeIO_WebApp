import { useAuth } from '../../context/authProvider';
import { Link } from 'react-router-dom';

import "react-quill/dist/quill.snow.css";

import styles from "./styles/admin.module.css";
import Events from '../Events/Events';

function Admin() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <div>Please log in to access the admin page. <Link to="/login" > Go to Login</Link></div>;
    }
    
    return (
        <div className={styles.container}>
            <Events/>
        </div>
    );
};

export default Admin;