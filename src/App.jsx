import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import CalendarView from './pages/dashboard/CalendarView';
import BrandDna from './pages/dashboard/BrandDna';
import SettingsView from './pages/dashboard/SettingsView';
import PostEditor from './pages/dashboard/PostEditor';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Area (Mock protection for now via route structure) */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="editor" element={<PostEditor />} />
          <Route path="brand" element={<BrandDna />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
