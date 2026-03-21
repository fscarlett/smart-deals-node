import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category_display_name: {
      type: String,
      required: true,
      trim: true,
    },
    category_order: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      default: 500,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Category', categorySchema)
