import React,{useState} from 'react'
import MenuBar from '../component/MenuBar';
import axios from 'axios';
import { URL } from '../url';

const PostCrops = () => {
  const [cropName, setCropName] = useState("");
  const [cropType, setCropType] = useState("");
  const [season, setSeason] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const post ={cropName,cropType,season,notes}

    try{
      const res = await axios.post(`${URL}/api/admin/createCrops`,post,{withCredentials:true});
      console.log(res.data);
      setSuccess("Crop Added Successfully");
      setError(null);
      setCropName("");
      setCropType("");
      setSeason("");
      setNotes("");

    }
    catch(err){
      setError("An error occurred while posting the Crop data");
      setSuccess(null);
    }
  };



  return (
    <>
    <MenuBar/>
    <div className='container mt-5'>
      <h2>Post Crops Data</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
                    <label htmlFor="cropsname">Crops Name:</label>
                    <input
                        id="cropsname"
                        type="text"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        className="form-control"
                        placeholder="Enter your crops name"
                        required
                    />
                </div>

                <div className="form-group">
                  <label htmlFor="cropsType">Crops Type:</label>
                  <input
                  id="cropsType"
                  type="text"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="form-control"
                  placeholder="Enter your crops Type"
                  required
                  />
                  </div>

                  <div className="form-group">
                  <label htmlFor="season">Season:</label>
                  <input
                  id="season"
                  type="text"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="form-control"
                  placeholder="Enter the Season"
                  required
                  />
                  </div>

                  <div className="form-group">
                  <label htmlFor="notes">Notes:</label>
                  <input
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                  placeholder="Enter the Notes"
                  required
                  />
                  </div>
                  

                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
      </form>

      
      {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
    </div>
    </>
    
  )
}

export default PostCrops