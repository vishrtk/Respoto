'use client';

import React from 'react';

interface TemplateFormProps {
  onSubmit: (templateName: string, templateContent: string) => void;
  onCancel: () => void;
}

export default function TemplateForm({ onSubmit, onCancel }: TemplateFormProps) {
  const [templateName, setTemplateName] = React.useState('');
  const [templateContent, setTemplateContent] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (templateName.trim() && templateContent.trim()) {
      onSubmit(templateName, templateContent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label 
          htmlFor="templateName"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Template Name
        </label>
        <input
          id="templateName"
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Enter a name for this template"
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
          htmlFor="templateContent"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          Message Content
        </label>
        <textarea
          id="templateContent"
          value={templateContent}
          onChange={(e) => setTemplateContent(e.target.value)}
          placeholder="Enter the message template content"
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
          Save Template
        </button>
      </div>
    </form>
  );
}
