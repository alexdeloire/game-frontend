import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from '../hooks/useLogout';

const DeleteAccount = () => {

    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();
    const [confirmationCount, setConfirmationCount] = useState(0);


    const handleDeleteClick = async (confirmationCount) => {
        // Increase the confirmation count on each click
        setConfirmationCount(confirmationCount + 1);
        if (confirmationCount + 1 === 2) {
            try {
                // Send delete request
                console.log('Sending delete request');
                await axiosPrivate.delete('/users/delete-data');
            }
            catch (err) {
                console.error(err);
            }
            setConfirmationCount(0);
            await logout();
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', maxWidth: '500px', marginTop: '80px' }}>
                We take the protection of your data very seriously.
                If you wish to delete your account, please note that all your data will be permanently removed.
                This complies with GDPR regulations.
            </div>
            <button className='rgpd-button' onClick={() => handleDeleteClick(confirmationCount)}>
                {confirmationCount === 1 ? 'Confirm Deletion' : 'Delete my account and all my data'}
            </button>
            {confirmationCount === 1 &&
                <div style={{ marginTop: '20px', maxWidth: '500px' }}>
                    You are about to delete your account.
                    Please click a second time to confirm.
                </div>
            }
        </div>
    );
};

export default DeleteAccount;
