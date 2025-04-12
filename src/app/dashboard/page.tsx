'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('triggers');
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Instagram Auto-Responder
        </h1>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#f3f4f6',
          color: '#333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Sign Out
        </button>
      </header>
      
      {/* Main content */}
      <div style={{
        display: 'flex',
        flex: '1'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '240px',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e5e5',
          padding: '24px 16px'
        }}>
          <div style={{
            marginBottom: '24px'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Connect Instagram
            </button>
          </div>
          
          <nav>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>
              <li>
                <button 
                  onClick={() => setActiveTab('triggers')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === 'triggers' ? '#e5e7eb' : 'transparent',
                    color: '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '4px'
                  }}
                >
                  Trigger Words
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('templates')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === 'templates' ? '#e5e7eb' : 'transparent',
                    color: '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '4px'
                  }}
                >
                  Message Templates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('activity')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === 'activity' ? '#e5e7eb' : 'transparent',
                    color: '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '4px'
                  }}
                >
                  Activity Log
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('settings')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === 'settings' ? '#e5e7eb' : 'transparent',
                    color: '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Content area */}
        <div style={{
          flex: '1',
          padding: '24px'
        }}>
          {activeTab === 'triggers' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Trigger Words
              </h2>
              <p style={{
                marginBottom: '24px',
                color: '#666'
              }}>
                Set up words that will trigger automatic responses to comments on your Instagram posts.
              </p>
              
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '24px'
              }}>
                Add New Trigger
              </button>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  No trigger words configured yet
                </p>
                <p style={{
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Add your first trigger word to start automatically responding to comments.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'templates' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Message Templates
              </h2>
              <p style={{
                marginBottom: '24px',
                color: '#666'
              }}>
                Create reusable message templates for your automatic responses.
              </p>
              
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '24px'
              }}>
                Create New Template
              </button>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  No message templates created yet
                </p>
                <p style={{
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Create your first message template to use in your automatic responses.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Activity Log
              </h2>
              <p style={{
                marginBottom: '24px',
                color: '#666'
              }}>
                View a history of automatic responses sent to comments.
              </p>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  No activity recorded yet
                </p>
                <p style={{
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Activity will appear here once automatic responses are sent.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Settings
              </h2>
              <p style={{
                marginBottom: '24px',
                color: '#666'
              }}>
                Configure your Instagram Auto-Responder settings.
              </p>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '16px'
                }}>
                  Connected Accounts
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '16px'
                }}>
                  No Instagram accounts connected yet.
                </p>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Connect Instagram Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
