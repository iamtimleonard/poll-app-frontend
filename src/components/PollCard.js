import { useState } from "react";
import { usePollsContext } from "../context/polls";
import Options from "./Options";

const PollCard = ({
  userVoted,
  question,
  options,
  id,
  createdBy,
  handleVote,
}) => {
  const [active, setActive] = useState(false);
  let voted = userVoted.includes(id);
  const { getAllByUser } = usePollsContext();
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
          <button
            className="poll-user-btn"
            onClick={() => getAllByUser(createdBy.id)}
          >
            {createdBy.name}
          </button>
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
