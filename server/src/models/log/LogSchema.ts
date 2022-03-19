import { Schema } from "mongoose";
import ILogDocument from "./ILogDocument";

const LogSchema = new Schema<ILogDocument>({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export default LogSchema;