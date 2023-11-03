'use client'
import { useEffect, useState } from "react";
import styles from './square.module.css'
import { Grid } from "../grid";

interface SquareProps {
    index: number;
    setValue: (x: number) => void;
    children: number;
}
export function Square({ index, setValue, children}: SquareProps) {
    const borderStyle = index % 3 == 0 ? styles.rightBorder : '';
    return (
        <button
            className={`${styles.square} ${borderStyle}`}
            onClick={() => setValue(index)}>
            {children != 0 ? children : '\u00A0'}
        </button>
    );
}

interface RowProps {
    arr: number[];
    index: number;
    setCell: (x: number, y: number) => void;
}
const Row = ({ arr, index, setCell}: RowProps) => {
    const borderStyle = index % 3 == 0 ? styles.bottomBorder: '';

    return (
        <div className={`${styles.row} ${borderStyle}`}>
        {arr.map((val, i) => (
            <Square
                key={i}
                index={i}
                setValue={(x) => setCell(x, index)}>
                    {val}
            </Square>
        ))}
        </div>
    );
}

export default function Board() {
    const board = new Grid();
    // const [board, setBoard] = useState<Grid | undefined>(undefined);
    useEffect(() => {
        fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty}}}')
            .then(response => response.json())
            .then(data => {
                console.log('got data')
                // var grid = new Grid();
                board.setGrid(data.newboard.grids[0].value);
                // setBoard(grid);
                console.log('loaded', board);
            });
    }, []);

    // function onSetCell(x: number, y: number) {
    //     const newGrid = [...globalBoard]
    //     globalBoard[y][x] = 2;
    //     setGrid(newGrid);
    // }

    return (
      <>
        {board.grid ? board.grid.map((val, i) => (
          <Row key={i} arr={val} index={i} setCell={board.setCell}></Row>
        )) : (
            <>loading</>
        )}
      </>
    );
}