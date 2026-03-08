interface ProgressWidgetProps {
  completionRate: number;
  focusText: string;
}

export const ProgressWidget = ({ completionRate, focusText }: ProgressWidgetProps) => {
  return (
    <section className="grid gap-3 lg:grid-cols-[220px_1fr]">
      <article className="rounded-2xl border border-beige/70 bg-ivory/85 p-5 shadow-soft">
        <p className="text-xs tracking-[0.18em] text-taupe uppercase">Tamamlanma</p>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-beige/60">
          <div
            className="h-full rounded-full bg-olive transition-all duration-500 ease-calm"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="mt-3 font-serif text-3xl text-espresso">{completionRate}%</p>
      </article>

      <article className="rounded-2xl border border-beige/70 bg-cream/70 p-5 shadow-soft">
        <p className="text-xs tracking-[0.18em] text-taupe uppercase">Günün Odağı</p>
        <p className="mt-4 max-w-2xl font-serif text-2xl text-charcoal">{focusText}</p>
      </article>
    </section>
  );
};
