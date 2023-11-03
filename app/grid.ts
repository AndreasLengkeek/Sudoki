export class Grid {
    grid: number[][] = [];

    constructor() {
    }

    setGrid(val: number[][]) {
        this.grid = val;
    }

    setCell(x: number, y: number, val: number = 2) {
        console.log('set cell', x, y, val)
        console.log('grid', this)
        this.grid[y][x] = val;
    }
}