import './App.css';
import {Route,Routes} from 'react-router-dom';
import  {UserContextProvider} from './context/UserContext';
import Register from './pages/Register';
import Login from './pages/Login'
import Admin from './pages/Admin';
import PostCrops from './pages/PostCrops';
import PostScheme from './pages/PostScheme';
import EditApplications from './pages/EditApplication';
import GetCrops from './pages/GetCrops';
import GetScheme from './pages/GetScheme';
import ApplicationStatus from './pages/ApplicationStatus';
import User from './pages/User';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path='/admin' element={<Admin/>} />
      <Route exact path='/admin/postcrops' element={<PostCrops/>} />
      <Route exact path='/admin/postscheme' element={<PostScheme/>} />
      <Route exact path='/admin/applications' element={<EditApplications/>} />
      <Route exact path='/user' element={<User/>} />
      <Route exact path='/user/getcrops' element={<GetCrops/>} />
      <Route exact path='/user/getscheme' element={<GetScheme/>} />
      <Route exact path='/user/applicationstatus' element={<ApplicationStatus/>} />



      


      </Routes>
    </UserContextProvider>
  );
}

export default App;
