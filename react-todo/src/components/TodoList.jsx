import React from 'react';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>No todos yet.</p>;
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((t) => (
        <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid #eee', marginBottom: 8 }}>
          <div
            onClick={() => onToggle(t.id)}
            style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: 'pointer', flex: 1 }}
          >
            {t.text}
          </div>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
