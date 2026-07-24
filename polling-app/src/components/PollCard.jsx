import { useState } from "react";
import { Link } from "react-router";

function PollCard({ poll, onVote, id }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");

  const handleVote = () => {
    console.log("handle-vte fires")
    if (!selectedOption) {
      setError("Please select an option before voting.");
      return;
    }
    setError("");
    onVote(id, selectedOption);
  };

  let button;
  if (!poll.status) {
    button = <section className="btn-container">
    <p>Voting Closed</p>
    <Link className="result-btn" to={`/polls/${id}/result`}>Result</Link>
    </section>
  } else {
    button = <button type="submit" className="vote-btn" onClick={handleVote}>
      Vote
    </button>;
  }

  return (
    <section className="poll-card">
      {error && <p className="error">{error}</p>}

      <h2>{poll.title}</h2>
      {poll.description && <p>{poll.description}</p>}

      <ul>
        {poll.Options.map((option) => (
          <li className="vote-option" key={option.id}>
            <label>
              <input
                type="radio"
                name="pollOption"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => {
                  console.log("selected: ", option.id )
                  setSelectedOption(option.id);
                  setError("");
                }}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>

      {button}
    </section>
  );
}

export default PollCard;
