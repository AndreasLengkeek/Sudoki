import Board from './components/board';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sudoki - by Andreas Lengkeek',
};

export default function Home() {
  return (
    <main className="min-h-screen p-16 flex items-center flex-col">
      <h2 className="text-4xl tracking-tight mb-8">Sudoki</h2>
      <Board />
    </main>
  );
}
