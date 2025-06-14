import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = mongoose.model('users', userSchema);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export default userModel;
