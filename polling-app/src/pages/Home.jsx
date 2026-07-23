import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PollCard from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolls = useCallback(async () =>{

      try {
        const response = await fetch("http://localhost:3000/");
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        setPolls(data);
      } catch (err) {
        console.error("Failed to fetch polls:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
  })

  useEffect(() => {
    fetchPolls();
  }, []);

  async function deletePoll(id) {
    try {
        // console.log(Number(id))
      const response = await fetch(`http://localhost:3000/polls/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch poll");
      } 
    //   Navigate("/")
    fetchPolls();
    } catch (err) {
        console.log(err)
      setError("Failed to delete poll.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="app">
        <h1>Polling App</h1>

        <section className="card">
          {loading && <p>Loading polls...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (
            <ul className="poll-list">
              {polls.length === 0 ? (
                <p>No polls yet.</p>
              ) : (
                polls.map((poll) => (
                  <PollCard key={poll.id} poll={poll} deletePoll={deletePoll} />
                ))
              )}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default Home;
