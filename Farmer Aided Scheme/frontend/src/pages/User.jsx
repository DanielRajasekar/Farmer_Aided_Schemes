

// export default User
import React,{useEffect,useState,useContext} from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import { UserContext } from '../context/UserContext';
import UserMenuBar from '../component/UserMenuBar';


const User = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState(null);

    useEffect(() => {

                 const checkUserRole = () => {
                   if (user) {
                     setLoading(false);
                     setError(null) // User data is available
                   } else {
                     setLoading(false);
                     setError("Please login to view admin page"); // No user data, still set loading to false
                   }
                 };
             
                 checkUserRole();
               }, [user]);
        
               // If loading, show a loading message
                 if (loading) {
                   return <div>Loading...</div>;
                 }
               
                 // If user is not an admin, redirect to home
                 if (user && user.role !== 'user') {
                   return <Navigate to="/" />; // Use Navigate instead of Redirect
                 }
               
                 // Error state
                 if (error) {
                   return (
                     <div className="container mt-4">
                       <div className="alert alert-danger" role="alert">
                         {error}
                       </div>
                       {/* <Navigate to="/login" />; */}
                     </div>
                   );
                 }
               
                 // Not authenticated state
                 if (!user) {
                   return (
                     <div className="container mt-4">
                       <div className="alert alert-warning" role="alert">
                         Please login to view admin page
                       </div>
                     </div>
                   );
                 }
               
  return (
    <div>
       <UserMenuBar/>
       <h1 style={{textAlign:"center",margin:"15%"}}>User Dashboard</h1>
    </div>
  )
}

export default User;