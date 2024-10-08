import { useState } from "react"
import { Option } from "./Option";
import BarChart from "../chart/BarChart";
import { PollData } from "./PollData";
import PieChart from "../chart/PieChart";

export default function MultipleChoicePoll({ id }) {

    const [title, setTitle] = useState<string>("");
    const [options, setOptions] = useState<Option[]>([]);
    const [pollData, setPollData] = useState<PollData>(null);
    const [currentSelect, setCurrentSelect] = useState<Option>();
    const [useBarChart, setUseBarChart] = useState(true);

    const addOption = () => {
        const newOption: Option = {
            Id: (new Date()).getTime().toString(),
            Mode: "edit",
            Value: "",
            Count: 0,
            ShowEdit: true
        };
        const newOptions = [...options, newOption];
        setOptions(newOptions);
    }

    const deleteOption = (index) => {
        setOptions(options.filter((x, idx) => idx !== index));
    }

    const changeOption = (index: number, mode?: any, value?: string, showEdit?: boolean) => {
        const newData = [...options];
        const preOption = options[index];
        const newOpt: Option = {
            Id: preOption.Id,
            Mode: mode ?? preOption.Mode,
            Value: value ?? preOption.Value,
            Count: preOption.Count,
            ShowEdit: showEdit ?? preOption.ShowEdit
        };

        newData[index] = newOpt;

        setOptions(newData);
    }

    const showHideEdit = (index, isShow) => {
        changeOption(index, null, null, isShow);
    }

    const selectOption = (e) => {
        const newOptions = [...options];
        decreaseVote(newOptions, currentSelect?.Id);
        increaseVote(newOptions, options[e].Id);

        setCurrentSelect(options[e]);
        setOptions(newOptions);
        setPollData(buildPollData(newOptions));
    }

    const onVote = () => {
        if (!currentSelect) {
            return;
        }

        const newOptions = [...options];
        increaseVote(newOptions, currentSelect.Id);

        setOptions(newOptions);
        setPollData(buildPollData(newOptions));
    }

    const increaseVote = (options: Option[], id: string) => {
        const increaseOpt = options.find(x => x.Id === id);
        increaseOpt.Count++;
    }

    const decreaseVote = (options: Option[], id: string) => {
        const decreaseOpt = options.find(x => x.Id === id);
        if(decreaseOpt){
            decreaseOpt.Count--;
        }
    }

    const buildPollData = (lastedOption: Option[]) => {
        let data: PollData;
        if (!data) {
            data = new PollData();
        }
        else {
            data = pollData.clone();
        }

        data.setLabels(lastedOption.map(x => x.Value));
        data.setData(lastedOption.map(x => x.Count));

        return data;
    }

    return (
        <div className="row">
            <div className="col-6">
                <button onClick={() => setUseBarChart(!useBarChart)}>Current Chart: {useBarChart ? "Bar" : "Pie"}</button>
                <form id="poll" >
                    <input placeholder="Your question" value={title} onChange={e => setTitle(e.target.value)}></input>
                    <button className="ml-2">Done</button>
                    {
                        options.map((option, index) =>
                            <div key={index}>
                                {
                                    option.Mode === "done" ?
                                        <>
                                            <input type="radio"
                                                id={option.Id}
                                                name={id}
                                                value={option.Value}
                                                onChange={() => selectOption(index)}></input>
                                            <label className="ml-2"
                                                htmlFor={option.Id} >{option.Value}</label>
                                            {option.ShowEdit && <button className="ml-2" onClick={() => changeOption(index, "edit", null)} type="button">Edit</button>}
                                        </>
                                        :
                                        <>
                                            <input type="radio" id={option.Id} name={id} value={option.Value} onChange={() => selectOption(index)}></input>
                                            <input autoFocus className="ml-2" value={option.Value} onChange={(e) => changeOption(index, null, e.target.value)}></input>
                                            <button className="ml-2" onClick={(e) => changeOption(index, "done", null)} type="button">Done</button>
                                            <button className="ml-2" onClick={() => deleteOption(index)} type="button">Delete</button>
                                        </>
                                }

                            </div>
                        )
                    }
                </form>
                <br />
                <button onClick={addOption}>Add Option</button>


                <button onClick={onVote}>Vote</button>
            </div>
            <div className="col-6">
                {
                    pollData ?
                        useBarChart ?
                            <BarChart data={pollData} title={title} />
                            :
                            <PieChart data={pollData} title={title}></PieChart>
                        :
                        <></>
                }

            </div>
        </div>
    )
}