import { onCLS, onINP, onLCP } from 'web-vitals';

const logMetric = (name: string, value: number) => {
  if (import.meta.env.DEV) {
    console.info(`[web-vitals] ${name}:`, value);
  }
};

export const reportWebVitals = () => {
  onCLS((metric) => logMetric(metric.name, metric.value));
  onINP((metric) => logMetric(metric.name, metric.value));
  onLCP((metric) => logMetric(metric.name, metric.value));
};
