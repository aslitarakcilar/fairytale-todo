export type Priority = 'low' | 'medium' | 'high';

export type TaskView = 'all' | 'today' | 'upcoming' | 'completed' | 'overdue';

export type CompletionFilter = 'all' | 'completed' | 'pending';

export type SortOption = 'dueDate' | 'createdAt' | 'priority' | 'alphabetical';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}

export interface TaskInput {
  title: string;
  description?: string;
  category?: string;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
}

export interface TaskFilters {
  category: string;
  priority: 'all' | Priority;
  completion: CompletionFilter;
}
