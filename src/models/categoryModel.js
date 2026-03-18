import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
    },
    category_slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    img_url: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Category', categorySchema)
