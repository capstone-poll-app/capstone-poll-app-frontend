import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";

import Navbar from "../components/Navbar";

function Results() {
  const { id } = useParams();
  const [poll, setPoll] = useState({});
//   const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`http://localhost:3000/polls/${id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setPoll(data);
    } catch (err) {
      console.error("Failed to fetch polls:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPoll();
  }, [id]);


  function createContent(options){
    return(
        <>
            <ol className="bar-chart">
              {options.map((option)=>(
                <li className="bar">{option.text}
                  <p>{option.Votes.length}</p>
                </li>
              ))}
                
            </ol>
        </>
    )
  }

  
  let content;

  if (loading) {
    return <p>Loading results...</p>;
  } else if (error) {
    return <p className="error">Error: {error}</p>;
  }else if(poll){
    content = createContent(poll.Options)
  }



  return (
    <div className="app">
      <Navbar />
      <section className="card">{content}</section>
    </div>
  );
}

export default Results;
