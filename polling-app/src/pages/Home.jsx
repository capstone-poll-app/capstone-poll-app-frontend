import { useState, useEffect } from "react";
import { Link } from "react-router";
import PollCard from "../components/Card";
import Navbar from "../components/Navbar";


function Home() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPolls() {
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
        }

        fetchPolls();
    }, []);

    return (
        <>
            <Navbar />
<<<<<<< HEAD
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
                                    <PollCard key={poll.id} poll={poll} />
                                ))
                            )}
                        </ul>
                    )}
=======
            <div className="app" >
                <h1>Polling App</h1>

                <section className="card">
                    <ul className="poll-list" >
                        {polls.map((poll) => {
                            <li className="poll-item" key={poll.id}>
                                <p className="poll-title">{poll.title}</p>
                                <p className="poll-description">{poll.description}</p>
                                {/* <Link to {`/polls/${poll.id}`}>Link to Polls</Link> */}
                            </li>
                        })}
                    </ul>

>>>>>>> 75cf9be ("commit")
                </section>
            </div>
        </>
    );
}

export default Home