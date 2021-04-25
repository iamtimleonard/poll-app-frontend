import { useState } from "react";
import { useUserContext } from "../context/user";
import { usePollsContext } from "../context/polls";
import VoteGraph from "./VoteGraph";

const Options = ({ options, id, voted }) => {
  const { handleVoteUser, user } = useUserContext();
  const { handleVote, handleChangeVote } = usePollsContext();
  const [choice, setChoice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVote(parseInt(choice), id);
    handleVoteUser(id);
  };

  const changeVote = () => {
    handleChangeVote(id);
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
                  option.votes.includes(user._id) ? "user-vote" : "option"
                }`}
                key={option.id}
              >
                <VoteGraph color={colors[index]} num={option.votes.length} />
                {`${option.text}: ${option.votes.length} ${
                  option.votes === 1 ? "vote" : "votes"
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
              <label className="option-label pointer" htmlFor={option.id}>
                {option.text}
              </label>
            </div>
          ))}
          <button disabled={!choice && true} className="vote-button pointer">
            Vote
          </button>
        </form>
      )}
    </>
  );
};

export default Options;
