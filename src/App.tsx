import { useMemo, useState } from 'react';
import { AuthPanel } from './components/AuthPanel';
import { Sidebar } from './components/Sidebar';
import { ProgressWidget } from './components/ProgressWidget';
import { StatsCards } from './components/StatsCards';
import { TaskControls } from './components/TaskControls';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { TopNav } from './components/TopNav';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { SortOption, Task, TaskFilters, TaskInput, TaskView } from './types/task';
import {
  applySearch,
  applyTaskFilters,
  categoriesFromTasks,
  filterByView,
  getTaskStats,
  sortTasks,
} from './utils/task';

const initialFilters: TaskFilters = {
  category: 'all',
  priority: 'all',
  completion: 'all',
};

const viewTitles: Record<TaskView, string> = {
  all: 'Tüm Görevler',
  today: 'Bugün',
  upcoming: 'Yaklaşan',
  completed: 'Tamamlanan',
  overdue: 'Geciken',
};

function App() {
  const { user, loading: authLoading, authEnabled, signIn, signUp, signOut } = useAuth();

  const {
    tasks,
    addTask,
    quickAddTask,
    updateTask,
    toggleTask,
    deleteTask,
    completionRate,
    loading: tasksLoading,
    error: tasksError,
    refreshFromCloud,
  } = useTasks(user?.id);

  const [view, setView] = useState<TaskView>('all');
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const countsByView = useMemo<Record<TaskView, number>>(
    () => ({
      all: filterByView(tasks, 'all').length,
      today: filterByView(tasks, 'today').length,
      upcoming: filterByView(tasks, 'upcoming').length,
      completed: filterByView(tasks, 'completed').length,
      overdue: filterByView(tasks, 'overdue').length,
    }),
    [tasks]
  );

  const categories = useMemo(() => categoriesFromTasks(tasks), [tasks]);

  const visibleTasks = useMemo(() => {
    const byView = filterByView(tasks, view);
    const byFilters = applyTaskFilters(byView, filters);
    const bySearch = applySearch(byFilters, search);
    return sortTasks(bySearch, sortBy);
  }, [tasks, view, filters, search, sortBy]);

  const focusText = useMemo(() => {
    const candidate = sortTasks(
      tasks.filter((task) => !task.completed),
      'priority'
    )[0];

    if (!candidate) return 'Bekleyen görev kalmadı. Tempoyu koruyup sakinliğin keyfini çıkar.';
    return `${candidate.title} görevi bugünün ana odağı olmalı.`;
  }, [tasks]);

  const openCreate = () => {
    setEditingTask(undefined);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSubmit = (input: TaskInput) => {
    if (editingTask) {
      void updateTask(editingTask.id, input);
      return;
    }

    void addTask(input);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f7f4_45%,#efeee9_100%)]">
        <p className="text-sm text-taupe">Oturum yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f7f4_45%,#efeee9_100%)] px-4">
        <AuthPanel authEnabled={authEnabled} onSignIn={signIn} onSignUp={signUp} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f7f4_45%,#efeee9_100%)] px-4 py-6 text-charcoal sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <Sidebar activeView={view} onChangeView={setView} counts={countsByView} />

        <main className="space-y-5 rounded-3xl border border-beige/60 bg-cream/35 p-4 shadow-soft sm:p-6">
          <TopNav
            search={search}
            onSearch={setSearch}
            onQuickAdd={(title) => quickAddTask(title)}
            onOpenModal={openCreate}
            userEmail={user.email}
            onLogout={() => {
              void signOut();
            }}
            onRefresh={() => {
              void refreshFromCloud();
            }}
          />

          {tasksError && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
              {tasksError}
            </p>
          )}

          {tasksLoading && (
            <p className="text-xs text-taupe">Görevler buluttan yükleniyor...</p>
          )}

          <section className="space-y-4">
            <div>
              <p className="text-xs tracking-[0.2em] text-taupe uppercase">
                {view === 'all' ? 'Panel' : 'Görünüm'}
              </p>
              <h1 className="font-serif text-4xl text-espresso">{viewTitles[view]}</h1>
            </div>

            {view === 'all' && (
              <>
                <StatsCards
                  total={stats.total}
                  completed={stats.completed}
                  pending={stats.pending}
                  today={stats.today}
                  overdue={stats.overdue}
                />

                <ProgressWidget completionRate={completionRate} focusText={focusText} />
              </>
            )}
          </section>

          <TaskControls
            filters={filters}
            categories={categories}
            sortBy={sortBy}
            onFilterChange={setFilters}
            onSortChange={setSortBy}
          />

          <TaskList tasks={visibleTasks} onToggle={(id) => void toggleTask(id)} onEdit={openEdit} onDelete={(id) => void deleteTask(id)} />
        </main>
      </div>

      <TaskModal
        open={modalOpen}
        task={editingTask}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default App;
