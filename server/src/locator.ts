const Locator = {
  UserModel: Symbol.for("UserModel"),
  ChallengeModel: Symbol.for("ChallengeModel"),
  ParticipantModel: Symbol.for("ParticipantModel"),

  UserRepository: Symbol.for("UserRepository"),
  ParticipantRepository: Symbol.for("ParticipantRepository"),
  ChallengeRepository: Symbol.for("ChallengeRepository"),

  UserController: Symbol.for("UserController"),
  ChallengeController: Symbol.for("ChallengeController"),
  ParticipantController: Symbol.for("ParticipantController"),

  UserService: Symbol.for("UserService"),
  ChallengeService: Symbol.for("ChallengeService"),
  ParticipantService: Symbol.for("ParticipantService"),
};

export default Locator;
