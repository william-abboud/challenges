import IParticipant from "./IParticipant";

type ParticipantDetails = Omit<IParticipant, "id">;

export { ParticipantDetails };
