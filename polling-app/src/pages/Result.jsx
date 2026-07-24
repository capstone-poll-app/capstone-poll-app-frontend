import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";

import Navbar from "../components/Navbar";

function Results() {
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  //   const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`http://localhost:3000/polls/${id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setPoll(data);
    } catch (err) {
      console.error("Failed to fetch polls:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  function createContent(options) {
    const maxVotes = Math.max(...options.map((o) => o.Votes.length), 1);
    return (
      <section className="result-card">
        <ol className="bar-chart">
          {options.map((option) => {
            const percent = (option.Votes.length / maxVotes) * 100; // largest = 100%, rest scaled relative to it

            return (
              <section className="optn-container" key={option.id}>
                <p className="optn-text">{option.text}</p>
                <li className="bar" style={{ height: `${percent}%` }}>
                  {option.Votes.map((Vote) => (
                    <div key={Vote.id} className="unit"></div>
                  ))}
                </li>
                <p>{option.Votes.length}</p>
              </section>
            );
          })}
        </ol>
      </section>
    );
  }

  let content;
  let winner;

  if (loading) {
    return <p>Loading results...</p>;
  } else if (error) {
    return <p className="error">Error: {error}</p>;
  } else if (poll) {
    content = createContent(poll.Options);
    const maxVotes = Math.max(...poll.Options.map((o) => o.Votes.length), 1);
    winner = poll.Options.find((option) => option.Votes.length === maxVotes);
  }

  return (
    <div className="app">
      <Navbar />
      <span className="result">
        <h2 className="win-text">The Winner is: {winner.text}</h2>
        <>{content}</>
      </span>
    </div>
  );
}

export default Results;
