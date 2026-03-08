import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getCompletionStreak, getFocusHour, getWeeklyCompletionTrend } from './task';
import { Task } from '../types/task';

const baseTask = (overrides: Partial<Task>): Task => ({
  id: crypto.randomUUID(),
  title: 'Test',
  priority: 'medium',
  createdAt: '2026-03-01T10:00:00.000Z',
  updatedAt: '2026-03-01T10:00:00.000Z',
  completed: false,
  ...overrides,
});

describe('task analytics', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-08T10:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates completion streak', () => {
    const tasks: Task[] = [
      baseTask({ completed: true, completedAt: '2026-03-08T08:00:00.000Z' }),
      baseTask({ completed: true, completedAt: '2026-03-07T08:00:00.000Z' }),
      baseTask({ completed: true, completedAt: '2026-03-06T08:00:00.000Z' }),
    ];

    expect(getCompletionStreak(tasks)).toBe(3);
  });

  it('returns focus hour based on due times', () => {
    const tasks: Task[] = [
      baseTask({ dueTime: '09:00' }),
      baseTask({ dueTime: '09:30' }),
      baseTask({ dueTime: '14:00' }),
    ];

    expect(getFocusHour(tasks)).toBe('09:00');
  });

  it('creates 7-day trend output', () => {
    const tasks: Task[] = [
      baseTask({ completed: true, completedAt: '2026-03-08T08:00:00.000Z' }),
      baseTask({ completed: true, completedAt: '2026-03-07T08:00:00.000Z' }),
    ];

    const trend = getWeeklyCompletionTrend(tasks);

    expect(trend).toHaveLength(7);
    expect(trend[6].count).toBe(1);
  });
});
