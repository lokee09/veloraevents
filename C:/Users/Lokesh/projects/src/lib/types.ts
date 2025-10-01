
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

export type Registration = {
  id: string;
  fullName: string;
  ign: string;
  bgmiUid: string;
  teamName: string;
  email: string;
  phone: string;
  transactionId: string;
  screenshotUrl: string;
  createdAt: number;
};
