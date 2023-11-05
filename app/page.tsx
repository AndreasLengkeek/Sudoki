import Board from './components/board';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sudoki - by Andreas Lengkeek',
  manifest: '/manifest.json'
};

export default function Home() {
  return (
    <main className="min-h-screen p-16 flex items-center flex-col">
      <h2 className="text-4xl tracking-tight">Sudoki</h2>
      <span className='mb-8 text-xs'>By Andreas Lengkeek</span>
      <Board />
    </main>
  );
}
