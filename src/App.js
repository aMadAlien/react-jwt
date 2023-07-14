import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

import AuthService from './services/AuthService';
import ProtectedRoute from './services/ProtectedRoute';


function App() {
  return (
    <>
      <Header />

      <AuthService>
        <Routes>
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthService>
    </>
  );
}

export default App;
