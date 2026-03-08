import { useEffect, useMemo, useState } from 'react';
import { Task, TaskInput } from '../types/task';
import { TASKS_TABLE, supabase } from '../utils/supabase';

const storageKey = (userId: string) => `fairytale_tasks_${userId}`;
const backupStorageKey = (userId: string) => `fairytale_tasks_backup_${userId}`;

interface RemoteTaskRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  priority: Task['priority'];
  due_date: string | null;
  due_time: string | null;
  created_at: string;
  updated_at: string;
  completed: boolean;
}

const normalizeTask = (task: Task): Task => ({
  ...task,
  updatedAt: task.updatedAt ?? task.createdAt,
  completedAt: task.completedAt ?? (task.completed ? task.updatedAt : undefined),
});

const isValidTaskArray = (value: unknown): value is Task[] => {
  if (!Array.isArray(value)) return false;
  return value.every(
    (task) =>
      typeof task?.id === 'string' &&
      typeof task?.title === 'string' &&
      typeof task?.priority === 'string' &&
      typeof task?.createdAt === 'string' &&
      typeof task?.completed === 'boolean'
  );
};

const loadLocalTasks = (userId: string): Task[] => {
  const stored = localStorage.getItem(storageKey(userId));
  const backup = localStorage.getItem(backupStorageKey(userId));

  try {
    if (stored) {
      const parsed = JSON.parse(stored);
      if (isValidTaskArray(parsed)) return parsed.map(normalizeTask);
    }

    if (backup) {
      const backupParsed = JSON.parse(backup);
      if (isValidTaskArray(backupParsed)) return backupParsed.map(normalizeTask);
    }

    return [];
  } catch {
    return [];
  }
};

const remoteToTask = (row: RemoteTaskRow): Task => ({
  id: row.id,
  title: row.title,
  description: row.description ?? undefined,
  category: row.category ?? undefined,
  priority: row.priority,
  dueDate: row.due_date ?? undefined,
  dueTime: row.due_time ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  completedAt: row.completed ? row.updated_at : undefined,
  completed: row.completed,
});

const taskToRemote = (task: Task, userId: string): RemoteTaskRow => ({
  id: task.id,
  user_id: userId,
  title: task.title,
  description: task.description ?? null,
  category: task.category ?? null,
  priority: task.priority,
  due_date: task.dueDate ?? null,
  due_time: task.dueTime ?? null,
  created_at: task.createdAt,
  updated_at: task.updatedAt,
  completed: task.completed,
});

const mergeTasks = (localTasks: Task[], remoteTasks: Task[]): Task[] => {
  const map = new Map<string, Task>();

  localTasks.forEach((task) => map.set(task.id, task));
  remoteTasks.forEach((task) => {
    const local = map.get(task.id);
    if (!local) {
      map.set(task.id, task);
      return;
    }

    const localStamp = new Date(local.updatedAt).getTime();
    const remoteStamp = new Date(task.updatedAt).getTime();
    map.set(task.id, remoteStamp >= localStamp ? task : local);
  });

  return [...map.values()];
};

export const useTasks = (userId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    const local = loadLocalTasks(userId);
    setTasks(local);
    setLoading(true);
    setError(null);

    const client = supabase;

    if (!client) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadRemote = async () => {
      const { data, error: queryError } = await client
        .from(TASKS_TABLE)
        .select('*')
        .eq('user_id', userId);

      if (cancelled) return;

      if (queryError) {
        setError('Görevler yüklenemedi.');
        setLoading(false);
        return;
      }

      const remoteTasks = ((data ?? []) as RemoteTaskRow[]).map(remoteToTask);
      const merged = mergeTasks(local, remoteTasks);
      setTasks(merged);

      if (merged.length > 0) {
        const payload = merged.map((task) => taskToRemote(task, userId));
        const { error: syncError } = await client
          .from(TASKS_TABLE)
          .upsert(payload, { onConflict: 'id' });

        if (syncError) {
          setError('Yerel görevler buluta aktarılırken sorun oluştu.');
        }
      }

      setLoading(false);
    };

    loadRemote();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const serialized = JSON.stringify(tasks);
    localStorage.setItem(storageKey(userId), serialized);
    localStorage.setItem(backupStorageKey(userId), serialized);
  }, [tasks, userId]);

  const pushTask = async (task: Task) => {
    if (!supabase || !userId) return;

    const { error: upsertError } = await supabase
      .from(TASKS_TABLE)
      .upsert(taskToRemote(task, userId), { onConflict: 'id' });

    if (upsertError) {
      setError('Değişiklik buluta kaydedilemedi.');
    } else {
      setError(null);
    }
  };

  const addTask = async (input: TaskInput) => {
    if (!userId) return;

    const now = new Date().toISOString();
    const nextTask: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      category: input.category?.trim() || undefined,
      priority: input.priority,
      dueDate: input.dueDate || undefined,
      dueTime: input.dueTime || undefined,
      createdAt: now,
      updatedAt: now,
      completedAt: undefined,
      completed: false,
    };

    setTasks((prev) => [nextTask, ...prev]);
    await pushTask(nextTask);
  };

  const quickAddTask = async (title: string) => {
    await addTask({ title, priority: 'medium' });
  };

  const updateTask = async (id: string, input: TaskInput) => {
    const now = new Date().toISOString();

    let updated: Task | null = null;

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        updated = {
          ...task,
          title: input.title.trim(),
          description: input.description?.trim() || undefined,
          category: input.category?.trim() || undefined,
          priority: input.priority,
          dueDate: input.dueDate || undefined,
          dueTime: input.dueTime || undefined,
          updatedAt: now,
        };

        return updated;
      })
    );

    if (updated) {
      await pushTask(updated);
    }
  };

  const toggleTask = async (id: string) => {
    const now = new Date().toISOString();

    let updated: Task | null = null;

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const nextCompleted = !task.completed;
        updated = {
          ...task,
          completed: nextCompleted,
          updatedAt: now,
          completedAt: nextCompleted ? now : undefined,
        };
        return updated;
      })
    );

    if (updated) {
      await pushTask(updated);
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    if (!supabase || !userId) return;

    const { error: deleteError } = await supabase
      .from(TASKS_TABLE)
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (deleteError) {
      setError('Görev buluttan silinemedi.');
    } else {
      setError(null);
    }
  };

  const refreshFromCloud = async () => {
    if (!supabase || !userId) return;

    setLoading(true);
    const { data, error: queryError } = await supabase
      .from(TASKS_TABLE)
      .select('*')
      .eq('user_id', userId);

    if (queryError) {
      setError('Görevler yenilenemedi.');
      setLoading(false);
      return;
    }

    const remoteTasks = ((data ?? []) as RemoteTaskRow[]).map(remoteToTask);
    const merged = mergeTasks(tasks, remoteTasks);
    setTasks(merged);

    if (merged.length > 0) {
      const payload = merged.map((task) => taskToRemote(task, userId));
      const { error: syncError } = await supabase
        .from(TASKS_TABLE)
        .upsert(payload, { onConflict: 'id' });

      if (syncError) {
        setError('Yenileme sonrası bulut eşitleme sırasında sorun oluştu.');
        setLoading(false);
        return;
      }
    }

    setError(null);
    setLoading(false);
  };

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100);
  }, [tasks]);

  return {
    tasks,
    addTask,
    quickAddTask,
    updateTask,
    toggleTask,
    deleteTask,
    completionRate,
    loading,
    error,
    refreshFromCloud,
  };
};
