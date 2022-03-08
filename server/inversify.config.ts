import { Container } from "inversify";

import Locator from "./src/locator";

import User from "./src/models/user/User";
import Challenge from "./src/models/challenge/Challenge";
import Participant from "./src/models/participant/Participant";

import IUserRepository from "./src/repositories/user/IUserRepository";
import IChallengeRepository from "./src/repositories/challenge/IChallengeRepository";
import IParticipantRepository from "./src/repositories/participant/IParticipantRepository";

import UserRepository from "./src/repositories/user/UserRepository";
import ChallengeRepository from "./src/repositories/challenge/ChallengeRepository";
import ParticipantRepository from "./src/repositories/participant/ParticipantRepository";

import IUserController from "./src/controllers/users/IUserController";
import IChallengesController from "./src/controllers/challenges/IChallengesController";
import IParticipantsController from "./src/controllers/participants/IParticipantsController";

import UserController from "./src/controllers/users/UserController";
import ChallengesController from "./src/controllers/challenges/ChallengesController";
import ParticipantsController from "./src/controllers/participants/ParticipantsController";

import IUserService from "./src/services/user/IUserService";
import IChallengeService from "./src/services/challenge/IChallengeService";
import IParticipantService from "./src/services/participant/IParticipantService";

import UserService from "./src/services/user/UserService";
import ChallengeService from "./src/services/challenge/ChallengeService";
import ParticipantService from "./src/services/participant/ParticipantService";

const container = new Container();

container.bind<typeof User>(Locator.UserModel).toConstantValue(User);
container.bind<typeof Challenge>(Locator.ChallengeModel).toConstantValue(Challenge);
container.bind<typeof Participant>(Locator.ParticipantModel).toConstantValue(Participant);

container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);
container.bind<IChallengeRepository>(Locator.ChallengeRepository).to(ChallengeRepository);
container.bind<IParticipantRepository>(Locator.ParticipantRepository).to(ParticipantRepository);

container.bind<IChallengesController>(Locator.ChallengeController).to(ChallengesController);
container.bind<IUserController>(Locator.UserController).to(UserController);
container.bind<IParticipantsController>(Locator.ParticipantController).to(ParticipantsController);

container.bind<IUserService>(Locator.UserService).to(UserService);
container.bind<IChallengeService>(Locator.ChallengeService).to(ChallengeService);
container.bind<IParticipantService>(Locator.ParticipantService).to(ParticipantService);

export default container;
