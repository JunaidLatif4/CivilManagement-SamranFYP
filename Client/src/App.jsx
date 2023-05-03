import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Componets :
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';

// API :
import { GetProfileAPI } from "API/user"
// Redux :
import { useDispatch } from "react-redux";
import { userDataActions } from "Redux/Slice/userData"
// Helpers :
import { ToastContainer } from "react-toastify";

// CSS :
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';





const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const App = () => {
  const Dispatch = useDispatch()
  let token = localStorage.getItem("civilToken")
  let AuthToken = token ?? null

  const gettingProfileData = async () => {
    let res = await GetProfileAPI()
    if (res.error != null) {

    } else {
      console.log("------------- PROFILE -------------", res);
      let userData = res.data.result
      userData.token = AuthToken
      Dispatch(userDataActions.setUserData(userData))
      localStorage.setItem("civilUserData", JSON.stringify(userData))

    }
  }
  if (AuthToken) {
    gettingProfileData()
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dashboard/*' element={<ProtectedRoute user={AuthToken}> <Dashboard /> </ProtectedRoute>} />
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;