import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: { 
      type: String 
    },
    company: { 
      type: String 
    },
    acquisition_year: { 
      type: Date 
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

const Platform = mongoose.model('platforms', platformSchema);

export default Platform;
