import React, { useEffect, useState, useContext } from 'react';
import UserMenuBar from '../component/UserMenuBar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';

const GetScheme = () => {
    const { user } = useContext(UserContext);
    const [scheme, setScheme] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheme = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${URL}/api/user/scheme`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data) {
                    setScheme(response.data);
                }
            } catch (err) {
                console.error('Error fetching scheme data:', err);
                if (err.response) {
                    if (err.response.status === 401) {
                        setError('Please log in again to view scheme details');
                    } else if (err.response.status === 403) {
                        setError('You do not have permission to view scheme details');
                    } else {
                        setError('Error loading scheme details. Please try again later.');
                    }
                } else {
                    setError('Network error. Please check your connection.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchScheme();
    }, [user]);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }



    const handleApply = async (scheme) => {
        try {
            const applicationData = {
                name: scheme.name,
                schemeId: scheme.schemeId,
                description: scheme.description,
                userId: user.userId,
                username: user.username,
            };
            const response = await axios.post(`${URL}/api/user/createApplication`, applicationData, { withCredentials: true });
            console.log(response);
            alert(`Successfully applied for scheme id ${scheme.schemeId}`);
        } catch (err) {
            console.error('Error applying for scheme:', err);
            alert(`Error: ${err.message || 'An error occurred'}`);
        }
    };

    return (
        <>
            <UserMenuBar />
            <div className='card'>
                <div className='card-body'>
                    <h5 className="card-title text-primary">Scheme Details</h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Scheme</th>
                                <th scope="col">Scheme ID</th>
                                <th scope="col">Description</th>
                                <th scope="col">Eligibility</th>
                                <th>Apply Scheme</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheme.map((scheme) => (
                                <tr key={scheme._id}>
                                    <td>{scheme.name}</td>
                                    <td>{scheme.schemeId}</td>
                                    <td>{scheme.description}</td>
                                    <td>{scheme.eligibility}</td>
                                    <td>
                                        <Button onClick={() => handleApply(scheme)}>Apply</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default GetScheme;