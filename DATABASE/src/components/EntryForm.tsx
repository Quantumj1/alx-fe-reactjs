import React, { useState, useEffect } from 'react';

interface Entry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  dateAdded: string;
}

interface EntryFormProps {
  onAddEntry: (entry: Entry) => void;
  editingEntry: Entry | null;
  onUpdateEntry: (entry: Entry) => void;
  onCancelEdit: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onAddEntry, editingEntry, onUpdateEntry, onCancelEdit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '' });

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (editingEntry) {
      setFormData({
        name: editingEntry.name,
        email: editingEntry.email,
        phone: editingEntry.phone,
        location: editingEntry.location,
      });
    } else {
      setFormData({ name: '', email: '', phone: '', location: '' });
    }
  }, [editingEntry]);

  const { name, email, phone, location } = formData;

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const entry: Entry = {
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      dateAdded: editingEntry ? editingEntry.dateAdded : new Date().toISOString(),
    };

    if (editingEntry) {
      onUpdateEntry(entry);
    } else {
      onAddEntry(entry);
    }

    setFormData({ name: '', email: '', phone: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <h2>{editingEntry ? 'Edit Entry' : 'Add New Entry'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange('name')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange('email')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handleChange('phone')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="notes">Location</label>
        <textarea
          id="notes"
          value={location}
          onChange={handleChange('location')}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingEntry ? 'Update Entry' : 'Add Entry'}
        </button>
        {editingEntry && (
          <button type="button" onClick={onCancelEdit} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EntryForm;
