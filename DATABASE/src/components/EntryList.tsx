import React from 'react';

interface Entry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  dateAdded: string;
}

interface EntryListProps {
  entries: Entry[];
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (id: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEditEntry, onDeleteEntry }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="entry-list">
      <h2>Entries ({entries.length})</h2>
      {entries.length === 0 ? (
        <p className="no-entries">No entries yet. Add your first entry above!</p>
      ) : (
        <div className="entries-grid">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <h3>{entry.name}</h3>
                <div className="entry-actions">
                  <button
                    onClick={() => onEditEntry(entry)}
                    className="btn-edit"
                    title="Edit entry"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="btn-delete"
                    title="Delete entry"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="entry-details">
                {entry.email && (
                  <p><strong>Email:</strong> {entry.email}</p>
                )}
                {entry.phone && (
                  <p><strong>Phone:</strong> {entry.phone}</p>
                )}
                {entry.location && (
                  <p><strong>Location:</strong> {entry.location}</p>
                )}
                <p className="date-added">
                  <strong>Added:</strong> {formatDate(entry.dateAdded)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntryList;
