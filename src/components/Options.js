import { useState } from "react";
import { useUserContext } from "../context/user";
import VoteGraph from "./VoteGraph";

const Options = ({ options, id, handleVote, voted }) => {
  const { handleVoteUser } = useUserContext();
  const [choice, setChoice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVote(parseInt(choice), id);
    handleVoteUser(id);
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
        <ul>
          {options.map((option, index) => (
            <li className="vote-result" key={option.id}>
              <VoteGraph color={colors[index]} num={option.votes} />
              {`${option.text}: ${option.votes} ${
                option.votes === 1 ? "vote" : "votes"
              }`}
            </li>
          ))}
        </ul>
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
