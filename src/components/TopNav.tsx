import { LogOut, Plus, RefreshCw, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface TopNavProps {
  search: string;
  onSearch: (value: string) => void;
  onQuickAdd: (title: string) => void;
  onOpenModal: () => void;
  userEmail?: string;
  onLogout: () => void;
  onRefresh: () => void;
}

export const TopNav = ({
  search,
  onSearch,
  onQuickAdd,
  onOpenModal,
  userEmail,
  onLogout,
  onRefresh,
}: TopNavProps) => {
  const [quickTitle, setQuickTitle] = useState('');

  const handleQuickSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!quickTitle.trim()) return;
    void onQuickAdd(quickTitle);
    setQuickTitle('');
  };

  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <Search size={16} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Görev ara"
            className="w-full rounded-2xl border border-beige/80 bg-ivory/80 py-3 pr-4 pl-10 text-sm text-espresso outline-none transition-colors focus:border-gold"
          />
        </label>

        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-espresso px-4 py-3 text-sm font-semibold text-ivory transition-transform duration-300 ease-calm hover:-translate-y-0.5"
        >
          <Plus size={16} /> Yeni Görev
        </button>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-beige bg-ivory/80 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-taupe">Oturum: {userEmail ?? 'Bilinmiyor'}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-xl border border-beige px-3 py-2 text-xs font-semibold text-espresso"
          >
            <RefreshCw size={13} /> Yenile
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-xs font-semibold text-espresso"
          >
            <LogOut size={13} /> Çıkış Yap
          </button>
        </div>
      </div>

      <form onSubmit={handleQuickSubmit} className="flex items-center gap-2 rounded-2xl border border-beige bg-cream/70 p-2">
        <input
          value={quickTitle}
          onChange={(event) => setQuickTitle(event.target.value)}
          placeholder="Hızlı görev ekle"
          className="flex-1 bg-transparent px-2 py-1.5 text-sm text-espresso outline-none placeholder:text-taupe"
        />
        <button
          type="submit"
          className="rounded-xl bg-olive px-3 py-2 text-xs font-semibold tracking-wide text-ivory uppercase transition-colors hover:bg-olive/90"
        >
          Ekle
        </button>
      </form>
    </header>
  );
};
