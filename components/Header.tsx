import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
          They Played For Both &nbsp;
          </Link>
          <span className="text-xs italic text-zinc-600 dark:text-zinc-300">
            &quot;He played for them? No way!&quot;
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            Home
          </Link>
          <Link
            href="https://github.com/sam11385/they-played-for-both"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}
