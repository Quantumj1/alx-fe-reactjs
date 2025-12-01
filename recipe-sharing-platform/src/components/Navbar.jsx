import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ background: '#0f172a', padding: '12px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <Link to="/add-recipe" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Add Recipe</Link>
        <Link to="/" style={{ color: '#fff', marginLeft: 'auto', textDecoration: 'none', opacity: 0.85 }}>Recipe App</Link>
      </div>
    </nav>
  );
}
