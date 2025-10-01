'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useTheme } from '@/context/ThemeContext';
import { TournamentCard } from './TournamentCard';
import { Skeleton } from '../ui/skeleton';
import type { Tournament } from '@/lib/types';


export function Tournaments() {
  const { theme } = useTheme();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'tournaments'), where('type', '==', theme));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: Tournament[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Tournament);
        });
        setTournaments(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching tournaments:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [theme]);

  return (
    <section id="tournaments" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Upcoming Tournaments</h2>
          <p className="text-muted-foreground mt-2">Find your next challenge. The arena awaits.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))
          ) : tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No upcoming {theme} tournaments. Check back soon!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
