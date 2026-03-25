export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="relative z-10 grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_460px]">
        <section className="hidden rounded-3xl border border-white/15 bg-white/5 p-8 lg:block">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-200">JIGRIFY</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white">
            Your feed.
            <br />
            Your people.
            <br />
            Your vibe.
          </h2>
          <p className="mt-4 max-w-md text-sm text-slate-300">
            Log in to keep building your identity, sharing your moments, and connecting with your circle.
          </p>
        </section>
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
