import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Sorry, root does not exist');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
