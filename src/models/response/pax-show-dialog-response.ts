type PaxShowDialogResponseParams = {
    selectedButtonNum: number
}

export default class PaxShowDialogResponse {
    selectedButtonNum;
    constructor({ selectedButtonNum }: PaxShowDialogResponseParams) {
        this.selectedButtonNum = selectedButtonNum;
    }

    static fromList(fields: any[]) {
        return new PaxShowDialogResponse({
            selectedButtonNum: fields[6],
        });
    }

    toJson() {
        return {
            'selectedButtonNum': this.selectedButtonNum,
        }
    }
}