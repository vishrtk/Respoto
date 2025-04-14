'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface TriggerWord {
  _id: string;
  mediaId: string;
  word: string;
  responseTemplateId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  _id: string;
  name: string;
  content: string;
}

export default function TriggersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [triggers, setTriggers] = useState<TriggerWord[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState({
    mediaId: '',
    word: '',
    responseTemplateId: '',
    isActive: true
  });
  const [error, setError] = useState('');
  // Add this state to detect client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Add this useEffect to set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchTriggers();
      fetchTemplates();
    }
  }, [status, router]);

  const fetchTriggers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/trigger-words');
      if (!response.ok) {
        throw new Error('Failed to fetch triggers');
      }
      const data = await response.json();
      setTriggers(data.triggerWords || []);
    } catch (error) {
      console.error('Error fetching triggers:', error);
      setError('Failed to load trigger words');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/message-templates');
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleAddNewTrigger = () => {
    console.log('Add New Trigger button clicked!'); // Debug log
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Close Modal button clicked!'); // Debug log
    setIsModalOpen(false);
    setNewTrigger({
      mediaId: '',
      word: '',
      responseTemplateId: '',
      isActive: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewTrigger({
      ...newTrigger,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!'); // Debug log
    
    if (!newTrigger.mediaId || !newTrigger.word || !newTrigger.responseTemplateId) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch('/api/trigger-words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrigger)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create trigger word');
      }
      
      await fetchTriggers();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating trigger word:', error);
      setError('Failed to create trigger word');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrigger = async (id: string) => {
    console.log('Delete Trigger button clicked for ID:', id); // Debug log
    if (!confirm('Are you sure you want to delete this trigger word?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/trigger-words/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete trigger word');
      }
      
      await fetchTriggers();
    } catch (error) {
      console.error('Error deleting trigger word:', error);
      setError('Failed to delete trigger word');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    console.log('Toggle Active button clicked for ID:', id); // Debug log
    try {
      setIsLoading(true);
      const response = await fetch(`/api/trigger-words/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update trigger word');
      }
      
      await fetchTriggers();
    } catch (error) {
      console.error('Error updating trigger word:', error);
      setError('Failed to update trigger word');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Trigger Words</h1>
        
        {/* Only render the button on the client side */}
        {isClient && (
          <button 
            onClick={handleAddNewTrigger}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add New Trigger
          </button>
        )}
      </div>
      
      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#fee2e2', 
          color: '#b91c1c', 
          borderRadius: '4px', 
          marginBottom: '16px' 
        }}>
          {error}
        </div>
      )}
      
      {triggers.length === 0 ? (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '4px', 
          textAlign: 'center' 
        }}>
          No trigger words found. Add your first trigger word to start automating responses.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Trigger Word</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Media ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Response Template</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {triggers.map((trigger) => (
                <tr key={trigger._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{trigger.word}</td>
                  <td style={{ padding: '12px' }}>{trigger.mediaId}</td>
                  <td style={{ padding: '12px' }}>
                    {templates.find(t => t._id === trigger.responseTemplateId)?.name || trigger.responseTemplateId}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      backgroundColor: trigger.isActive ? '#dcfce7' : '#fee2e2',
                      color: trigger.isActive ? '#166534' : '#b91c1c',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {trigger.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Only render interactive buttons on the client side */}
                      {isClient && (
                        <>
                          <button
                            onClick={() => handleToggleActive(trigger._id, trigger.isActive)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: trigger.isActive ? '#fee2e2' : '#dcfce7',
                              color: trigger.isActive ? '#b91c1c' : '#166534',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            {trigger.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteTrigger(trigger._id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#fee2e2',
                              color: '#b91c1c',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Only render the modal on the client side */}
      {isClient && isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Add New Trigger Word</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Media ID (Instagram Post ID) *
                </label>
                <input
                  type="text"
                  name="mediaId"
                  value={newTrigger.mediaId}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter Instagram post ID"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Trigger Word *
                </label>
                <input
                  type="text"
                  name="word"
                  value={newTrigger.word}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter trigger word"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Response Template *
                </label>
                <select
                  name="responseTemplateId"
                  value={newTrigger.responseTemplateId}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template._id} value={template._id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={newTrigger.isActive}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px' }}
                  />
                  <span>Active</span>
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
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
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
