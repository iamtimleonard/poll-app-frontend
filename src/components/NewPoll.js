import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./NewPoll.module.css";
import { useUserContext } from "../context/user";
import { usePollsContext } from "../context/polls";

const NewPoll = () => {
  const { user } = useUserContext();
  const { handleCreate } = usePollsContext();
  const [question, setQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([]);

  const handleAddOption = (e) => {
    e.preventDefault();
    const newOptionObj = {
      text: newOption,
      id: Math.floor(Math.random() * 100000),
    };
    setOptions([...options, newOptionObj]);
    setNewOption("");
  };

  const createPoll = (e) => {
    e.preventDefault();
    let optionsList = options.map((option) => {
      option.votes = [];
      return option;
    });
    const pollData = {
      question,
      options: optionsList,
      createdBy: { name: user.name, id: user._id },
    };
    setQuestion("");
    setNewOption("");
    setOptions([]);
    handleCreate(pollData);
  };
  const deleteOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };
  return (
    <section className="new-poll">
      <h2 className={styles.heading}>Create a New Poll</h2>
      <form>
        <div className={styles.formControl}>
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            name=""
            id=""
            placeholder="Poll question"
            aria-label="poll question"
            aria-required="true"
          />
        </div>
        {options.map((option, index) => (
          <p className={styles.optionInput} key={option.id}>
            {option.text}
            <span className={styles.icon} aria-label="delete response option">
              <FaTrashAlt
                size={16}
                color="red"
                onClick={() => deleteOption(option.id)}
              />
            </span>
          </p>
        ))}
        <div className={styles.formControl}>
          <input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            type="text"
            placeholder="Response option"
            aria-label="type new response option"
          />
        </div>
        <div className={styles.buttons}>
          <button disabled={!newOption.length} onClick={handleAddOption}>
            Add option
          </button>
          <button
            onClick={createPoll}
            disabled={
              newOption.length || options.length < 2 || !question.length
            }
            type="submit"
          >
            Submit New Poll
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewPoll;
