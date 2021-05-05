import { useState } from "react";
import { useUserContext } from "../context/user";
import { usePollsContext } from "../context/polls";
import styles from "./PollCard.module.css";
import VoteGraph from "./VoteGraph";

const Options = ({ options, id, voted, setVoted }) => {
  const { handleVoteUser, user, removeVote } = useUserContext();
  const { handleVote, handleChangeVote } = usePollsContext();
  const [choice, setChoice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVote(parseInt(choice), id);
    handleVoteUser(id);
    setVoted(true);
  };

  const changeVote = () => {
    handleChangeVote(id);
    removeVote(id);
    setVoted(false);
  };

  const colors = [
    "cadetblue",
    "coral",
    "darkslateblue",
    "forestgreen",
    "peru",
    "teal",
    "dodgerblue",
    "firebrick",
    "darkviolet",
    "darksalmon",
    "fuchsia",
    "darkkhaki",
  ];

  return (
    <>
      {voted ? (
        <>
          <ul>
            {options.map((option, index) => (
              <li
                className={`vote-result ${
                  option.votes.includes(user._id) ? styles.vote : styles.option
                }`}
                key={option.id}
              >
                <VoteGraph color={colors[index]} num={option.votes.length} />
                {`${option.text}: ${option.votes.length} ${
                  option.votes.length === 1 ? "vote" : "votes"
                }`}
              </li>
            ))}
          </ul>
          <button onClick={changeVote}>Change Vote</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {options.map((option) => (
            <div className="option-choice" key={option.id}>
              <input
                className="radio pointer"
                onClick={(e) => {
                  setChoice(e.target.value);
                }}
                type="radio"
                name={id}
                id={option.id}
                value={option.id}
              />
              <label className={styles.option} htmlFor={option.id}>
                {option.text}
              </label>
            </div>
          ))}
          <button disabled={!choice && true} className={styles.voteBtn}>
            Vote
          </button>
        </form>
      )}
    </>
  );
};

export default Options;
