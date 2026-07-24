import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PollCard from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [polls, setPolls] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sinceRef = useRef(null);
  const stoppedRef = useRef(false);

  const [filterType, setFilterType] = useState("all"); // "all" | "open" | "closed"


  const fetchPolls = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setPolls(data.data);
    } catch (err) {
      console.error("Failed to fetch polls:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    stoppedRef.current = false;
    const controller = new AbortController();

    async function pollLoop() {
      if (stoppedRef.current) return;

      try {
        const url = sinceRef.current
          ? `http://localhost:3000/polls?since=${encodeURIComponent(sinceRef.current)}`
          : "http://localhost:3000/polls";

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        const { data, changed, version } = await res.json();
        sinceRef.current = version;

        if (changed) {
          setPolls(data);
        }
        setError(null); // clear any previous error once a request succeeds
      } catch (err) {
        console.error("Poll error:", err);
        setError(err.message);
        await new Promise((r) => setTimeout(r, 5000)); // back off 5s on error
      } finally {
        setLoading(false); // first response (success or fail) ends the initial loading state
      }

      if (!stoppedRef.current) {
        pollLoop();
      }
    }

    pollLoop();

    return () => {
      stoppedRef.current = true;
      controller.abort();
    };
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
      console.log(err);
      setError("Failed to delete poll.");
    }
  }

function handleFilter() {
  if (filterType === "open") {
    return polls.filter((poll) => poll.status === true).reverse();
  } else if (filterType === "closed") {
    return polls.filter((poll) => poll.status === false).reverse();
  } else {
    return [...polls].reverse();
  }
}

  return (
    <>
      <Navbar />
      <div className="app">
        <h1>Polling App</h1>
        <section className="filter-container">
          <button className="filter-btn" onClick={()=> setFilterType("All")}>All</button>
          <button className="filter-btn" onClick={()=> setFilterType("open")}>Open</button>
          <button className="filter-btn" onClick={()=> setFilterType("closed")}>Closed</button>
        </section>


        <section className="card">
          {loading && <p>Loading polls...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (
            <ul className="poll-list">
              {polls.length === 0 ? (
                <p>No polls yet.</p>
              ) : (
                handleFilter().map((poll) => (
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
