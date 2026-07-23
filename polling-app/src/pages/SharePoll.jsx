import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Poll from "./Poll";

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
       <button onClick={() => {Poll}} >Go to Poll</button>
        
        </>
    )
}

export default SharePoll