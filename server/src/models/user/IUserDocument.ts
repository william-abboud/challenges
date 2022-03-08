import { Document } from "mongoose";
import IUser from "./IUser";

interface IUserDocument extends Document, Omit<IUser, "id"> {}

export default IUserDocument;
