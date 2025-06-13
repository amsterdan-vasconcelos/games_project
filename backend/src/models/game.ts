import mongoose from 'mongoose';

const gamesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image_url: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    platform: {
      type: String,
    },
    status: {
      type: String,
      enum: ['playing', 'done', 'abandoned'],
      require: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    acquisition_date: {
      type: Date,
      require: true,
    },
    finish_date: {
      type: Date,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
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

const gamesModel = mongoose.model('games', gamesSchema);

export default gamesModel;
