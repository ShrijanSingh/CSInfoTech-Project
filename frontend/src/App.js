import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddAgent from './pages/AddAgent';
import UploadList from './pages/UploadList';
import AgentLists from './pages/AgentLists';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/add-agent" element={<ProtectedRoute><AddAgent /></ProtectedRoute>} />
      <Route path="/upload-list" element={<ProtectedRoute><UploadList /></ProtectedRoute>} />
      <Route path="/agent-lists" element={<ProtectedRoute><AgentLists /></ProtectedRoute>} />
    </Routes>
  );
}
export default App;
