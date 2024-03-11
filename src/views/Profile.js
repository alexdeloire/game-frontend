import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Profile = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [modifiedData, setModifiedData] = useState({});
    const [message, setMessage] = useState(''); // message to display after updating the user info

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditClick = () => {
        setMessage('');
        setIsEditMode(true);
    };

    const getUserData = async () => {
        try {
            const response = await axiosPrivate.get('/users/my-info');
            setModifiedData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserData();
    }
        , [])

    const handleConfirmClick = async () => {
        // send modifiedData to the server
        try {
            const response = await axiosPrivate.put('/users/update-info', modifiedData);
            if (response.status === 200) {
                setMessage('Votre profil a été mis à jour avec succès');
            }
            console.log(response);
        }
        catch (err) {
            console.error(err);
        }
        setIsEditMode(false);
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>
                User Profile
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div className='form-group'>
                    <label>
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={modifiedData.username}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                    />
                </div>
                <div className='form-group'>
                    <label>
                        Email:
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={modifiedData.email}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                    />
                </div>
            </div>

            <div style={{ color: 'green', marginBottom: '20px', width: '400px' }}>
                {message}
            </div>

            <button className="send-button-mu" style={{ marginRight: '10px' }} onClick={() => navigate('/change-password')}>
                Changer Mot de Passe
            </button>

            {!isEditMode && <button className="send-button-mu" onClick={handleEditClick}>Edit</button>}
            {isEditMode && <button className="send-button-mu" onClick={handleConfirmClick}>Confirm</button>}
        </div>
    );
};

export default Profile;
