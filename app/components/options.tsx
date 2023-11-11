import styles from './square.module.css'
import { Edit24Regular, Eraser24Regular, Lightbulb24Regular } from "@fluentui/react-icons";

interface OptionsProps {
    selectedNum: string;
    onSelected: (x: string) => void;
}
export const Options = ({selectedNum, onSelected}: OptionsProps) => {
    const selectedStyle = selectedNum == '0' ? styles.selected : '';
    return (
        <div className='flex flex-wrap justify-center'>
            <button
                className={`${styles.selectButton} ${selectedStyle}`}
                onClick={() => onSelected('0')}>
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