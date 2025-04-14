'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Main component that uses Suspense
export default function SignIn() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '32px',
          textAlign: 'center'
        }}>
          Loading...
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

// Child component that uses useSearchParams
function SignInContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    await signIn('facebook', { callbackUrl: '/dashboard' });
    // Note: No need to set isLoading to false here as we'll be redirected
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    await signIn('credentials', { callbackUrl: '/dashboard' });
    // Note: No need to set isLoading to false here as we'll be redirected
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#333',
          textAlign: 'center'
        }}>
          Sign in to Instagram Auto-Responder
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Connect your Instagram account to get started
        </p>
        
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error === 'OAuthSignin' ? 'Error starting the sign in process.' :
             error === 'OAuthCallback' ? 'Error completing the sign in process.' :
             error === 'OAuthCreateAccount' ? 'Error creating your account.' :
             error === 'EmailCreateAccount' ? 'Error creating your account.' :
             error === 'Callback' ? 'Error during the callback process.' :
             error === 'OAuthAccountNotLinked' ? 'This email is already associated with another account.' :
             error === 'EmailSignin' ? 'Error sending the sign in email.' :
             error === 'CredentialsSignin' ? 'Invalid credentials.' :
             error === 'SessionRequired' ? 'Please sign in to access this page.' :
             'An unknown error occurred.'}
          </div>
        )}
        
        <button
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '16px',
            opacity: isLoading ? '0.7' : '1'
          }}
        >
          {isLoading ? 'Signing in...' : 'Continue with Facebook'}
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '16px 0'
        }}>
          <div style={{
            flex: '1',
            height: '1px',
            backgroundColor: '#e5e5e5'
          }}></div>
          <span style={{
            padding: '0 10px',
            color: '#666',
            fontSize: '14px'
          }}>Or</span>
          <div style={{
            flex: '1',
            height: '1px',
            backgroundColor: '#e5e5e5'
          }}></div>
        </div>
        
        <button
          onClick={handleDemoSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            opacity: isLoading ? '0.7' : '1'
          }}
        >
          {isLoading ? 'Signing in...' : 'Continue with Demo Account'}
        </button>
      </div>
    </div>
  );
}
