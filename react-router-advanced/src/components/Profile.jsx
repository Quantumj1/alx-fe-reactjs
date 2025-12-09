import React from 'react';
import { Link, Outlet } from 'react-router-dom';

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
      </div>
    </div>
  );
}
// file ends here

