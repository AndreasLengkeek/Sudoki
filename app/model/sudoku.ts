export default class Sudoku {
    index: string;
    puzzle: string[][];
    solution: string[][];
    difficulty: string;

    constructor(index: string, puzzle: string, solution: string, difficulty: string) {
        this.index = index;
        this.puzzle = (puzzle.match(/.{1,9}/g)!.map(p => p.split('')));
        this.solution = (solution.match(/.{1,9}/g)!.map(p => p.split('')));
        this.difficulty = difficulty;
    }
}