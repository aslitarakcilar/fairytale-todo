import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { reportWebVitals } from './monitoring/performance';
import { initSentry, SentryBoundary } from './monitoring/sentry';

initSentry();
reportWebVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SentryBoundary fallback={<p>Bir hata oluştu. Lütfen sayfayı yenile.</p>}>
      <App />
    </SentryBoundary>
  </React.StrictMode>
);
