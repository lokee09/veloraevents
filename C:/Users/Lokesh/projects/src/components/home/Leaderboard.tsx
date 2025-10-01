'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useTheme } from '@/context/ThemeContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { LeaderboardEntry } from '@/lib/types';


export function Leaderboard() {
  const { theme } = useTheme();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: LeaderboardEntry[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
        });
        setLeaderboard(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section id="leaderboard" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Leaderboard</h2>
          <p className="text-muted-foreground mt-2">See who is dominating the competition.</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">{theme === 'esports' ? 'Kills' : 'Points'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-10 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24 rounded-md" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto rounded-md" /></TableCell>
                    </TableRow>
                  ))
                ) : leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{entry.team}</TableCell>
                      <TableCell>{entry.player}</TableCell>
                      <TableCell className="text-right font-bold">{entry.score}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No leaderboard data available yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
