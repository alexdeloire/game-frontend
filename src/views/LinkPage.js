import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <div className="content">
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/">Home</Link>
            <br />
            <h2>Private</h2>
            <Link to="/user-content">User Content</Link>
            <Link to="/items">Items</Link>
            <Link to="/admin">Admin</Link>
        </div>
    )
}

export default LinkPage
