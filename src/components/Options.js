import { useState } from "react";

const Options = ({ options, id, handleVote, voted, updateVoted }) => {
  const [choice, setChoice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVoted();
    handleVote(parseInt(choice), id);
  };

  return (
    <>
      {voted ? (
        <article>
          {options.map((option) => (
            <p className="vote-result" key={option.id}>{`${option.text}: ${
              option.votes
            } ${option.votes === 1 ? "vote" : "votes"}`}</p>
          ))}
        </article>
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
