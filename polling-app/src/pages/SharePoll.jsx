import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Poll from "./Poll";
import { Link } from "react-router";

function SharePoll() {
  const { id } = useParams();
  const shareLink = `${window.location.origin}/polls/${id}`;

  return (
    <>
        <Navbar />
      <div className="app">
        <h1>Poll Created</h1>
        <section className="link-container">
            {/* <h3>View Your Poll</h3> */}

          <input type="text" value={shareLink} readOnly />

          {/* <br></br> */}
          <button
            // className="btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              alert("Link Copied.");
            }}
          >
            Copy Link
          </button>
          <Link className="link-button" to={`/polls/${id}`}>
            View
          </Link>
        </section>
      </div>
    </>
  );
}

export default SharePoll;
