import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif', color: '#fff', backgroundColor: '#000', minHeight: '100vh' }}>
          <h1 style={{ color: '#ef4444' }}>Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
          <details style={{ marginTop: '1rem', backgroundColor: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <summary style={{ cursor: 'pointer', color: '#fbbf24' }}>Diagnostic Error Details</summary>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem', fontFamily: 'monospace', color: '#f3f4f6', fontSize: '0.85rem' }}>
              {this.state.error?.stack || this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
