// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/home';
import PreHome from './Components/preHome';
import GetPropertyDetails from './Components/getPropertyDetails';
import GetTransactionDetails from './Components/getTransactionDetails';
import PutPropertyDetails from './Components/putPropertyDetails';
import UpdateUser from './Components/updateUser';
import Properties from './Components/properties';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreHome />} />
        <Route path="/home/:username" element={<Home />} />
        <Route path="/getPropertyDetails/:username" element={<GetPropertyDetails />} />
        <Route path="/getTransactionDetails/:username" element={<GetTransactionDetails />} />
        <Route path="/putPropertyDetails/:username" element={<PutPropertyDetails />} />
        <Route path="/updateUser/:username" element={<UpdateUser />} />
        <Route path="/properties/:username" element={<Properties />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
