import { FormEvent, useEffect, useState } from 'react';
import { Task, TaskInput } from '../types/task';

interface TaskModalProps {
  open: boolean;
  task?: Task;
  onClose: () => void;
  onSubmit: (input: TaskInput) => void;
}

const initialState: TaskInput = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
  dueDate: '',
  dueTime: '',
};

export const TaskModal = ({ open, task, onClose, onSubmit }: TaskModalProps) => {
  const [form, setForm] = useState<TaskInput>(initialState);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || '',
        category: task.category || '',
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        dueTime: task.dueTime || '',
      });
      return;
    }

    setForm(initialState);
  }, [task, open]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/40 p-4 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-3xl border border-beige bg-ivory p-6 shadow-card animate-softenIn"
      >
        <h2 className="font-serif text-3xl text-espresso">{task ? 'Görevi Düzenle' : 'Görev Oluştur'}</h2>
        <p className="mt-1 text-sm text-taupe">Sıradaki adımını net ve düzenli şekilde planla.</p>

        <div className="mt-5 space-y-3">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Görev başlığı"
            required
            className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
          />

          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={3}
            placeholder="Açıklama (isteğe bağlı)"
            className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
          />

          <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                placeholder="Kategori / etiket"
                className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
              />

            <select
              value={form.priority}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, priority: event.target.value as TaskInput['priority'] }))
              }
              className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
            >
              <option value="high">Yüksek öncelik</option>
              <option value="medium">Orta öncelik</option>
              <option value="low">Düşük öncelik</option>
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
              type="date"
              className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
            />

            <input
              value={form.dueTime}
              onChange={(event) => setForm((prev) => ({ ...prev, dueTime: event.target.value }))}
              type="time"
              className="w-full rounded-xl border border-beige bg-cream/65 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-beige px-4 py-2 text-sm text-espresso"
          >
            Vazgeç
          </button>
          <button type="submit" className="rounded-xl bg-espresso px-4 py-2 text-sm text-ivory">
            {task ? 'Değişiklikleri Kaydet' : 'Görev Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
};
