import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Navbar from "../components/Navbar";

//react function to display poll

function poll({id}) {
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                //fectching the poll by it's id
                const response = await fetch(`/http://localhost:3000/api/polls/${id}`); 
               const data = await response.json() 
               setPoll(data);
            } catch (error) {
                console.error('Error fetching object:', error)
            } finally {
                setLoading(false)
            }
        };
        if (id) {
            fetchPoll();
        }
    }, [objectId]); // Re-runs if the object id changes
    
    
    return (
        <>
        <div className="app">
        <Navbar />
         <h1>Poll</h1>
        if (loading) {
             <div>Loading...</div>
        };
        
        if (!Poll) {
             <div>Poll not found.</div>
        };

            <section className="card">
                <ul>
            <li key={poll.id}>{poll.title}</li>
            <p>{poll.description}</p>
                {poll.options.map((option, i) => {
                    <li className="option-item" key={i}>
                        <button onClick={}>{option}</button></li>
                })}
                <p></p>
                </ul>
            </section>

        </div>
        </>
    )
}