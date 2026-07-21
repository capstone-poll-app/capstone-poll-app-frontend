import { Link } from "react-router";
import polls from "./Poll";
import Navbar from "../components/Navbar";


function Home() {
    return (
        <>
        <Navbar />
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

            </section>
        </div>
        </>
    )
}

export default Home