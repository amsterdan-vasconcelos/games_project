import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel;
