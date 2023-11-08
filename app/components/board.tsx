'use client'
import { useEffect, useState } from "react";
import styles from './square.module.css'
import { Edit24Regular, Eraser24Regular, Lightbulb24Regular } from "@fluentui/react-icons";
import { SuccessfullyCompletedModal } from "./SuccessfullyCompletedModal";
import { IncorrectCompletedModal } from "./IncorrectCompletedModal";
import Sudoku from "../model/sudokusolver";

interface SquareProps {
    index: number;
    setValue: (x: number) => void;
    children: Cell;
}
export function Square({ index, setValue, children}: SquareProps) {
    const borderStyle = index % 3 == 0 ? styles.rightBorder : '';
    const editableSquare = children.canEdit() ? styles.editableSquare : '';
    const incorrectStyle = children.isIncorrect() ? styles.incorrectStyle : '';

    const setCell = () => {
        if (children.canEdit()) {
            setValue(index)
        }
    }

    return (
        <button
            className={`${styles.square} ${editableSquare} ${borderStyle} ${incorrectStyle}`}
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
    const possibleNums = Array.from({length: 9}, (_, i) => i+1);

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

interface OptionsProps {
    selectedNum: number;
    onSelected: (x: number) => void;
}
const Options = ({selectedNum, onSelected}: OptionsProps) => {
    const selectedStyle = selectedNum == 0 ? styles.selected : '';
    return (
        <div className='flex flex-wrap justify-center'>
            <button
                className={`${styles.selectButton} ${selectedStyle}`}
                onClick={() => onSelected(0)}>
                    <Eraser24Regular />
            </button>
            <button className={`${styles.selectButton} ${styles.selectDisable}`} disabled title="Hint">
                <Lightbulb24Regular />
            </button>
            <button className={`${styles.selectButton} ${styles.selectDisable}`} disabled title="Pencil Marks">
                <Edit24Regular />
            </button>
        </div>
    );
}

class Cell {
    value: number;
    solutionVal: number
    isInitial: boolean;

    constructor(val: number, solutionVal: number, isInitial: boolean) {
        this.value = val;
        this.solutionVal = solutionVal;
        this.isInitial = isInitial;
    }

    setValue(val: number) {
        this.value = val;
    }

    isIncorrect(): boolean {
        return this.value != 0 && this.value != this.solutionVal;
    }

    canEdit(): boolean {
        return this.value == 0 || !this.isInitial
    }
}

export default function Board() {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [solution, setSolution] = useState<Cell[][]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(1);
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showIncorrectPopup, setShowIncorrectPopup] = useState(false);

    useEffect(() => {
        setSelectedDifficulty(0);
        fetchData(1);
    }, []);

    function onSetCell(col: number, row: number) {
        const newGrid = [...board]
        newGrid[row][col] = new Cell(selectedNumber, solution[row][col].value, false);
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
        fetchData(selectedDifficulty);
    }

    async function fetchData(diff: number) {
        const data = await genBoard(diff);
        setBoard(data.value.map((x: number[], xIndex: number) => x.map((y: number, yIndex: number) => new Cell(y, data.solution![xIndex][yIndex], true))));
        setSolution(data.solution!.map((x: number[]) => x.map((y: number) => new Cell(y, y, true))));
        console.log('found solution', data.solution);
    }

    function setDifficulty(value: string) {
        setSelectedDifficulty(Number(value));
    }

    function successPopupResult(x: boolean, reload: boolean) {
        setShowSuccessPopup(false);
        if (reload) {
            reloadPuzzle();
        }
    }

    return (
        <>
            <SuccessfullyCompletedModal open={showSuccessPopup} text="You have completed the puzzle 🎉" title="Congratulations!" togglePopup={successPopupResult} />
            <IncorrectCompletedModal open={showIncorrectPopup} title="Not quite right..." text="You have some incorrent spaces" togglePopup={(x) => setShowIncorrectPopup(false)} />
            <div className={styles.puzzle}>
                <div className={styles.puzzleHeader}>
                    <div className='py-2'>
                        <span>Difficulty:</span>
                        <select
                            className='inline ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={(e) => setDifficulty(e.target.value)}>
                                <option value={'0'}>Easy</option>
                                <option value={'1'}>Medium</option>
                                <option value={'2'}>Hard</option>
                        </select>
                    </div>
                    <button className={styles.reload} onClick={reloadPuzzle}>{'\u27F3'}</button>
                </div>
                {board.length > 0 ? board.map((val, i) => (
                    <Row key={i} cells={val} rowIndex={i} setCell={onSetCell}></Row>
                )) : (
                    <div>loading</div>
                )}
            </div>
            <div>
                <Options onSelected={setSelectedNumber} selectedNum={selectedNumber} />
            </div>
            <div>
                <Selector onSelected={setSelectedNumber} selected={selectedNumber} />
            </div>
        </>
    );
}

const genBoard = async (selectedDifficulty: number) => {
    const s = new Sudoku({ mode: "9" });
    s.generate(selectedDifficulty);
    const grid = s.grid;

    const nsudoku = new Sudoku();
    nsudoku.setBoard(grid.map(x => x.slice()));
    const solgrid = nsudoku.solve();

    return {
        value: grid,
        solution: solgrid,
        difficulty: s.getDifficulty(),
    };
}