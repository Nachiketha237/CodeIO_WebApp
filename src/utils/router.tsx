import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Import your components for each route
import Home from '@/pages/Home/Home';
import About from '@/pages/About/About';
import Contact from '@/pages/Contact/Contact';
import RootLayout from '@/layouts/rootLayout';
import AuthLayout from '@/layouts/authLayout';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Logout from '@/pages/Auth/Logout';
import Events from '@/pages/Events/Events';


// Create your routes using createBrowserRoute
const routes = createBrowserRouter(
    createRoutesFromElements([
    <Route path='/' element={<AuthLayout/>} >
    {
        [
            <Route path='/logout' element={<Logout/>} />,
            <Route path='/login' element={<Login/>} />,
            <Route path='/register' element={<Register/>} />,
            // <Route path='/forgot-password' element={<ForgotPassword/>} />,
            // <Route path='/reset-password' element={<ResetPassword/>} />
        ]
    }
    </Route>,
    <Route path='/' element={<RootLayout/>} >
        {[
            <Route index element={<Home/>} />,
            <Route path="events" element={<Events/>} />,
            <Route path="/about" element={<About />} />,
            <Route path="/contact" element={<Contact />} />
        ]}
    </Route>
]));

export default routes;