import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN;

export const initSentry = () => {
  if (!dsn) return;

  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  });
};

export const SentryBoundary = Sentry.ErrorBoundary;
