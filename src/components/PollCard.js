import { useState } from "react";
import { usePollsContext } from "../context/polls";
import { useUserContext } from "../context/user";
import styles from "./PollCard.module.css";
import Options from "./Options";

const PollCard = ({ question, options, id, createdBy }) => {
  const { user } = useUserContext();
  const [active, setActive] = useState(false);
  const [voted, setVoted] = useState(user.voted.includes(id));
  const { getAllByUser, deletePoll } = usePollsContext();

  return (
    <article aria-live="polite" aria-atomic="true">
      <header className={styles.pollHeader}>
        <h3
          className={`${active && "active"} ${styles.question}`}
          onClick={() => setActive(!active)}
        >
          {question}
        </h3>
        <p>
          Created by:{" "}
          <button
            className={styles.btn}
            onClick={() => getAllByUser(createdBy.id)}
          >
            {createdBy.name}
          </button>
        </p>
      </header>
      {active && (
        <Options voted={voted} setVoted={setVoted} options={options} id={id} />
      )}
      {createdBy.id === user._id && (
        <button onClick={() => deletePoll(id)}>Delete Poll</button>
      )}
    </article>
  );
};

export default PollCard;
