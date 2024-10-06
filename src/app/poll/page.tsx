"use client";

import { ChangeEvent, useState } from "react";
import Poll from "./Poll";
import MultipleChoicePoll from "./MultipleChoicePoll";
import CheckboxesPoll from "./CheckBoxesPoll";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function PollPage() {

  const [polls, setPolls] = useState<Poll[]>([]);
  const [currentSelectPoll, setCurrentSelectPoll]= useState("multiple");

  const onSelectPoll = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentSelectPoll(event.target.value);
  }

  const onCreatePoll = () => {
    const poll = new Poll();
    poll.Type = currentSelectPoll;
    poll.Name = "poll" + (polls.length + 1);
    setPolls([...polls, poll]);
  }

  return (
    <div>
      <h2>Create your poll</h2>
      <div className="mt-2">
        <select name="poll-type" id="poll" value={currentSelectPoll} onChange={onSelectPoll}>
          <option value="multiple">Multiple Choices</option>
          <option value="checkbox">Checkboxes</option>
        </select>
        <button onClick={onCreatePoll}>Create</button>
      </div>

      {
        polls.map((poll, index) => <div className="mt-2" key={index}>
          {
            poll.Type === "multiple" ? 
            <MultipleChoicePoll id={poll.Name}></MultipleChoicePoll>
            : <CheckboxesPoll></CheckboxesPoll>
          }
          <hr/>
        </div>)
      }
    </div>
  );
}
