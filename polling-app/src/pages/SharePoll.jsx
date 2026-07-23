import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Poll from "./Poll";
import { Link } from "react-router";

function SharePoll () {
    const { id } = useParams();
    const shareLink = `${window.location.origin}/polls/${id}`;

    return (
        <>
        <Navbar />
        <h1>Poll Created</h1>

        <div>
       <input 
            type="text"
            value= {shareLink}
            readOnly
       />
        </div>

       <button onClick={() => navigator.clipboard.writeText(shareLink)}>
        Copy Link
       </button>

<br></br>
       <Link className="link-button" to={`/polls/${id}`}>Take Poll</Link>
        
        </>
    )
}

export default SharePoll