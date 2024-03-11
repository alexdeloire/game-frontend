import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const ItemList = () => {

    const [items, setItems] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getItems = async () => {
            try {
                const response = await axiosPrivate.get('/items', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setItems(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getItems();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Item List</h2>
            {items?.length
                ? (
                    <ul>
                        {items.map((item, i) => <li key={i}>{item?.name}</li>)}
                    </ul>
                ) : <p>No items to display</p>
            }
        </article>
    );
};

export default ItemList;
