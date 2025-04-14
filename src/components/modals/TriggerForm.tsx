'use client';

import React from 'react';

interface TriggerFormProps {
  onSubmit: (triggerWord: string, responseTemplate: string) => void;
  onCancel: () => void;
}

export default function TriggerForm({ onSubmit, onCancel }: TriggerFormProps) {
  const [triggerWord, setTriggerWord] = React.useState('');
  const [responseTemplate, setResponseTemplate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (triggerWord.trim() && responseTemplate.trim()) {
      onSubmit(triggerWord, responseTemplate);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label 
          htmlFor="triggerWord"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Trigger Word
        </label>
        <input
          id="triggerWord"
          type="text"
          value={triggerWord}
          onChange={(e) => setTriggerWord(e.target.value)}
          placeholder="Enter word that will trigger a response"
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
          htmlFor="responseTemplate"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Response Message
        </label>
        <textarea
          id="responseTemplate"
          value={responseTemplate}
          onChange={(e) => setResponseTemplate(e.target.value)}
          placeholder="Enter message to send when trigger word is detected"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '14px',
            minHeight: '100px',
            resize: 'vertical'
          }}
          required
        />
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
          Save Trigger
        </button>
      </div>
    </form>
  );
}
