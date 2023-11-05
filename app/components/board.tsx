'use client'
import { useEffect, useState } from "react";
import styles from './square.module.css'
import { Popup } from "./popup";

interface SquareProps {
    index: number;
    setValue: (x: number) => void;
    children: Cell;
}
export function Square({ index, setValue, children}: SquareProps) {
    const borderStyle = index % 3 == 0 ? styles.rightBorder : '';
    const editableSquare = children.canEdit() ? styles.editableSquare : '';

    const setCell = () => {
        if (children.canEdit()) {
            setValue(index)
        }
    }

    return (
        <button
            className={`${styles.square} ${editableSquare} ${borderStyle}`}
            onClick={setCell}>
            {children.value != 0 ? children.value : '\u00A0'}
        </button>
    );
}

interface RowProps {
    cells: Cell[];
    rowIndex: number;
    setCell: (x: number, y: number) => void;
}
const Row = ({ cells, rowIndex, setCell}: RowProps) => {
    const borderStyle = rowIndex % 3 == 0 ? styles.bottomBorder: '';

    return (
        <div className={`${styles.row} ${borderStyle}`}>
        {cells.map((val, i) => (
            <Square
                key={i}
                index={i}
                setValue={(x) => setCell(x, rowIndex)}>
                    {val}
            </Square>
        ))}
        </div>
    );
}

interface SelectorProps {
    selected: number;
    onSelected: (x: number) => void;
}
const Selector = ({selected, onSelected}: SelectorProps) => {
    const possibleNums = Array.from({length: 10}, (_, i) => i);

    return (
    <div className='flex flex-wrap justify-center'>
        {possibleNums.map((val, i) => {
            const selectedStyle = selected == val ? styles.selected : '';
            return (<button
                key={i}
                className={`${styles.selectButton} ${selectedStyle}`}
                onClick={() => onSelected(val)}>
                    {val}
                </button>);
        })}
    </div>
    )
}

class Cell {
    value: number;
    isInitial: boolean;

    constructor(val: number, isInitial: boolean) {
        this.value = val;
        this.isInitial = isInitial;
    }

    canEdit(): boolean {
        return this.value == 0 || !this.isInitial
    }
}

export default function Board() {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [solution, setSolution] = useState<Cell[][]>([]);
    const [difficulty, setDifficulty] = useState('');
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showIncorrectPopup, setShowIncorrectPopup] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    function onSetCell(col: number, row: number) {
        const newGrid = [...board]
        newGrid[row][col] = new Cell(selectedNumber, false);
        setBoard(newGrid);

        checkWinCondition();
    }

    function checkWinCondition() {
        var isComplete = board.every((rows) => rows.every(col => col.value));
        if (isComplete) {
            if (boardsEqual(board, solution)) {
                setShowSuccessPopup(true);
            } else {
                setShowIncorrectPopup(true);
            }
        }
    }

    function boardsEqual(a: Cell[][], b: Cell[][]): boolean {
        for (var i = 0; i < a.length; ++i) {
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j].value !== b[i][j].value) return false;
            }
          }
          return true;
    }

    function reloadPuzzle() {
        setBoard([]);
        fetchData();
    }

    async function fetchData() {
        const data = await genBoard();
        const grid = data.newboard.grids[0];
        setBoard(grid.value.map((x:number[]) => x.map((y: number) => new Cell(y, true))));
        setSolution(grid.solution.map((x:number[]) => x.map((y: number) => new Cell(y, true))));
        setDifficulty(grid.difficulty)
    }

    return (
        <>
            {showSuccessPopup &&
                (<Popup text="Congratulations! You have completed the puzzle 🎉" togglePopup={(x) => setShowSuccessPopup(false)} />)}
            {showIncorrectPopup &&
                (<Popup text="Not quite right..." togglePopup={(x) => setShowIncorrectPopup(false)} />)}
            <div className={styles.puzzle}>
                <div className={styles.puzzleHeader}>
                    <span>Difficulty: <b>{difficulty}</b></span>
                    <button className={styles.reload} onClick={reloadPuzzle}>{'\u27F3'}</button>
                </div>
                {board.length > 0 ? board.map((val, i) => (
                    <Row key={i} cells={val} rowIndex={i} setCell={onSetCell}></Row>
                )) : (
                    <div>loading</div>
                )}
            </div>
            <div>
                <Selector onSelected={setSelectedNumber} selected={selectedNumber} />
            </div>
        </>
    );
}

const genBoard = async () => {
    const res = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty}}}');

    return res.json();
}