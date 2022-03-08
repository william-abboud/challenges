import IChallenge from "./IChallenge";

type ChallengeDetails = Omit<IChallenge, "id">;

export { ChallengeDetails };
