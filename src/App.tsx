
import './App.css'
import routes from './utils/router.tsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './utils/theme.tsx';


function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} /> 
    </ThemeProvider>
     
    </>
  );
}

export default App;
