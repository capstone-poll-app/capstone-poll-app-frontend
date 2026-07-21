import { Link } from "react-router";

function PollCard({ poll }) {
    return (
        <li className="poll-item">
            <p className="poll-title">{poll.title}</p>
            <p className="poll-description">{poll.description}</p>
            <Link to={`/polls/${poll.id}`}>View Poll</Link>
        </li>
    );
}

export default PollCard;
