import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import ProfileCreation from './components/ProfileCreation/ProfileCreation';
import Profile from './pages/Profile/Profile';
import UploadPhoto from './components/Upload/UploadPhoto';
import NewProfile from './components/ProfileCreation/NewProfile';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/upload/:userId" element={<UploadPhoto />} />
        <Route path="/user/:userId" element={<NewProfile />} />
      </Routes>
    </div>
  );
}

export default App;
