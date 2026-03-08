import { FormEvent, useState } from 'react';

interface AuthPanelProps {
  authEnabled: boolean;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: string | null }>;
}

export const AuthPanel = ({ authEnabled, onSignIn, onSignUp }: AuthPanelProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!authEnabled) {
      setMessage('Önce Supabase .env ayarlarını yapmalısın.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setMessage('E-posta ve şifre zorunlu.');
      return;
    }

    setPending(true);
    setMessage(null);

    const result =
      mode === 'signin'
        ? await onSignIn(email.trim(), password)
        : await onSignUp(email.trim(), password);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(
        mode === 'signup'
          ? 'Kayıt başarılı. E-posta doğrulaması açıksa kutunu kontrol et.'
          : 'Giriş başarılı.'
      );
    }

    setPending(false);
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-beige bg-ivory/95 p-6 shadow-card">
      <p className="text-xs tracking-[0.24em] text-taupe uppercase">FairyTale To-Do🧚🏻‍♀️⭐️</p>
      <h1 className="mt-2 font-serif text-4xl text-espresso">
        {mode === 'signin' ? 'Giriş Yap' : 'Üye Ol'}
      </h1>
      <p className="mt-2 text-sm text-taupe">Kendi hesabınla giriş yap, sadece kendi görevlerini gör.</p>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-posta"
          className="w-full rounded-xl border border-beige bg-cream/70 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Şifre"
          className="w-full rounded-xl border border-beige bg-cream/70 px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold"
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-espresso px-4 py-2.5 text-sm font-semibold text-ivory disabled:opacity-70"
        >
          {pending ? 'İşleniyor...' : mode === 'signin' ? 'Giriş Yap' : 'Hesap Oluştur'}
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-taupe">{message}</p>}

      <button
        type="button"
        onClick={() => setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))}
        className="mt-4 text-sm text-espresso underline underline-offset-4"
      >
        {mode === 'signin' ? 'Hesabın yok mu? Üye ol' : 'Hesabın var mı? Giriş yap'}
      </button>
    </section>
  );
};
