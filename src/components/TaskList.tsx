import { Task } from '../types/task';
import { EmptyState } from './EmptyState';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onToggle, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Masa sakin, zihin net"
        description="Bu görünümde görev yok. Akışa devam etmek için görev ekleyebilir veya filtreleri değiştirebilirsin."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
