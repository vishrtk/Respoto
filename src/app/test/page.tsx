'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import EmptyState from '@/components/ui/EmptyState';
import Tabs from '@/components/ui/Tabs';
import AnimatedElement from '@/components/ui/AnimatedElement';
import LoadingEffects from '@/components/ui/LoadingEffects';
import { useBreakpoint, useIsMobile } from '@/hooks/useBreakpoint';

export default function TestPage() {
  const [showToast, setShowToast] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        variant="instagram" 
        logo={<span className="text-xl font-bold text-instagram-gradient">Respoto</span>}
        actions={
          <Button variant="outline" size="sm">Sign Out</Button>
        }
      >
        <h1 className="text-xl font-semibold">UI Components Test</h1>
      </Header>

      <div className="flex">
        <Sidebar 
          variant="instagram"
          logo={<span className="text-xl font-bold text-instagram-gradient">Respoto</span>}
          collapsible
        >
          <div className="space-y-1 px-3">
            <SidebarItem href="#buttons" active>Buttons</SidebarItem>
            <SidebarItem href="#cards">Cards</SidebarItem>
            <SidebarItem href="#badges">Badges</SidebarItem>
            <SidebarItem href="#inputs">Inputs</SidebarItem>
            <SidebarItem href="#modals">Modals & Toasts</SidebarItem>
            <SidebarItem href="#animations">Animations</SidebarItem>
          </div>
        </Sidebar>

        <main className="flex-1 p-6">
          <AnimatedElement animation="fadeInUp" className="mb-8">
            <Card variant="instagram" className="mb-8">
              <CardHeader>
                <CardTitle>Respoto UI Components</CardTitle>
                <CardDescription>
                  A showcase of all UI components with Instagram-inspired design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>This page demonstrates all the UI components created for the Respoto application. The design is inspired by Instagram's aesthetic with modern, clean interfaces and subtle animations.</p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <Tabs
            variant="instagram"
            tabs={[
              {
                value: "components",
                label: "Components",
                content: (
                  <div className="space-y-12">
                    <AnimatedElement animation="fadeInUp" delay="100" className="space-y-4">
                      <h2 id="buttons" className="text-2xl font-semibold border-b pb-2">Buttons</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button variant="default">Default Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="destructive">Destructive Button</Button>
                        <Button variant="instagram">Instagram Button</Button>
                        <Button variant="default" size="sm">Small Button</Button>
                        <Button variant="default" size="lg">Large Button</Button>
                        <Button variant="default" isLoading>Loading Button</Button>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="200" className="space-y-4">
                      <h2 id="cards" className="text-2xl font-semibold border-b pb-2">Cards</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Default Card</CardTitle>
                            <CardDescription>This is a default card component</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Cards can contain various content and are used to group related information.</p>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>
                        
                        <Card variant="instagram" isInteractive>
                          <CardHeader>
                            <CardTitle>Instagram Card</CardTitle>
                            <CardDescription>With hover effects</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card has Instagram-inspired styling and interactive hover effects.</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="instagram" size="sm">Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="300" className="space-y-4">
                      <h2 id="badges" className="text-2xl font-semibold border-b pb-2">Badges</h2>
                      <div className="flex flex-wrap gap-4">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="instagram">Instagram</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="400" className="space-y-4">
                      <h2 id="inputs" className="text-2xl font-semibold border-b pb-2">Inputs</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Default Input" placeholder="Enter text here" />
                        <Input 
                          label="Input with Helper Text" 
                          placeholder="Enter email" 
                          helperText="We'll never share your email with anyone else."
                        />
                        <Input 
                          label="Input with Error" 
                          placeholder="Enter username" 
                          error="This username is already taken"
                        />
                        <Input 
                          label="Input with Icon" 
                          placeholder="Search..." 
                          icon={
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          }
                        />
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="500" className="space-y-4">
                      <h2 id="modals" className="text-2xl font-semibold border-b pb-2">Modals & Toasts</h2>
                      <div className="flex flex-wrap gap-4">
                        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                        <Button variant="secondary" onClick={() => setShowToast(true)}>Show Toast</Button>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="600" className="space-y-4">
                      <h2 id="empty-states" className="text-2xl font-semibold border-b pb-2">Empty States</h2>
                      <Card>
                        <CardContent>
                          <EmptyState
                            icon={
                              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            }
                            title="No messages found"
                            description="You don't have any messages yet. Connect your Instagram account to get started."
                            action={{
                              label: "Connect Instagram",
                              onClick: () => alert("Connect Instagram clicked")
                            }}
                          />
                        </CardContent>
                      </Card>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="700" className="space-y-4">
                      <h2 id="loading" className="text-2xl font-semibold border-b pb-2">Loading Effects</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="flex justify-center py-8">
                            <LoadingEffects type="spinner" text="Loading..." />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="flex justify-center py-8">
                            <LoadingEffects type="dots" text="Loading..." />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="flex justify-center py-8">
                            <LoadingEffects type="pulse" text="Loading..." />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="py-8">
                            <LoadingEffects type="skeleton" />
                          </CardContent>
                        </Card>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fadeInUp" delay="800" className="space-y-4">
                      <h2 id="animations" className="text-2xl font-semibold border-b pb-2">Animations</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatedElement animation="fadeIn" className="p-4 border rounded-md text-center">
                          Fade In
                        </AnimatedElement>
                        <AnimatedElement animation="fadeInUp" className="p-4 border rounded-md text-center">
                          Fade In Up
                        </AnimatedElement>
                        <AnimatedElement animation="zoomIn" className="p-4 border rounded-md text-center">
                          Zoom In
                        </AnimatedElement>
                        <AnimatedElement animation="slideUp" className="p-4 border rounded-md text-center">
                          Slide Up
                        </AnimatedElement>
                        <AnimatedElement animation="pulse" className="p-4 border rounded-md text-center">
                          Pulse
                        </AnimatedElement>
                        <AnimatedElement animation="bounce" className="p-4 border rounded-md text-center">
                          Bounce
                        </AnimatedElement>
                      </div>
                    </AnimatedElement>
                  </div>
                ),
              },
              {
                value: "usage",
                label: "Usage Guide",
                content: (
                  <div className="prose max-w-none">
                    <h2>How to Use These Components</h2>
                    <p>
                      All components are built using React and Tailwind CSS. They are designed to be easy to use and customize.
                    </p>
                    <h3>Import Components</h3>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      {`import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';`}
                    </pre>
                    <h3>Component Props</h3>
                    <p>
                      All components accept standard HTML attributes plus additional props for customization.
                      For example, Button component accepts variant, size, isLoading, and fullWidth props.
                    </p>
                    <h3>Responsive Design</h3>
                    <p>
                      Components are designed to be responsive out of the box. Use the useBreakpoint hook
                      for conditional rendering based on screen size.
                    </p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      {`import { useIsMobile } from '@/hooks/useBreakpoint';

function MyComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}`}
                    </pre>
                  </div>
                ),
              },
            ]}
          />
        </main>
      </div>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        variant="instagram"
        position="bottomRight"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        This is a toast notification with Instagram styling!
      </Toast>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        size="md"
        animation="zoom"
      >
        <div className="space-y-4">
          <p>This is an example modal with Instagram-inspired styling.</p>
          <p>You can use this for forms, confirmations, or any content that requires user attention.</p>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="instagram" onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
