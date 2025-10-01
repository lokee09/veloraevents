export type Tournament = {
  id: string;
  name: string;
  description: string;
  type: 'esports' | 'sports';
  imageUrl: string;
};

export type LeaderboardEntry = {
  id: string;
  team: string;
  player: string;
  score: number;
};
