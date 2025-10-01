'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TournamentCardProps {
  tournament: {
    id: string;
    name: string;
    description: string;
    type: 'esports' | 'sports';
  };
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const { theme } = useTheme();
  return (
    <Card className="flex flex-col transition-all duration-300 transform hover:scale-105 hover:border-primary/50">
      <CardHeader>
        <CardTitle>{tournament.name}</CardTitle>
        <CardDescription
          className={cn(
            'h-24 overflow-hidden',
            theme === 'esports' ? 'text-slate-400' : 'text-gray-600'
          )}
        >
          {tournament.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
