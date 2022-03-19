import { Schema } from "mongoose";
import ILogDocument from "./ILogDocument";

const LogSchema = new Schema<ILogDocument>({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        auto: true,
    },
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