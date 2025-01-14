import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Use useNavigate for navigation

    const generateUserId = () => {
        // Generate a random 3-digit number
        return Math.floor(100 + Math.random() * 900).toString();
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(""); // Reset error state before making the request

        // Generate a unique user ID
        const generatedUserId = generateUserId();
        setUserId(generatedUserId); // Set the generated user ID in state

        try {
            await axios.post(`${URL}/api/auth/register`, { username, email, password, role, userId: generatedUserId });
            // Reset the input fields after successful registration
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('');
            setUserId('');
            navigate("/"); // Navigate to the login page
        } catch (err) {
            // Check if the error response indicates that the email already exists
            if (err.response) { // Assuming 409 Conflict for existing email
                setError("Email already exists. Please use a different email.");
            } else {
                setError("An error occurred. Please try again."); // Generic error message
            }
            console.log(err); // Log the error for debugging
        }
    };

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        value={username} // Set the value to the state variable
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder='Enter your Username'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        value={email} // Set the value to the state variable
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" // Use type="email" for email validation
                        className="form-control"
                        placeholder='Enter Your Email id'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="userid">User ID:</label>
                    <input
                        id="userId"
                        value={userId} // Set the value to the state variable
                        onChange={(e) => setUserId(e.target.value)} // This can be left out since it's disabled
                        type="text"
                        className="form-control"
                        disabled // Keep it disabled to prevent user input
                        placeholder="Auto-generated User ID"
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        value={password} // Set the value to the state variable
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder='Enter your Password'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="user">User </option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>} {/* Display error message */}
            <h3 className="mt-3">
                <Link to="/">Already have an account? Login</Link>
            </h3>
        </div>
    );
};

export default Register;