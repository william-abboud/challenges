import mongoose from "mongoose";

const configureDb = () => {
  mongoose.set("runValidators", true);

  mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  });

  mongoose.set("toObject", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  });
};

export default configureDb;
