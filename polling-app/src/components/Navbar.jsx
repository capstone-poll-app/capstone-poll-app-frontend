import { NavLink } from "react-router";
import askImage from "../assets/ask.png"

function Navbar() {
    return (
        <nav className="nav">
            <NavLink className="nav-item" to="/" end><img className="logo" src={askImage} alt="Home" /></NavLink>
            <NavLink className="nav-item link-button" to="/polls/new" end>Create Poll</NavLink>
            <NavLink className="nav-item link-button">Login</NavLink>
        </nav>
    )
}

export default Navbar