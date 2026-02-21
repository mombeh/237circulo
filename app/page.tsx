import Link from 'next/link';

export default function LeaderboardPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 lg:p-12 relative z-10">
      <header className="flex justify-between items-center mb-12">
        {/* Left Side: Brand/Title */}
        <div>
          <span className="text-green-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-5 h-[2px] bg-green-primary" /> Monthly Rankings
          </span>
          <h1 className="font-syne text-4xl font-extrabold mt-4">Neighborhoods in Action</h1>
        </div>

        {/* Right Side: Auth Link */}
        <Link
          href="/auth"
          className="px-6 py-2 rounded-full border border-[var(--border)] font-bold text-sm hover:bg-green-primary hover:text-white transition-all shadow-sm"
        >
          Sign In
        </Link>
      </header>

      {/* ... rest of your leaderboard code ... */}
    </main>
  );
}