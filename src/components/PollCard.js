import { useState } from "react";
import Options from "./Options";

const PollCard = ({ userVoted, question, options, id, handleVote }) => {
  const [active, setActive] = useState(false);
  let voted = userVoted.includes(id);

  return (
    <article aria-live="polite" aria-atomic="true" className="poll-card">
      <h3
        className={`${active && "active"} question pointer`}
        onClick={() => setActive(!active)}
      >
        {question}
      </h3>
      {active && (
        <Options
          voted={voted}
          handleVote={handleVote}
          options={options}
          id={id}
        />
      )}
    </article>
  );
};

export default PollCard;
