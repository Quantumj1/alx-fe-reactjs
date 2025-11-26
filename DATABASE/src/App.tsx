import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import SearchSort from './components/SearchSort';
import './App.css';

interface Entry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  dateAdded: string;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');

  // Load entries from localStorage on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const savedEntries = localStorage.getItem('database-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('database-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Entry) => {
    setEntries(prev => [...prev, entry]);
  };

  const updateEntry = (updatedEntry: Entry) => {
    setEntries(prev => prev.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
    setEditingEntry(null);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const editEntry = (entry: Entry) => {
    setEditingEntry(entry);
  };

  const cancelEdit = () => {
    setEditingEntry(null);
  };

  // Filter and sort entries
  const filteredAndSortedEntries = entries
    .filter(entry =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      } else {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  return (
    <div className="app">
      <header className="app-header">
        <img src="./ghafes.png" alt="GHAFES" width={60} />
        <h1>GHANA FELLOWSHIP OF EVANGELICAL STUDENTS</h1>
        <p>Know Christ and Make Him Known</p>
        <p>UMaT - CF DATABASE</p>
      </header>

      <main className="app-main">
        <EntryForm
          onAddEntry={addEntry}
          editingEntry={editingEntry}
          onUpdateEntry={updateEntry}
          onCancelEdit={cancelEdit}
        />

        <SearchSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <EntryList
          entries={filteredAndSortedEntries}
          onEditEntry={editEntry}
          onDeleteEntry={deleteEntry}
        />
      </main>
    </div>
  );
}

export default App;
