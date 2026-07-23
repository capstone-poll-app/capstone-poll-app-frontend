import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

//react function to display poll

function Poll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  async function handleVote() {
    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }
    return console.log(selectedOption);
    console.log(selectedOption);
    try {
      // sending the selected option to the server
      const response = await fetch(`http://localhost:3000/polls/${id}/vote`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          OptionId: selectedOption,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      navigate("/");
    } catch (err) {
      setError("Failed to submit the vote");
    }
  }

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        //fectching the poll by it's id
        const response = await fetch(`http://localhost:3000/polls/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch poll");
        }
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        console.error("Error fetching object:", error);
        setError("Failed to load poll.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPoll();
    }
  }, [id]); // Re-runs if the  id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!poll) {
    return <div>Poll not found.</div>;
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <h1>Poll</h1>

        <section className="poll-card">
          {error && <p className="error">{error}</p>}

          <h2>{poll.title}</h2>
          {poll.description && <p>{poll.description}</p>}
          <ul>
            {poll.Options.map((option) => (
              <ul className="vote-option" key={option.id}>
                <label>
                  <input
                    type="radio"
                    name="pollOption"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => {
                      setSelectedOption(option.id);
                      setError("");
                    }}
                  />
                  {option.text}
                </label>
              </ul>
            ))}
          </ul>
          <button type="submit" className="vote-btn" onClick={handleVote}>Vote</button>
        </section>
      </div>
    </>
  );
}

export default Poll;
