'use client'
import { useEffect, useState } from "react";
import { SuccessfullyCompletedModal } from "./SuccessfullyCompletedModal";
import { IncorrectCompletedModal } from "./IncorrectCompletedModal";
import Soduku from "../model/soduku";
import styles from './square.module.css'
import { Row } from "./row";
import Cell from "../model/cell";
import { Options } from "./options";
import { Selector } from "./selector";

interface BoardProps {
    games: any[]
};
export default function Board({ games }: BoardProps) {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [solution, setSolution] = useState<Cell[][]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(1);
    const [index, setIndex] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('1');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showIncorrectPopup, setShowIncorrectPopup] = useState(false);

    useEffect(() => {
        setSelectedDifficulty(1);
        reloadPuzzle();
    }, []);

    function onSetCell(col: number, row: number) {
        const newGrid = [...board]
        newGrid[row][col] = new Cell(selectedNumber, solution[row][col].value, false);
        setBoard(newGrid);

        checkWinCondition();
    }

    function checkWinCondition() {
        var isComplete = board.every((rows) => rows.every(col => col.value != '.'));
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

        const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const min = 1+(300*selectedDifficulty);
        const max = 300*(selectedDifficulty+1);
        const game = games[rand(min, max)];
        const data = new Soduku(game.row, game.puzzle, game.sol, game.diff)
        console.log('found game', data)

        setIndex(data.index);
        setBoard(data.puzzle.map((x: string[], xIndex: number) => x.map((y: string, yIndex: number) => new Cell(y, data.solution![xIndex][yIndex], true))));
        setSolution(data.solution!.map((x: string[]) => x.map((y: string) => new Cell(y, y, true))));

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
                                <option value={'1'} selected>Medium</option>
                                <option value={'2'}>Hard</option>
                                <option value={'3'}>Unfair</option>
                        </select>
                    </div>
                    <div className='mt-4'>
                        <span>{index}</span>
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