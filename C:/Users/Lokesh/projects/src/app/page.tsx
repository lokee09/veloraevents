'use client';
import { Hero } from '@/components/home/Hero';
import { Leaderboard } from '@/components/home/Leaderboard';
import { Tournaments } from '@/components/home/Tournaments';

export default function Home() {
  return (
    <div>
      <Hero />
      <Tournaments />
      <Leaderboard />
    </div>
  );
}
