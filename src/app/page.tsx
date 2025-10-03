'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import HelloComponent from '@/components/HelloComponent';

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen">
        <HelloComponent />
      </main>
    </Provider>
  );
}

