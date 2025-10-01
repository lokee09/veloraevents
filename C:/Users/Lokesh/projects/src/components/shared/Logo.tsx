'use client';
import { useTheme } from '@/context/ThemeContext';
import { Gamepad2, Trophy } from 'lucide-react';

export default function Logo() {
  const { theme } = useTheme();

  if (theme === 'esports') {
    return <Gamepad2 className="h-6 w-6 text-primary" />;
  }
  return <Trophy className="h-6 w-6 text-primary" />;
}
