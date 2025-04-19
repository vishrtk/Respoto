'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/useBreakpoint';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Modal from '@/components/ui/Modal';
import TriggerForm from '@/components/modals/TriggerForm';
import TemplateForm from '@/components/modals/TemplateForm';
import ConnectInstagramForm from '@/components/modals/ConnectInstagramForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState('triggers');
  const [showTriggerModal, setShowTriggerModal] = React.useState(false);
  const [showTemplateModal, setShowTemplateModal] = React.useState(false);
  const [showConnectModal, setShowConnectModal] = React.useState(false);
  const [triggers, setTriggers] = React.useState([]);
  const [templates, setTemplates] = React.useState([]);
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    alert('Sign Out clicked');
  };

  const handleConnectInstagram = () => {
    setShowConnectModal(true);
  };

  const handleAddTrigger = () => {
    setShowTriggerModal(true);
  };

  const handleCreateTemplate = () => {
    setShowTemplateModal(true);
  };

  const handleSaveTrigger = (triggerData) => {
    setTriggers([...triggers, triggerData]);
    setShowTriggerModal(false);
  };

  const handleSaveTemplate = (templateData) => {
    setTemplates([...templates, templateData]);
    setShowTemplateModal(false);
  };

  const handleConnectAccount = (accountData) => {
    console.log('Connected account:', accountData);
    setShowConnectModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        variant="instagram" 
        logo={<span className="text-xl font-bold text-instagram-gradient">Respoto</span>}
        actions={
          <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
        }
      >
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </Header>

      <div className="flex flex-1">
        <Sidebar 
          variant="instagram"
          logo={<span className="text-xl font-bold text-instagram-gradient">Respoto</span>}
          collapsible
          mobile={isMobile}
        >
          <div className="space-y-1 px-3 mb-6">
            <SidebarItem href="#" active={activeTab === 'triggers'} onClick={() => setActiveTab('triggers')}>
              Triggers
            </SidebarItem>
            <SidebarItem href="#" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
              Templates
            </SidebarItem>
            <SidebarItem href="#" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              Settings
            </SidebarItem>
          </div>
          
          <div className="px-3 mt-auto">
            <Button 
              variant="instagram" 
              fullWidth 
              onClick={handleConnectInstagram}
              className="mt-4"
            >
              Connect Instagram
            </Button>
          </div>
        </Sidebar>

        <main className="flex-1 p-4 md:p-6">
          <AnimatedElement animation="fadeInUp" className="mb-6">
            <Card variant="instagram">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Welcome to Respoto</h2>
                    <p className="text-gray-600">Automate your Instagram responses with trigger words</p>
                  </div>
                  <Badge variant="instagram" size="lg">Instagram Auto-Responder</Badge>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <div className="mt-6">
            {activeTab === 'triggers' && (
              <AnimatedElement animation="fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Trigger Words</h2>
                  <Button variant="instagram" onClick={handleAddTrigger}>
                    Add New Trigger
                  </Button>
                </div>
                
                {triggers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {triggers.map((trigger, index) => (
                      <AnimatedElement key={index} animation="fadeInUp" delay={`${index * 100}`}>
                        <Card isInteractive>
                          <CardHeader>
                            <CardTitle>{trigger.triggerWord}</CardTitle>
                            <CardDescription>Responds with: {trigger.templateName}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">
                              Active on post: {trigger.postUrl ? new URL(trigger.postUrl).pathname : 'All posts'}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Badge variant={trigger.isActive ? 'success' : 'secondary'}>
                              {trigger.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </CardFooter>
                        </Card>
                      </AnimatedElement>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    }
                    title="No triggers created yet"
                    description="Create your first trigger word to start automating responses on your Instagram posts."
                    action={{
                      label: "Add New Trigger",
                      onClick: handleAddTrigger
                    }}
                  />
                )}
              </AnimatedElement>
            )}

            {activeTab === 'templates' && (
              <AnimatedElement animation="fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Response Templates</h2>
                  <Button variant="instagram" onClick={handleCreateTemplate}>
                    Create New Template
                  </Button>
                </div>
                
                {templates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template, index) => (
                      <AnimatedElement key={index} animation="fadeInUp" delay={`${index * 100}`}>
                        <Card isInteractive>
                          <CardHeader>
                            <CardTitle>{template.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500 line-clamp-3">
                              {template.content}
                            </p>
                          </CardContent>
                        </Card>
                      </AnimatedElement>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    }
                    title="No templates created yet"
                    description="Create your first response template to use with your trigger words."
                    action={{
                      label: "Create New Template",
                      onClick: handleCreateTemplate
                    }}
                  />
                )}
              </AnimatedElement>
            )}

            {activeTab === 'settings' && (
              <AnimatedElement animation="fadeIn">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Instagram Connection</CardTitle>
                    <CardDescription>Connect your Instagram account to enable auto-responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">You need to connect your Instagram account to use Respoto's auto-response features.</p>
                    <Button variant="instagram" onClick={handleConnectInstagram}>
                      Connect Instagram Account
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedElement>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showTriggerModal}
        onClose={() => setShowTriggerModal(false)}
        title="Add New Trigger"
        size="md"
      >
        <TriggerForm 
          onSubmit={handleSaveTrigger} 
          onCancel={() => setShowTriggerModal(false)}
          templates={templates}
        />
      </Modal>

      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title="Create New Template"
        size="md"
      >
        <TemplateForm 
          onSubmit={handleSaveTemplate} 
          onCancel={() => setShowTemplateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect Instagram Account"
        size="md"
      >
        <ConnectInstagramForm 
          onSubmit={handleConnectAccount} 
          onCancel={() => setShowConnectModal(false)}
        />
      </Modal>
    </div>
  );
}
