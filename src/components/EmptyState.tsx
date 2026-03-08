import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-beige bg-cream/45 p-10 text-center">
      <Sparkles size={20} className="mx-auto text-gold" />
      <h3 className="mt-4 font-serif text-2xl text-espresso">{title}</h3>
      <p className="mt-2 text-sm text-taupe">{description}</p>
    </div>
  );
};
