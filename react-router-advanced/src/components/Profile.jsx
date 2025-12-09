import React from 'react';
import { Link, Outlet, Routes, Route } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

export default function Profile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Profile Page</h2>
      <nav style={{ margin: '12px 0', display: 'flex', gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <div style={{ borderTop: '1px solid #ddd', marginTop: 12 }}>
        <Outlet />
        {/* Inline fallback routes so Profile can work standalone */}
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}
// file ends here

