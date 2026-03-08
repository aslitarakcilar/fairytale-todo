import { format, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Task } from '../types/task';

export const formatDueLabel = (task: Task): string => {
  if (!task.dueDate) return 'Saatsiz görev';

  const date = parseISO(task.dueDate);
  const formattedDate = format(date, 'd MMM yyyy', { locale: tr });

  if (!task.dueTime) return formattedDate;
  return `${formattedDate} saat ${task.dueTime}`;
};

export const isTaskDueToday = (task: Task): boolean => {
  if (!task.dueDate) return false;
  return isSameDay(parseISO(task.dueDate), new Date());
};

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.completed) return false;

  const dueDate = parseISO(task.dueDate);
  return isBefore(dueDate, startOfDay(new Date()));
};

export const isTaskUpcoming = (task: Task): boolean => {
  if (!task.dueDate || task.completed) return false;

  const dueDate = parseISO(task.dueDate);
  const today = startOfDay(new Date());

  return dueDate >= today && !isTaskDueToday(task);
};
