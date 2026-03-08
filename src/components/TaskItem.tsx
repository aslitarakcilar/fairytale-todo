import clsx from 'clsx';
import { Check, Circle, Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types/task';
import { formatDueLabel, isTaskOverdue } from '../utils/date';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  high: 'bg-rose-100 text-rose-700 border-rose-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-olive/20 text-olive border-olive/20',
};

export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const overdue = isTaskOverdue(task);
  const timed = Boolean(task.dueDate && task.dueTime);

  return (
    <article
      className={clsx(
        'group rounded-2xl border p-4 shadow-soft transition-all duration-300 ease-calm animate-softenIn',
        task.completed
          ? 'border-beige/60 bg-cream/45 text-taupe'
          : overdue
            ? 'border-rose-300 bg-rose-50/60'
            : 'border-beige/70 bg-ivory/90 hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={clsx(
            'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border transition-transform duration-300 ease-calm',
            task.completed
              ? 'border-olive bg-olive text-ivory scale-105'
              : 'border-taupe/60 text-transparent hover:scale-105 hover:border-olive hover:text-olive'
          )}
        >
          {task.completed ? <Check size={14} /> : <Circle size={12} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3
              className={clsx(
                'font-medium text-espresso',
                task.completed && 'line-through text-taupe/80'
              )}
            >
              {task.title}
            </h3>

            <span className={clsx('rounded-full border px-2 py-0.5 text-xs capitalize', priorityStyles[task.priority])}>
              {task.priority}
            </span>

            <span className="rounded-full bg-beige/50 px-2 py-0.5 text-xs text-espresso/80">
              {timed ? 'Saatli' : 'Saatsiz'}
            </span>

            {task.category && (
              <span className="rounded-full bg-espresso/90 px-2 py-0.5 text-xs text-ivory">{task.category}</span>
            )}
          </div>

          {task.description && <p className="mb-2 text-sm text-charcoal/85">{task.description}</p>}

          <p className={clsx('text-xs', overdue && !task.completed ? 'text-rose-700' : 'text-taupe')}>
            {overdue && !task.completed ? 'Gecikti - ' : ''}
            {formatDueLabel(task)}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-taupe transition-colors hover:bg-cream hover:text-espresso"
            aria-label="Görevi düzenle"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-2 text-taupe transition-colors hover:bg-rose-100 hover:text-rose-700"
            aria-label="Görevi sil"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};
