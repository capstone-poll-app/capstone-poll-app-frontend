import { Link } from "react-router";
import { useNavigate } from "react-router";

function PollCard({ poll }) {
    const Navigate = useNavigate();
    return (
        <li className="poll-item">
            <p className="poll-title">{poll.title}</p>
            <p className="poll-description">{poll.description}</p>
            <button
                type="button"
                onClick={() => Navigate(`/polls/${poll.id}`)}
                className="btn-style"
            >View Poll
            </button>

            <button 
            type="button"
            onClick={() => Navigate(`/polls/${poll.id}`)}
            className="delete-btn">Delete Poll</button>
            {/* <Link to={`/polls/${poll.id}`}>View Poll</Link>  */}
        </li>
    );
}

export default PollCard;



