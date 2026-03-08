import clsx from 'clsx';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
  parseISO,
  isSameDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Task } from '../types/task';

interface TaskCalendarProps {
  tasks: Task[];
}

export const TaskCalendar = ({ tasks }: TaskCalendarProps) => {
  const [month, setMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  const tasksByDay = useMemo(() => {
    const map = new Map<string, Task[]>();

    tasks.forEach((task) => {
      if (!task.dueDate) return;
      const day = format(parseISO(task.dueDate), 'yyyy-MM-dd');
      map.set(day, [...(map.get(day) ?? []), task]);
    });

    return map;
  }, [tasks]);

  return (
    <section className="rounded-2xl border border-beige/70 bg-ivory/90 p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((prev) => subMonths(prev, 1))}
          className="rounded-lg border border-beige p-2 text-espresso"
        >
          <ChevronLeft size={16} />
        </button>

        <h3 className="font-serif text-2xl text-espresso">{format(month, 'MMMM yyyy')}</h3>

        <button
          type="button"
          onClick={() => setMonth((prev) => addMonths(prev, 1))}
          className="rounded-lg border border-beige p-2 text-espresso"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-taupe">
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const dayTasks = tasksByDay.get(key) ?? [];
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={key}
              className={clsx(
                'min-h-20 rounded-xl border p-2',
                isSameMonth(day, month) ? 'border-beige bg-cream/50' : 'border-beige/40 bg-cream/20 text-taupe/60',
                isToday && 'border-olive bg-ivory'
              )}
            >
              <p className="text-xs font-semibold">{format(day, 'd')}</p>

              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map((task) => (
                  <p key={task.id} className="truncate rounded bg-beige/50 px-1.5 py-0.5 text-[10px] text-espresso">
                    {task.title}
                  </p>
                ))}

                {dayTasks.length > 2 && (
                  <p className="text-[10px] text-taupe">+{dayTasks.length - 2} görev</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
