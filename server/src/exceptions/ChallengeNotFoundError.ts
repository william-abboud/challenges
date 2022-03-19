class ChallengeNotFoundError extends Error {
  constructor(challengeId: string, message = "Challenge not found") {
    super(`${message} with id: ${challengeId}`);

    Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
  }
}

export default ChallengeNotFoundError;
