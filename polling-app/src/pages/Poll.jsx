import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

//react function to display poll

function Poll() {
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                //fectching the poll by it's id
                const response = await fetch(`http://localhost:3000/api/polls/${id}`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch poll");
                }
               const data = await response.json() 
               setPoll(data);
            } catch (error) {
                console.error('Error fetching object:', error)
                setError("Failed to load poll.")
            } finally {
                setLoading(false)
            }
        };
        if (id) {
            fetchPoll();
        }
    }, [id]); // Re-runs if the  id changes
    
    if (loading) {
         return <div>Loading...</div>
    };
    
    if (!poll) {
         return <div>Poll not found.</div>
    };
    
    return (
        <>
        <div className="app">
        <Navbar />
         <h1>Poll</h1>

            <section className="card">
                <ul>
            <li key={poll.id}>{poll.title}</li>
            <p>{poll.description}</p>
                {poll.options.map((option, i) => (
                    <li className="option-item" key={i}>
                        <button onClick={() => setSelectedOption(option)}>{option}</button></li>
                ))}
                <p></p>
                </ul>
            </section>

        </div>
        </>
    )
}