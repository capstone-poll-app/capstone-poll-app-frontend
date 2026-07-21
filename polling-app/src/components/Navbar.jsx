import { NavLink } from "react-router";

function Navbar() {
    return (
        <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/CreatePoll" end>Create Poll</NavLink>
            <NavLink>Login</NavLink>
        </nav>
    )
}

export default Navbar