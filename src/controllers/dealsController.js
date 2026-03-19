import Deal from '../models/dealModel.js'

const ALLOWED_DEAL_FIELDS = [
  'deal_name',
  'deal_slug',
  'deal_merchant_name',
  'merchant_code',
  'deal_code',
  'is_in_hero',
  'is_featured',
  'is_featured_secondary',
  'deal_pill_text',
  'deal_cta_text',
  'coupon_type',
  'description',
  'category',
  'startDate',
  'endDate',
  'isActive',
  'deal_url',
  'logo_img_url',
  'logo_bg_color',
  'img_thumbnail_url',
  'img_full_url',
  'img_mob_url',
  'deal_copy_desktop',
  'deal_copy_mob',
]

const pickDealFields = (source) => {
  const payload = {}

  for (const field of ALLOWED_DEAL_FIELDS) {
    if (source[field] !== undefined) {
      payload[field] = source[field]
    }
  }

  if (payload.category !== undefined && !Array.isArray(payload.category)) {
    payload.category = [payload.category]
  }

  return payload
}

// Create a new deal
export const createDeal = async (req, res) => {
  try {
    const payload = pickDealFields(req.body)

    if (!payload.deal_name || !payload.deal_merchant_name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide deal_name and deal_merchant_name',
      })
    }

    const newDeal = new Deal(payload)

    const savedDeal = await newDeal.save()

    res.status(201).json({
      success: true,
      message: 'Deal created successfully',
      data: savedDeal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating deal',
      error: error.message,
    })
  }
}

// Get all deals
export const getAllDeals = async (req, res) => {
  try {
    const { isActive, category, deal_slug, deal_merchant_name } = req.query

    const filter = {}

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true'
    }

    if (category) {
      filter.category = category
    }

    if (deal_slug) {
      filter.deal_slug = deal_slug
    }

    if (deal_merchant_name) {
      filter.deal_merchant_name = deal_merchant_name
    }

    const deals = await Deal.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: deals,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching deals',
      error: error.message,
    })
  }
}

// Get a single deal by ID
export const getDealById = async (req, res) => {
  try {
    const { id } = req.params

    const deal = await Deal.findById(id).populate('category')

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found',
      })
    }

    res.status(200).json({
      success: true,
      data: deal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching deal',
      error: error.message,
    })
  }
}

// Update a deal
export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params
    const payload = pickDealFields(req.body)

    const deal = await Deal.findById(id)

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found',
      })
    }

    for (const [key, value] of Object.entries(payload)) {
      deal[key] = value
    }

    const updatedDeal = await deal.save()

    res.status(200).json({
      success: true,
      message: 'Deal updated successfully',
      data: updatedDeal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating deal',
      error: error.message,
    })
  }
}

// Delete a deal
export const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params

    const deal = await Deal.findByIdAndDelete(id)

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Deal deleted successfully',
      data: deal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting deal',
      error: error.message,
    })
  }
}
