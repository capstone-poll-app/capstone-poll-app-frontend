import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

//react function to display poll

function Poll() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  async function handleVote() {
    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }
    console.log(selectedOption);
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

        <section className="card">
          {error && <p className="error">{error}</p>}

          <h2>{poll.title}</h2>
          <p>{poll.description}</p>
          <ul>
            {poll.Options.map((option, i) => (
              <li className="option-item" key={i}>
                <label>
                  <input
                    type="radio"
                    name="pollOption"
                    value={option.text}
                    checked={selectedOption === option.text}
                    onChange={() => {
                      setSelectedOption(option.text);
                      setError("");
                    }}
                  />
                  {option.text}
                </label>
              </li>
            ))}
            <button onClick={handleVote}>Vote</button>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Poll;

//Set error if user didn't vote and radio button !!!
