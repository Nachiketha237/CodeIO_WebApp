
import './App.css'
import routes from './utils/router.tsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './utils/theme.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <RouterProvider router={routes} /> 
    </ThemeProvider>
    </>
  );
}

export default App;
