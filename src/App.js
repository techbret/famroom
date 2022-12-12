import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import ProfileCreation from "./components/ProfileCreation/ProfileCreation";
import Profile from "./pages/Profile/Profile";
import UploadPhoto from "./components/Upload/UploadPhoto";
import NewProfile from "./components/ProfileCreation/NewProfile";
import { AuthContextProvider } from "./context/UseContext/AuthContext";
import ProtectedRoute from './config/ProtectedRoute';
import CreateGroup from "./components/CreateGroup/CreateGroup";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/upload" element={<UploadPhoto />} />
          <Route path="/user/:userId" element={<NewProfile />} />
          <Route path="/create-group" element={<CreateGroup />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
