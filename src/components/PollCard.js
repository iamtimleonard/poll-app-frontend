import { useState } from "react";
import Options from "./Options";

const PollCard = ({
  userVoted,
  question,
  options,
  id,
  createdBy,
  handleVote,
  getall,
}) => {
  const [active, setActive] = useState(false);
  let voted = userVoted.includes(id);

  return (
    <article aria-live="polite" aria-atomic="true" className="poll-card">
      <header className="poll-header">
        <h3
          className={`${active && "active"} question pointer`}
          onClick={() => setActive(!active)}
        >
          {question}
        </h3>
        <p>
          Created by:{" "}
          <button onClick={() => getall(createdBy.id)}>{createdBy.name}</button>
        </p>
      </header>
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
