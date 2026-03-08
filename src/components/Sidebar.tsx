import clsx from 'clsx';
import {
  CalendarDays,
  CalendarRange,
  CheckCheck,
  Clock3,
  LayoutDashboard,
  ListChecks,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import { TaskView } from '../types/task';

interface SidebarProps {
  activeView: TaskView;
  onChangeView: (view: TaskView) => void;
  counts: Record<TaskView, number>;
}

const items: Array<{ key: TaskView; label: string; icon: LucideIcon }> = [
  { key: 'all', label: 'Tüm Görevler', icon: ListChecks },
  { key: 'today', label: 'Bugün', icon: CalendarDays },
  { key: 'upcoming', label: 'Yaklaşan', icon: Clock3 },
  { key: 'calendar', label: 'Takvim', icon: CalendarRange },
  { key: 'completed', label: 'Tamamlanan', icon: CheckCheck },
  { key: 'overdue', label: 'Geciken', icon: TriangleAlert },
];

export const Sidebar = ({ activeView, onChangeView, counts }: SidebarProps) => {
  return (
    <aside className="w-full rounded-3xl border border-beige/70 bg-ivory/95 p-5 shadow-card">
      <div className="mb-4 flex items-center gap-3 text-espresso">
        <LayoutDashboard size={22} className="text-gold" />
        <div>
          <p className="font-serif text-2xl leading-none">FairyTale To-Do🧚🏻‍♀️⭐️</p>
          <p className="text-xs tracking-[0.22em] text-taupe uppercase">Kişisel Takip Alanı</p>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.key === activeView;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeView(item.key)}
              className={clsx(
                'flex min-w-max items-center gap-2 rounded-2xl px-3 py-2.5 text-sm transition-all duration-300 ease-calm',
                active
                  ? 'bg-espresso text-ivory shadow-soft'
                  : 'text-espresso/85 hover:bg-cream/70 hover:text-espresso'
              )}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                {item.label}
              </span>
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-xs',
                  active ? 'bg-ivory/20' : 'bg-beige/60 text-espresso/80'
                )}
              >
                {counts[item.key]}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
