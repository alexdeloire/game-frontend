import { Outlet, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Layout = () => {
    const { auth } = useAuth();
    return (
        <main className="App">
            <Outlet />
            <footer>
                <p>© 2023 - 2024 | Template</p>
                <Link to="/">Home</Link>
                {auth?.accessToken ? 
                <Link to="/rgpd">RGPD</Link>
                : null}
            </footer>
        </main>
    )
}

export default Layout
