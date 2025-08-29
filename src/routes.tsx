import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Details from './components/Details';
import NotFound from './pages/notFound';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
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
