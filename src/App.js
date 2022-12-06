import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import NavBar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import ProfileCreation from './components/ProfileCreation/ProfileCreation';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="user/:userId" element={<ProfileCreation />}  />
      </Routes>
    </div>
  );
}

export default App;
