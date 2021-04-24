import { useUserContext } from "../context/user";
import PollCard from "./PollCard";

const PollsList = ({ polls, handleVote }) => {
  const { user } = useUserContext();
  let { voted, created } = user;
  return (
    <>
      <h2 className="heading">Choose a poll below:</h2>
      <section
        role="contentinfo"
        aria-label="List of poll questions"
        className="poll-list"
        aria-live="polite"
      >
        {polls.map((poll) => (
          <PollCard
            userVoted={voted}
            userCreated={created}
            options={poll.options}
            key={poll._id}
            question={poll.question}
            id={poll._id}
            createdBy={poll.createdBy}
            handleVote={handleVote}
          />
        ))}
      </section>
    </>
  );
};

export default PollsList;
