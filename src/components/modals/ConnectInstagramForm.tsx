'use client';

import React from 'react';

interface ConnectInstagramFormProps {
  onSubmit: (username: string, password: string) => void;
  onCancel: () => void;
}

export default function ConnectInstagramForm({ onSubmit, onCancel }: ConnectInstagramFormProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onSubmit(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label 
          htmlFor="username"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Instagram Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Instagram username"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <label 
          htmlFor="password"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Instagram Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Instagram password"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Note: Your credentials are used only to connect to Instagram's API. We do not store your password.
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Connect Account
        </button>
      </div>
    </form>
  );
}
