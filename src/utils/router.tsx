import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/authProvider';
import Admin from '@/pages/Admin/Admin';
import Login from '@/pages/Auth/Login';
import About from '@/pages/About/About';
import Events from '@/pages/Events/Events';
import Home from '@/pages/Home/Home';
import AdminLayout from '@/layouts/adminLayout';
import RootLayout from '@/layouts/rootLayout';
import EventPage from '@/pages/Events/EventPage';
import EventEdit from '@/pages/Admin/Eventedit';
import NewEvent from '@/pages/Admin/NewEvent';
import Register from '@/pages/Events/Register';
// import Logout from '@/pages/Auth/Logout';
// import Forgot from '@/pages/Auth/Forgot';
import QueryTool from '@/pages/Admin/QueryTool';
import PastEvents from '@/pages/Events/PastEvents';
import ContentManager from '@/pages/Admin/ContentManager';

const routes = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<AuthProvider><AdminLayout/></AuthProvider>} >
            {[
                <Route path="/login" element={<Login/>} />,
                <Route path="/admin" element={<Admin/>} />,
                <Route path="/admin/events/new" element={<NewEvent/>} />,
                <Route path="/admin/events/:id" element={<EventEdit/>} />,
                <Route path="/admin/query" element={<QueryTool/>} />,
                // <Route path="/admin/content-manager" element={<ContentManager/>} />,
                // <Route path="/login" element={<Logout/>} />,
                // <Route path="/forgot_password" element={<Forgot/>} />,
            ]}
        </Route>,
        <Route path="/" element={<AuthProvider><RootLayout/></AuthProvider>} >
            {[
                <Route index element={<Home/>} />,
                <Route path="/events" element={<Events/>} />,
                <Route path="/events/:id" element={<EventPage/>} />,
                <Route path="/pastactivities/" element={<PastEvents/>} />,
                <Route path="/events/:id/register" element={<Register/>} />,
                <Route path="/about" element={<About />} />,
                // <Route path="/contact" element={<Contact />} />
            ]}
        </Route>
    ])
);

export default routes;