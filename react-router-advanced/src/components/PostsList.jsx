import React from 'react';
import { Link } from 'react-router-dom';

const sample = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Sample Post ${i + 1}`,
}));

export default function PostsList() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Posts</h2>
      <ul>
        {sample.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
