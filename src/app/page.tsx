export default function Home() {
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
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '32px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#333'
        }}>
          Instagram Auto-Responder
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          Automatically respond to comments on your Instagram posts based on trigger words
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <a 
            href="/auth/signin" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            Get Started
          </a>
          <a 
            href="/dashboard" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            View Demo
          </a>
        </div>
      </div>
    </div>
  );
}
