import Board from './components/board';
import fs from 'fs';
import { Metadata } from 'next';

function getStaticProps2(): any[] {
  // generate solutions: java -jar hodoku.jar /vs /bs puzzles.txt /o answers.txt
  const puzzleFile = fs.readFileSync('./app/assets/puzzles.csv', 'utf8');
  const puzzles = puzzleFile.split('\n');
  const games = puzzles.map((p, i) => {
    var row = p.split(',');
    return {
      index: row[2] + ' ' + row[4],
      puzzle: row[0],
      sol: row[1],
      diff: row[3]
    };
  });

  console.log('loaded puzzles', games.length)

  return games;
}

export const metadata: Metadata = {
  title: 'Sudoki - by Andreas Lengkeek',
  manifest: '/manifest.json'
};

export default function Home() {
  const games = getStaticProps2();
  return (
    <main className="min-h-screen p-16 flex items-center flex-col">
      <h2 className="text-4xl tracking-tight">Sudoki</h2>
      <span className='mb-8 text-xs'>By Andreas Lengkeek</span>
      <Board games={games} />
    </main>
  );
}
