import { useState } from "react";

const PollCardInactive = ({ poll }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <article>
      <h1
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        {poll.question}
      </h1>
      {showOptions && (
        <ul>
          {poll.options.map((option) => (
            <li key={option.id}>{option.text}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default PollCardInactive;
