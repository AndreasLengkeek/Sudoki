import Board from './components/board';
import fs from 'fs';
import { Metadata } from 'next';

function getStaticProps(): any[] {
  // generate puzzles (easy): java -jar hodoku.jar /s /sl 0 /o easy.txt
  // generate solutions: java -jar hodoku.jar /vs /bs puzzles.txt /o answers.txt
  const puzzleFile = fs.readFileSync('./app/assets/puzzles.txt', 'utf8');
  const solutionFile = fs.readFileSync('./app/assets/answers.txt', 'utf8');
  const puzzles = puzzleFile.split('\n');
  const solutions = solutionFile.split('\n');
  const games = puzzles.map((p, i) => {
    var row = solutions[i].split(' ');
    return {
      row: row[1] + ' ' + row[3],
      puzzle: p.split(' ')[0],
      sol: row[0],
      diff: row[2]
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
  const games = getStaticProps();
  return (
    <main className="min-h-screen p-16 flex items-center flex-col">
      <h2 className="text-4xl tracking-tight">Sudoki</h2>
      <span className='mb-8 text-xs'>By Andreas Lengkeek</span>
      <Board games={games} />
    </main>
  );
}
