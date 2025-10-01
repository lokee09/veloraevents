'use client';
import { Hero } from '@/components/home/Hero';
import { Leaderboard } from '@/components/home/Leaderboard';
import { Tournaments } from '@/components/home/Tournaments';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className={cn('bg-background text-foreground', theme === 'esports' ? 'dark' : '')}>
      <Hero />
      <Tournaments />
      <Leaderboard />
    </div>
  );
}
