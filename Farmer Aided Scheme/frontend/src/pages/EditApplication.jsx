import React, { useEffect, useState, useContext } from 'react';
import MenuBar from '../component/MenuBar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';
import Button from 'react-bootstrap/Button';

const EditApplication = () => {
  const { user } = useContext(UserContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${URL}/api/admin/getApplication`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        setApplications(response.data);
      } catch (err) {
        setError('Error loading application details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user]);

  const updateApplicationStatus = async (appId, status) => {
    try {
      // Send the updated status to the server
      await axios.put(`${URL}/api/admin/application/${appId}`, { status }, { withCredentials: true });
      
      // Update the local state to reflect the change
      setApplications(prevApps => 
        prevApps.map(app => 
          app._id === appId ? { ...app, status } : app // Only update the status of the clicked application
        )
      );
    } catch (err) {
      setError('Error updating application status. Please try again later.');
    }
  };

  const handleSuccess = (appId) => {
    updateApplicationStatus(appId, 'Success'); // Update status to 'Success'
  };

  const handleReject = (appId) => {
    updateApplicationStatus(appId, 'Reject'); // Update status to 'Reject'
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <MenuBar />
      <div className='card'>
        <div className='card-body'>
          <h5 className="card-title text-primary">Application Lists</h5>
          {applications.length === 0 ? (
            <div>No applications found.</div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>User ID</th>
                  <th>Scheme ID</th>
                  <th>Scheme Name</th>
                  <th>Application Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.username}</td>
                    <td>{app.userId}</td>
                    <td>{app.schemeId}</td>
                    <td>{app.name}</td>
                    <td style={{
                        color: app.status === 'Pending' ? 'orange' :
                          app.status === 'Success' ? 'green' :
                          app.status === 'Reject' ? 'red' : 'orange' // Default color if none of the statuses match
                      }}>
                        {app.status.toUpperCase()} {/* Display the current status */}
                      </td>
                    <td>
                      <Button variant="success" onClick={() => handleSuccess(app._id)}>Success</Button>
                      <Button variant="danger" onClick={() => handleReject(app._id)}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EditApplication;