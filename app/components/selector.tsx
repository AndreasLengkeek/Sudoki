import styles from './square.module.css'

interface SelectorProps {
    selected: string;
    onSelected: (x: string) => void;
}
export const Selector = ({selected, onSelected}: SelectorProps) => {
    const possibleNums = Array.from({length: 9}, (_, i) => (i+1).toString());

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