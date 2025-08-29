import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Details from './components/Details';
import NotFound from './pages/notFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'details/:id',
        element: <Details />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
