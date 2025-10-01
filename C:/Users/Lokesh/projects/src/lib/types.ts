export type Tournament = {
    id: string;
    name: string;
    description: string;
    type: 'esports' | 'sports';
  };
  
  export type LeaderboardEntry = {
    id: string;
    team: string;
    player: string;
    score: number;
  };
  