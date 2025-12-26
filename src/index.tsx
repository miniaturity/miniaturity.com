import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/Main';
import Projects from './routes/Projects';
import Links from './routes/Links';
import About from './routes/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: "/projects",
        element: <Projects />
      },
      {
        path: "/links",
        element: <Links />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
