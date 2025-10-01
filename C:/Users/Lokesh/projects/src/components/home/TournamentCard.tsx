'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import type { Tournament } from '@/lib/types';
import Image from 'next/image';

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const { theme } = useTheme();
  
  return (
    <Card className="flex flex-col transition-all duration-300 transform hover:scale-105 hover:border-primary/50 overflow-hidden">
       <CardHeader className="p-0">
        {tournament.imageUrl && (
            <div className="relative h-48 w-full">
                <Image 
                    src={tournament.imageUrl}
                    alt={tournament.name}
                    fill
                    className="object-cover"
                />
            </div>
        )}
        <div className="p-6">
            <CardTitle>{tournament.name}</CardTitle>
            <CardDescription className="pt-2 h-24 overflow-auto">
                {tournament.description}
            </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between p-6">
        <Button variant="outline">View Details</Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
