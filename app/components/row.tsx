import Cell from "../model/cell";
import Square from "./square";
import styles from './square.module.css'

export interface RowProps {
    cells: Cell[];
    rowIndex: number;
    setCell: (x: number, y: number) => void;
}
export const Row = ({ cells, rowIndex, setCell}: RowProps) => {
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