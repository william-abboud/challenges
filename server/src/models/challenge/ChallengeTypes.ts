import IChallenge from "./IChallenge";

type ChallengeDetails = Omit<IChallenge, "id">;
type ChallengeIdentity = Pick<IChallenge, "id">;

export { ChallengeDetails, ChallengeIdentity };
