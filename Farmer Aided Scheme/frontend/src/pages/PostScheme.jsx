import React,{useState} from 'react';
import MenuBar from '../component/MenuBar';
import axios from 'axios';
import { URL } from '../url';

const PostScheme = () => {
  const [name, setName] = useState("");
  const [schemeId, setSchemeId] = useState();
  const [description, setDescription] = useState("");
  const [eligibility, seteligibility] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async(e)  =>{
    e.preventDefault();
    const post = {
      name,schemeId,description,eligibility
    }
    try {
      const response = await axios.post(`${URL}/api/admin/createScheme`, post, { withCredentials: true });
      console.log(response.data);
      setSuccess("Scheme created successfully");
      setError(null);
      setName("");
      setSchemeId("");
      setDescription("");
      seteligibility("");
      } catch (error) {
        setError("Error creating scheme");
        setSuccess(null);
        }
  }


  return (
    <>
    <MenuBar/>
    <div className='container mt-5'>
      <h2>Post Scheme Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Scheme Name:</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="schemeid">Scheme ID:</label>
    <input 
        type="number" 
        className="form-control" 
        id="schemeid" 
        min="0" // Set minimum value to 0
        max="10" // Set maximum value to 10
        value={schemeId}
        onChange={(e) => setSchemeId(e.target.value)}
    />
    </div>
        <div className="form-group">
          <label htmlFor="description">Scheme Description:</label>  
          <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="eligibility">Eligibility:</label>
          <input
          type="text"
          className="form-control"
          id="eligibility"
          value={eligibility}
          onChange={(e) => seteligibility(e.target.value)}
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

export default PostScheme