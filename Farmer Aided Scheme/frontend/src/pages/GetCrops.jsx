import React,{useEffect, useState, useContext} from 'react'
import UserMenuBar from '../component/UserMenuBar'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'


const GetCrops = () => {
  const {user} = useContext(UserContext)
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fetchCrops = async () => {
      try{
        setLoading(true);
        const response = await axios.get(`${URL}/api/user/crops`, {
          withCredentials: true, // Important for sending cookies
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if(response.data){
          setCrops(response.data)
        }
      }
      catch (err) {
        console.error('Error fetching crops data:', err);
        if (err.response?.status === 401) {
          setError('Please log in again to view crops details');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to view crops details');
        } else {
          setError('Error loading crops details. Please try again later.');
        }
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };
    fetchCrops();
  }, [user]); // Add user as a dependency

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

  return (
    <>
    <UserMenuBar/>
    <div className='card'>
      <div className='card-body'>
        <h5 className="card-title text-primary">Crops Details</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Crop Name</th>
              <th scope="col">Crop Type</th>
              <th scope="col">Season</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop._id}>
                <td>{crop.cropName}</td>
                <td>{crop.cropType}</td>
                <td>{crop.season}</td>
                <td>{crop.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </>
    
  )
}

export default GetCrops