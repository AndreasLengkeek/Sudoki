import Cell from "../model/cell";
import styles from './square.module.css'

export interface SquareProps {
    index: number;
    setValue: (x: number) => void;
    children: Cell;
}
export default function Square({ index, setValue, children}: SquareProps) {
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
            {children.value != '0' ? children.value : '\u00A0'}
        </button>
    );
}