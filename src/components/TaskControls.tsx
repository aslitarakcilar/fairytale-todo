import { SlidersHorizontal } from 'lucide-react';
import { SortOption, TaskFilters } from '../types/task';

interface TaskControlsProps {
  filters: TaskFilters;
  categories: string[];
  sortBy: SortOption;
  onFilterChange: (next: TaskFilters) => void;
  onSortChange: (value: SortOption) => void;
}

export const TaskControls = ({
  filters,
  categories,
  sortBy,
  onFilterChange,
  onSortChange,
}: TaskControlsProps) => {
  return (
    <section className="rounded-2xl border border-beige/70 bg-ivory/85 p-4 shadow-soft">
      <div className="mb-4 flex items-center gap-2 text-espresso">
        <SlidersHorizontal size={16} />
        <p className="text-sm font-semibold">Filtreler ve Sıralama</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <select
          value={filters.category}
          onChange={(event) => onFilterChange({ ...filters, category: event.target.value })}
          className="rounded-xl border border-beige bg-cream/75 px-3 py-2 text-sm text-espresso outline-none focus:border-gold"
        >
          <option value="all">Tüm Kategoriler</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(event) =>
            onFilterChange({ ...filters, priority: event.target.value as TaskFilters['priority'] })
          }
          className="rounded-xl border border-beige bg-cream/75 px-3 py-2 text-sm text-espresso outline-none focus:border-gold"
        >
          <option value="all">Tüm Öncelikler</option>
          <option value="high">Yüksek</option>
          <option value="medium">Orta</option>
          <option value="low">Düşük</option>
        </select>

        <select
          value={filters.completion}
          onChange={(event) =>
            onFilterChange({ ...filters, completion: event.target.value as TaskFilters['completion'] })
          }
          className="rounded-xl border border-beige bg-cream/75 px-3 py-2 text-sm text-espresso outline-none focus:border-gold"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekleyen</option>
          <option value="completed">Tamamlanan</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="rounded-xl border border-beige bg-cream/75 px-3 py-2 text-sm text-espresso outline-none focus:border-gold"
        >
          <option value="createdAt">Sırala: Oluşturma Tarihi</option>
          <option value="dueDate">Sırala: Bitiş Tarihi</option>
          <option value="priority">Sırala: Öncelik</option>
          <option value="alphabetical">Sırala: Alfabetik</option>
        </select>
      </div>
    </section>
  );
};
