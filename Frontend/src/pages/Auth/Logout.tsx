import { Link } from "react-router-dom";

function Logout(){
    
    return (
        <div>
            <h1>Logging out...</h1>
            {/* You can add a loading spinner or a message here */}
            <Link to="/login">Go to Login</Link>
        </div>
    );
};

export default Logout;