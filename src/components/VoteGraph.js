import { BsFillSquareFill } from "react-icons/bs";

const VoteGraph = ({ num, color }) => {
  const icons = [];
  for (let i = 0; i < num; i++) {
    icons.push(
      <BsFillSquareFill
        color={color}
        key={Math.floor(Math.random() * 100000)}
      />
    );
  }
  return <span className="vote-graph">{icons}</span>;
};

export default VoteGraph;
