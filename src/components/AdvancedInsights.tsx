interface TrendPoint {
  label: string;
  count: number;
}

interface AdvancedInsightsProps {
  streak: number;
  trend: TrendPoint[];
  focusHour: string;
}

export const AdvancedInsights = ({ streak, trend, focusHour }: AdvancedInsightsProps) => {
  const max = Math.max(1, ...trend.map((item) => item.count));
  const weeklyTotal = trend.reduce((total, item) => total + item.count, 0);

  return (
    <section className="grid gap-3 lg:grid-cols-3">
      <article className="rounded-2xl border border-beige/70 bg-ivory/85 p-4 shadow-soft">
        <p className="text-xs tracking-[0.18em] text-taupe uppercase">Tamamlama Serisi</p>
        <p className="mt-3 font-serif text-4xl text-espresso">{streak}</p>
        <p className="text-sm text-taupe">Günlük ardışık tamamlanan gün</p>
      </article>

      <article className="rounded-2xl border border-beige/70 bg-ivory/85 p-4 shadow-soft lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs tracking-[0.18em] text-taupe uppercase">7 Günlük Tamamlanma Trendi</p>
          <p className="text-xs text-espresso">Toplam: {weeklyTotal}</p>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {trend.map((item) => (
            <div key={item.label} className="space-y-1 text-center">
              <div className="mx-auto flex h-20 w-full max-w-9 items-end rounded-md bg-cream/70">
                <div
                  className="w-full rounded-md bg-olive transition-all duration-300"
                  style={{ height: `${Math.max(8, (item.count / max) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-taupe">{item.label}</p>
              <p className="text-[11px] text-espresso">{item.count}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-beige/70 bg-cream/60 p-4 shadow-soft">
        <p className="text-xs tracking-[0.18em] text-taupe uppercase">Odak Saati</p>
        <p className="mt-3 font-serif text-3xl text-espresso">{focusHour}</p>
        <p className="text-sm text-taupe">Görev yoğunluğunun en yüksek olduğu saat</p>
      </article>
    </section>
  );
};
