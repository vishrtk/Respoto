'use client';

import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import TriggerForm from '@/components/modals/TriggerForm';
import TemplateForm from '@/components/modals/TemplateForm';
import ConnectInstagramForm from '@/components/modals/ConnectInstagramForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('triggers');
  
  // Modal states
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showConnectInstagram, setShowConnectInstagram] = useState(false);
  const [showAddTrigger, setShowAddTrigger] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  
  // Mock data states
  const [triggers, setTriggers] = useState<{word: string, response: string}[]>([]);
  const [templates, setTemplates] = useState<{name: string, content: string}[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  
  // Handler functions
  const handleSignOut = () => {
    // In a real app, this would handle authentication logout
    alert('Sign out functionality would be implemented here');
    setShowSignOutConfirm(false);
  };
  
  const handleConnectInstagram = (username: string, password: string) => {
    // In a real app, this would handle Instagram API authentication
    setConnectedAccounts([...connectedAccounts, username]);
    alert(`Connected Instagram account: ${username}`);
    setShowConnectInstagram(false);
  };
  
  const handleAddTrigger = (triggerWord: string, responseTemplate: string) => {
    setTriggers([...triggers, {word: triggerWord, response: responseTemplate}]);
    setShowAddTrigger(false);
  };
  
  const handleCreateTemplate = (templateName: string, templateContent: string) => {
    setTemplates([...templates, {name: templateName, content: templateContent}]);
    setShowCreateTemplate(false);
  };
  
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
        <button 
          onClick={() => setShowSignOutConfirm(true)}
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
            <button 
              onClick={() => setShowConnectInstagram(true)}
              style={{
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
              }}
            >
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
              
              <button 
                onClick={() => setShowAddTrigger(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginBottom: '24px'
                }}
              >
                Add New Trigger
              </button>
              
              {triggers.length === 0 ? (
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
              ) : (
                triggers.map((trigger, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}>
                      Trigger: "{trigger.word}"
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Response: {trigger.response}
                    </p>
                  </div>
                ))
              )}
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
              
              <button 
                onClick={() => setShowCreateTemplate(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginBottom: '24px'
                }}
              >
                Create New Template
              </button>
              
              {templates.length === 0 ? (
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
              ) : (
                templates.map((template, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}>
                      {template.name}
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      {template.content}
                    </p>
                  </div>
                ))
              )}
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
                {connectedAccounts.length === 0 ? (
                  <p style={{
                    color: '#666',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}>
                    No Instagram accounts connected yet.
                  </p>
                ) : (
                  <div style={{ marginBottom: '16px' }}>
                    {connectedAccounts.map((account, index) => (
                      <div key={index} style={{
                        padding: '8px 12px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        marginBottom: '8px'
                      }}>
                        {account}
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => setShowConnectInstagram(true)}
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
                  Connect Instagram Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <Modal 
        isOpen={showSignOutConfirm} 
        onClose={() => setShowSignOutConfirm(false)}
        title="Sign Out"
      >
        <div>
          <p style={{ marginBottom: '24px' }}>Are you sure you want to sign out?</p>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            <button
              onClick={() => setShowSignOutConfirm(false)}
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
              onClick={handleSignOut}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </Modal>
      
      <Modal 
        isOpen={showConnectInstagram} 
        onClose={() => setShowConnectInstagram(false)}
        title="Connect Instagram Account"
      >
        <ConnectInstagramForm 
          onSubmit={handleConnectInstagram}
          onCancel={() => setShowConnectInstagram(false)}
        />
      </Modal>
      
      <Modal 
        isOpen={showAddTrigger} 
        onClose={() => setShowAddTrigger(false)}
        title="Add New Trigger"
      >
        <TriggerForm 
          onSubmit={handleAddTrigger}
          onCancel={() => setShowAddTrigger(false)}
        />
      </Modal>
      
      <Modal 
        isOpen={showCreateTemplate} 
        onClose={() => setShowCreateTemplate(false)}
        title="Create Message Template"
      >
        <TemplateForm 
          onSubmit={handleCreateTemplate}
          onCancel={() => setShowCreateTemplate(false)}
        />
      </Modal>
    </div>
  );
}
