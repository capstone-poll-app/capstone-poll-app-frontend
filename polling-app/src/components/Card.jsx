import { Link } from "react-router";
import { useNavigate } from "react-router";

function PollCard({ poll, deletePoll }) {
    const Navigate = useNavigate();
    return (
        <li className="poll-item">
            <p className="poll-title">{poll.title}</p>
            <p className="poll-description">{poll.description}</p>
            <section className="container">
                <Link className="link-button" to={`/polls/${poll.id}`}>View Poll</Link>
                <button
                    type="button"
                    className="dlt-button"
                    onClick={() => deletePoll(poll.id)}
                    >Delete Poll
                 </button>
                <Link className="link-button" to={`/polls/${poll.id}`}>View Poll</Link>
            </section>

        </li>
    );
}

export default PollCard;



