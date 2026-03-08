import { CheckCircle2, CircleDashed, ClockAlert, ListTodo, Sun } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  completed: number;
  pending: number;
  today: number;
  overdue: number;
}

const cards = [
  { key: 'total', label: 'Toplam Görev', icon: ListTodo },
  { key: 'completed', label: 'Tamamlanan', icon: CheckCircle2 },
  { key: 'pending', label: 'Bekleyen', icon: CircleDashed },
  { key: 'today', label: 'Bugünün Görevleri', icon: Sun },
  { key: 'overdue', label: 'Geciken', icon: ClockAlert },
] as const;

export const StatsCards = ({ total, completed, pending, today, overdue }: StatsCardsProps) => {
  const map = { total, completed, pending, today, overdue };

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isOverdue = card.key === 'overdue' && overdue > 0;

        return (
          <article
            key={card.key}
            className="animate-softenIn rounded-2xl border border-beige/70 bg-ivory/85 p-4 shadow-soft transition-transform duration-300 ease-calm hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs tracking-[0.18em] text-taupe uppercase">{card.label}</p>
              <Icon size={16} className={isOverdue ? 'text-rose-600' : 'text-gold'} />
            </div>
            <p className={`font-serif text-3xl ${isOverdue ? 'text-rose-700' : 'text-espresso'}`}>{map[card.key]}</p>
          </article>
        );
      })}
    </section>
  );
};
