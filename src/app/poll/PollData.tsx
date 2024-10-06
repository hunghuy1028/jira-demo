export class PollData {
    public labels: string[];
    public datasets: DataSet[] = [];

    constructor() {
        this.datasets.push(new DataSet());
    }

    public clone() {
        const newPollData = new PollData();
        newPollData.datasets = this.datasets;
        newPollData.labels = this.labels;

        return newPollData;
    }

    public setData(data: any[]): void {
        this.datasets[0].data = data;
        this.datasets[0].backgroundColor = data.map((x, index) => BGColor[index % BGColor.length]);
    }

    public setLabels(label: string[]): void {
        this.labels = label;
    }
}

class DataSet {
    public label: string;
    public data: any[];
    public backgroundColor: string[];
    public borderColor: string = "black";
    public borderWidth: number = 2;
}

const BGColor = ["rgba(75,192,192,1)",
    "#ecf0f1",
    "#f0331a",
    "#f3ba2f",
    "#2a71d0"];