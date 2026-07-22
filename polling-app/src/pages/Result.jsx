import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"

import Navbar from "../components/Navbar"

function Results() {
    const { id } = useParams();
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchResults() {
            try {
                const response = await fetch(`/polls/${id}`)

                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`)
                }

                const data = await response.json()

                setPoll(data)
            }
            catch (err) {
                console.error("Failed to fetch results:", err)

                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchResults()

    }, [id])

    let content

    if (loading) {
        content = <p>Loading results...</p>;
    }
    else if (error) {
        content = <p className="error">Error: {error}</p>;
    }
    else if (poll) {
        const totalVotes = poll.options.reduce((sum, o) => sum + o.voteCount, 0);

        let descriptionText = null
        if (poll.description) {
            descriptionText = <p>{poll.description}</p>
        }

        // winner = option with the most votes
        const winner = poll.options.reduce((best, o) =>
            o.voteCount > best.voteCount ? o : best
            , poll.options[0]);

        content = (
            <>
                <h1>{poll.title}</h1>
                {descriptionText}

                <ul className="results-list">
                    {poll.options.map((option) => {
                        let percent
                        if (totalVotes === 0) {
                            percent = 0
                        }
                        else {
                            percent = (option.voteCount / totalVotes) * 100
                        }

                        const isWinner = (winner && option.id === winner.id && totalVotes > 0)

                        let itemClass = "result-item"
                        if (isWinner) {
                            itemClass = "result-item winner"
                        }

                        let winnerText = ""
                        if (isWinner) {
                            winnerText = " (Winner)"
                        }

                        return (
                            <li className={itemClass} key={option.id}>
                                <div className="result-label">
                                    <span>{option.text}{winnerText}</span>
                                    <span>{percent.toFixed(1)}% ({option.voteCount})</span>
                                </div>
                                <div className="result-bar-bg">
                                    <div
                                        className="result-bar-fill"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </ul>

                <p className="total-votes">{totalVotes} total votes</p>

                <Link to="/">Back to polls</Link>
            </>
        )
    }

    return (
        <div className="app">
            <Navbar />
            <section className="card">{content}</section>
        </div>
    )
}

export default Results