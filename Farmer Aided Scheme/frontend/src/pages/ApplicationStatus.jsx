import React, { useState, useEffect, useContext } from 'react';
import UserMenuBar from '../component/UserMenuBar';
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';

const ApplicationStatus = () => {
    const [posts, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {

    const fetchApplication = async () => {
        setLoader(true);
        setNoResults(false); // Reset noResults state before fetching
        try {
            const res = await axios.get(`${URL}/api/user/application/${user.userId}`, {
                withCredentials: true, // Include this if you need to send cookies
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPosts(res.data); // Use res instead of response
            if (res.data.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
        } catch (err) {
            console.error('Error fetching application data:', err);
            setNoResults(true); // Set noResults to true on error if needed
        } finally {
            setLoader(false); // Ensure loader is set to false after fetching
        }
    };

    
        if (user && user.userId) { // Ensure user and userId are defined
            fetchApplication();
        }
    }, [user]); // Add user as a dependency

    return (
        <>
            <UserMenuBar />
            <div className='card'>
                <div className='card-body'>
                    <h5 className="card-title text-primary">Crops Details</h5>
                    {loader ? (
                        <div>Loading application status...</div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">User  ID</th>
                                    <th scope="col">Scheme ID</th>
                                    <th scope="col">Scheme Name</th>
                                    <th scope="col">Application Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.length > 0 ? (
                                    posts.map((application) => (
                                        <tr key={application._id}> {/* Assuming _id is the unique identifier */}
                                            <td>{application.username}</td>
                                            <td>{application.userId}</td>
                                            <td>{application.schemeId}</td>
                                            <td>{application.name}</td>
                                            <td style={{ 
                                                color: application.status === 'Pending' ? 'orange' : 
                                                       application.status === 'Success' ? 'green' : 
                                                       application.status === 'Reject' ? 'red' : 'orange' // Default color if none of the statuses match
                                            }}>
                                                {application.status.toUpperCase()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">{noResults}No applications found.</td> {/* Adjusted colSpan to match the number of columns */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicationStatus;