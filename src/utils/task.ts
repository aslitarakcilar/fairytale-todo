import { compareAsc, parseISO } from 'date-fns';
import {
  Priority,
  SortOption,
  Task,
  TaskFilters,
  TaskView,
} from '../types/task';
import { isTaskDueToday, isTaskOverdue, isTaskUpcoming } from './date';

const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const today = tasks.filter((task) => isTaskDueToday(task)).length;
  const overdue = tasks.filter((task) => isTaskOverdue(task)).length;

  return { total, completed, pending, today, overdue };
};

export const filterByView = (tasks: Task[], view: TaskView): Task[] => {
  switch (view) {
    case 'today':
      return tasks.filter((task) => isTaskDueToday(task));
    case 'upcoming':
      return tasks.filter((task) => isTaskUpcoming(task));
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'overdue':
      return tasks.filter((task) => isTaskOverdue(task));
    default:
      return tasks;
  }
};

export const applyTaskFilters = (tasks: Task[], filters: TaskFilters): Task[] => {
  return tasks.filter((task) => {
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;

    if (filters.completion === 'completed' && !task.completed) return false;
    if (filters.completion === 'pending' && task.completed) return false;

    return true;
  });
};

export const applySearch = (tasks: Task[], query: string): Task[] => {
  if (!query.trim()) return tasks;
  const normalized = query.toLowerCase();

  return tasks.filter((task) => task.title.toLowerCase().includes(normalized));
};

export const sortTasks = (tasks: Task[], sortBy: SortOption): Task[] => {
  const clone = [...tasks];

  switch (sortBy) {
    case 'alphabetical':
      return clone.sort((a, b) => a.title.localeCompare(b.title));
    case 'priority':
      return clone.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    case 'dueDate':
      return clone.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
      });
    case 'createdAt':
    default:
      return clone.sort((a, b) =>
        compareAsc(parseISO(b.createdAt), parseISO(a.createdAt))
      );
  }
};

export const categoriesFromTasks = (tasks: Task[]): string[] => {
  const categories = new Set<string>();

  tasks.forEach((task) => {
    if (task.category?.trim()) categories.add(task.category);
  });

  return [...categories].sort((a, b) => a.localeCompare(b));
};
