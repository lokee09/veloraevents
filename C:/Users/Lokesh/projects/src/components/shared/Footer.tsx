import Link from 'next/link';
import { Twitter, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Logo />
                <span className="font-bold font-headline">Tournament Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate destination for competitive tournaments.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#tournaments" className="text-sm text-muted-foreground hover:text-primary">Tournaments</Link></li>
              <li><Link href="#leaderboard" className="text-sm text-muted-foreground hover:text-primary">Leaderboard</Link></li>
              <li><Link href="/register" className="text-sm text-muted-foreground hover:text-primary">Register</Link></li>
              <li><Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {year} Tournament Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
