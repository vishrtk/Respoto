'use client';

import { useState, useEffect } from 'react';
import { useBreakpoint, useIsMobile, useIsTablet, useIsDesktop } from '/src/hooks/useBreakpoint';
import AnimatedElement from '/src/components/ui/AnimatedElement';
import { LoadingButton, SkeletonCard, ShimmerEffect, PulseEffect, FloatingElement } from '/src/components/ui/LoadingEffects';
import Button from '/src/components/ui/Button';
import Card from '/src/components/ui/Card';
import Badge from '/src/components/ui/Badge';
import Input from '/src/components/ui/Input';
import Tabs from '/src/components/ui/Tabs';
import EmptyState from '/src/components/ui/EmptyState';

export default function TestUI() {
  const { breakpoint, width } = useBreakpoint();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  
  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  const tabs = [
    { id: 'components', label: 'Components' },
    { id: 'animations', label: 'Animations' },
    { id: 'responsive', label: 'Responsive' }
  ];
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <AnimatedElement animation="fade-in" duration={500}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            UI Test Page
          </h1>
          <p className="text-text-secondary">
            Testing the new UI components, animations, and responsive design
          </p>
        </AnimatedElement>
      </header>
      
      <div className="mb-6">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
      
      {activeTab === 'responsive' && (
        <div className="space-y-6">
          <AnimatedElement animation="slide-in" delay={100}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Responsive Design Test</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Current Breakpoint:</p>
                    <p className="text-text-secondary">{breakpoint}</p>
                  </div>
                  <Badge variant="primary" className="mt-2 md:mt-0">
                    Width: {width}px
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="font-medium">Mobile</p>
                    <Badge variant={isMobile ? 'success' : 'secondary'}>
                      {isMobile ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="font-medium">Tablet</p>
                    <Badge variant={isTablet ? 'success' : 'secondary'}>
                      {isTablet ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="font-medium">Desktop</p>
                    <Badge variant={isDesktop ? 'success' : 'secondary'}>
                      {isDesktop ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Responsive Elements Test:</p>
                  <div className="flex flex-col sm:flex-row gap-2 mobile-stack">
                    <Button>Mobile Stack Test</Button>
                    <Button variant="secondary">Button 2</Button>
                    <Button variant="danger">Button 3</Button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mobile-card-grid">
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Card 1</h3>
                    <p className="text-text-secondary">This card will stack on mobile</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Card 2</h3>
                    <p className="text-text-secondary">This card will stack on mobile</p>
                  </Card>
                  <Card className="p-4 mobile-hidden lg:block">
                    <h3 className="font-medium mb-2">Card 3</h3>
                    <p className="text-text-secondary">This card is hidden on mobile</p>
                  </Card>
                </div>
              </div>
            </Card>
          </AnimatedElement>
        </div>
      )}
      
      {activeTab === 'components' && (
        <div className="space-y-6">
          <AnimatedElement animation="slide-in" delay={100}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Button Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button disabled>Disabled Button</Button>
                <LoadingButton isLoading={isLoading} onClick={handleLoadingTest}>
                  {isLoading ? 'Loading...' : 'Test Loading'}
                </LoadingButton>
              </div>
            </Card>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-in" delay={200}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Form Elements</h2>
              <div className="space-y-4 max-w-md">
                <Input 
                  label="Text Input"
                  placeholder="Enter some text"
                />
                
                <Input 
                  label="Email Input"
                  type="email"
                  placeholder="Enter your email"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  }
                />
                
                <Input 
                  label="Password Input"
                  type="password"
                  placeholder="Enter your password"
                  error="This field is required"
                />
                
                <div className="space-y-2">
                  <label htmlFor="textarea" className="label">
                    Textarea
                  </label>
                  <textarea
                    id="textarea"
                    className="input min-h-[120px] resize-y"
                    placeholder="Enter multiple lines of text"
                  />
                </div>
              </div>
            </Card>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-in" delay={300}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Badges</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </Card>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-in" delay={400}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Cards & Empty States</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <EmptyState
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    }
                    title="No items found"
                    description="Try adjusting your search or filter to find what you're looking for."
                    action={<Button>Add Item</Button>}
                  />
                </Card>
                
                <SkeletonCard />
              </div>
            </Card>
          </AnimatedElement>
        </div>
      )}
      
      {activeTab === 'animations' && (
        <div className="space-y-6">
          <AnimatedElement animation="slide-in" delay={100}>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Animation Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Fade & Slide Animations</h3>
                  <div className="space-y-2">
                    <AnimatedElement animation="fade-in" className="p-4 bg-gray-50 rounded-lg">
                      Fade In Animation
                    </AnimatedElement>
                    
                    <AnimatedElement animation="slide-in" className="p-4 bg-gray-50 rounded-lg">
                      Slide In Animation
                    </AnimatedElement>
                    
                    <AnimatedElement animation="slide-in-left" className="p-4 bg-gray-50 rounded-lg">
                      Slide In Left Animation
                    </AnimatedElement>
                    
                    <AnimatedElement animation="slide-in-right" className="p-4 bg-gray-50 rounded-lg">
                      Slide In Right Animation
                    </AnimatedElement>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Loading & Effect Animations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                      <div className="loading-spinner"></div>
                      <span className="loading-dots">Loading</span>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <ShimmerEffect className="mb-2" />
                      <ShimmerEffect width="w-2/3" />
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg flex justify-center">
                      <PulseEffect>
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                          </svg>
                        </div>
                      </PulseEffect>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg flex justify-center">
                      <FloatingElement>
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                      </FloatingElement>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Hover & Interaction Effects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Button className="hover-lift">Hover Lift Effect</Button>
                  <Button className="hover-scale">Hover Scale Effect</Button>
                  <Button className="hover-glow">Hover Glow Effect</Button>
                </div>
              </div>
            </Card>
          </AnimatedElement>
        </div>
      )}
    </div>
  );
}
