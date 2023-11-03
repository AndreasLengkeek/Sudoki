  import styles from './components/square.module.css'

export function Square(props: any) {
  return (
    <button className={styles.square}>{props.children}</button>
  );
}

const Row = (props: any) => {
  const arr: number[] = props.arr;//Array(9).fill(0);
  return (
    <div className={styles.row}>
      {arr.map((val, i) => (
        <Square key={i}>{val}</Square>
      ))}
    </div>
  );
}

const Board = () => {
  const blockSize = 9;
  const grid = [...Array(blockSize)].map(x => [
    ...Array(blockSize).fill(0)
  ]);
  return (
    <>
      {grid.map((val, i) => (
        <Row key={i} arr={val}></Row>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Board />
    </main>
  )
}
