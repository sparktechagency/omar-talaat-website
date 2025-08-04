'use client'

import store from '@/redux/store/store';
import { Provider } from 'react-redux';
import ClientHydration from './ClientHydration';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ClientHydration>
        {children}
      </ClientHydration>
    </Provider>
  );
}