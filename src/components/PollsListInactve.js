import React from "react";
import { usePollsContext } from "../context/polls";
import PollCardInactive from "./PollCardInactive";

const PollsListInactve = () => {
  const { polls } = usePollsContext();
  return (
    <div>
      <h1>Current Polls:</h1>
      <p>Log in to vote</p>
      {polls.map((poll) => (
        <PollCardInactive key={poll._id} poll={poll} />
      ))}
    </div>
  );
};

export default PollsListInactve;
