import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Componets :
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';

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

  let token = localStorage.getItem("madrasaToken")
  let AuthToken = token ?? null

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