import React, { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" style={{ flex: 1, padding: 8 }} />
      <button type="submit">Add</button>
    </form>
  );
}
