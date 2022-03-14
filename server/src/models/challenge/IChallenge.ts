interface IChallenge {
  id: string;
  name: string;
  description: string;
  rules: string[];
  startDate: Date;
  endDate: Date;
  awards: string[];
  bets: string[];
  participants?: string[];
  owner?: string;
}

export default IChallenge;
