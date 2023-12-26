"use client"
import { Provider } from 'react-redux';
import { store } from './store'; // Ensure the correct path to your store

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
