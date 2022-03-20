import IParticipant from "./IParticipant";

type ParticipantDetails = Omit<IParticipant, "id">;
type ParticipantIdentity = Pick<IParticipant, "id">;

export { ParticipantDetails, ParticipantIdentity };
