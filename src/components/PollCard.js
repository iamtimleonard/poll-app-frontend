import { useState } from "react";
import Options from "./Options";

const PollCard = ({ question, options, id, handleVote }) => {
  const [active, setActive] = useState(false);
  const [voted, setVoted] = useState(false);
  const updateVoted = () => {
    setVoted(true);
  };

  return (
    <div className="poll-card">
      <h3
        className={`${active && "active"} question pointer`}
        onClick={() => setActive(!active)}
      >
        {question}
      </h3>
      {active && (
        <Options
          updateVoted={updateVoted}
          voted={voted}
          handleVote={handleVote}
          options={options}
          id={id}
        />
      )}
    </div>
  );
};

export default PollCard;
