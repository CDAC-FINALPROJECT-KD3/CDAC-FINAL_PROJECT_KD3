import logo from './logo.svg';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import HotalDetails from './screens/HotalDetails';
import Contactus from './screens/Contactus';
import AdminHome from './screens/AdminHome'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './screens/User_List';
import AddHotel from './screens/AddHotel';
import AddRoomCategory from './screens/AddRoomCategory';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/AdminHome' element={<AdminHome />} />
        <Route path='/UserList' element={<UserList />} />
        <Route path='/addHotel' element={<AddHotel />} />
        <Route path='/addRoomCategory' element={<AddRoomCategory/>}/>

        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        
        <Route path='/Login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/hotalDetails' element={<HotalDetails/>} />
        <Route path='/contactus' element={<Contactus />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
