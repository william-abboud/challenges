class UserAlreadyParticipantInChallengeError extends Error {
  constructor(message = "User is already participating in this challenge") {
    super(message);

    Object.setPrototypeOf(this, UserAlreadyParticipantInChallengeError.prototype);
  }
}

export default UserAlreadyParticipantInChallengeError;
