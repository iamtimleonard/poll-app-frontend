import { useUserContext } from "../context/user";
import { usePollsContext } from "../context/polls";
import PollCard from "./PollCard";

const PollsList = ({ getall }) => {
  const { polls } = usePollsContext();
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
            isOwner={poll.createdBy.id === user._id}
          />
        ))}
      </section>
    </>
  );
};

export default PollsList;
