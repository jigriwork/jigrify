import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-wide">
          <span className="gradient-text">JIGRIFY</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/#features" className="hover:text-white">
            Features
          </Link>
          <Link href="/app/home" className="hover:text-white">
            Demo
          </Link>
          <Link href="/auth/login" className="hover:text-white">
            Login
          </Link>
        </div>
        <Link href="/auth/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
