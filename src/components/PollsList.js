import { usePollsContext } from "../context/polls";
import styles from "./PollsList.module.css";
import PollCard from "./PollCard";

const PollsList = () => {
  const { polls } = usePollsContext();
  return (
    <>
      <h2 className={styles.heading}>Choose a poll below:</h2>
      <section
        role="contentinfo"
        aria-label="List of poll questions"
        className={styles.list}
        aria-live="polite"
      >
        {polls.map((poll) => (
          <PollCard
            options={poll.options}
            key={poll._id}
            question={poll.question}
            id={poll._id}
            createdBy={poll.createdBy}
          />
        ))}
      </section>
    </>
  );
};

export default PollsList;
