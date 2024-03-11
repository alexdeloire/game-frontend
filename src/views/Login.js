import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const LOGIN_URL = '/auth/token';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', user);
        formData.append('password', pwd);

        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        };

        try {
            const response = await axios.post(LOGIN_URL,
                formData,
                config
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.access_token;
            const user_id = response?.data?.user_id;
            const roles = response?.data?.roles;
            setAuth({ user_id, user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No response from server');
            } else if (err.response?.status === 400) {
                setErrMsg("Username or password incorrect");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorised");
            } else {
                setErrMsg('Connection Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <div className="content login-form">
            <h1>Connectez-vous</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username2"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        />
                </div>

                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <button>Sign In</button>
                <div className="persistCheck form-group-checkbox ">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust this device</label>
                </div>
            </form>
            <p>
                Don't have an account ?
                <br />
                <span className="line">
                    <Link to="/register">Sign up</Link>
                </span>
            </p>
        </div>

    )
}

export default Login
