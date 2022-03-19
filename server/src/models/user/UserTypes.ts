import IUser from "./IUser";

type NewUserDetails = Omit<IUser, "id" | "passwordHash"> & { password: string };
type NewUserDetailsDBReady = Omit<IUser, "id">;
type UserDetails = Omit<IUser, "passwordHash">;
type UserSafeDetails = Omit<UserDetails, "email">;
type UserLoginDetails = Pick<IUser, "email"> & { password: string };
type UserIdentity = Pick<IUser, "id">;

export { NewUserDetails, NewUserDetailsDBReady, UserDetails, UserLoginDetails, UserIdentity, UserSafeDetails };
