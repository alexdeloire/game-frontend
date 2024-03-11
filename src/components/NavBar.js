import { useNavigate, Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const NabBar = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        //navigate('/');
    }

    return (
        <>
            <nav>
                <div className="nav-links">
                    {auth?.roles?.includes("Admin") && <Link to="/admin">Admin</Link>}
                    {auth?.accessToken &&
                        <>
                            <Link to="/user-content">Content</Link>
                            <Link to="/items">Items</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                        
                    }
                </div>
                {auth?.accessToken ?  <button onClick={signOut}>Se déconnecter</button>
                    : <Link to="/login">Connectez-vous</Link>}
            </nav>
            <Outlet />
        </>
    )
}

export default NabBar