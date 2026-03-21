import mongoose from 'mongoose'

const dealSchema = new mongoose.Schema(
  {
    deal_slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxLength: 100,
      minLength: 3,
    },
    merchant_display_name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    merchant_code: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    deal_code: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    is_in_hero: {
      type: Boolean,
      default: false,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_featured_secondary: {
      type: Boolean,
      default: false,
    },
    deal_cashback_percent: {
      type: Number,
      min: 0.1,
      max: 50,
      default: 1,
    },
    deal_pill_text: {
      type: String,
      trim: true,
      maxLength: 30,
    },
    deal_cta_text: {
      type: String,
      enum: ['Get Deal', 'Shop Now'],
      default: 'Get Deal',
    },
    coupon_type: {
      type: String,
      enum: ['$10', '$4', '17%', '20%', '30%'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    category: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
      default: [],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deal_url: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    logo_img_url: {
      type: String,
      trim: true,
    },
    logo_bg_color: {
      type: String,
      trim: true,
    },
    img_thumbnail_url: {
      type: String,
      trim: true,
    },
    img_full_url: {
      type: String,
      trim: true,
    },
    img_mob_url: {
      type: String,
      trim: true,
    },
    deal_copy_desktop: {
      type: String,
      trim: true,
    },
    deal_copy_mob: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Deal', dealSchema)
