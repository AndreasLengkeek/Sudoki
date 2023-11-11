export default class Cell {
    value: string;
    solutionVal: string
    isInitial: boolean;

    constructor(val: string, solutionVal: string, isInitial: boolean) {
        this.value = val;
        this.solutionVal = solutionVal;
        this.isInitial = isInitial;
    }

    setValue(val: string) {
        this.value = val;
    }

    isIncorrect(): boolean {
        return this.value != '0' && this.value != this.solutionVal;
    }

    canEdit(): boolean {
        return this.value == '0' || !this.isInitial
    }
}