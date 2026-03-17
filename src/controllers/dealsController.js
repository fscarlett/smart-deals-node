import Deal from '../models/dealModel.js'

// Create a new deal
export const createDeal = async (req, res) => {
  try {
    const {
      title,
      description,
      originalPrice,
      discountedPrice,
      category,
      expiryDate,
      link,
    } = req.body

    if (!title || !originalPrice || !discountedPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, originalPrice, and discountedPrice',
      })
    }

    const discount = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100,
    )

    const newDeal = new Deal({
      title,
      description,
      originalPrice,
      discountedPrice,
      discount,
      category,
      expiryDate,
      link,
    })

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
    const { isActive, category } = req.query

    let filter = {}

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true'
    }

    if (category) {
      filter.category = category
    }

    const deals = await Deal.find(filter).sort({ createdAt: -1 })

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

    const deal = await Deal.findById(id)

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
    const {
      title,
      description,
      originalPrice,
      discountedPrice,
      category,
      expiryDate,
      isActive,
      link,
    } = req.body

    const deal = await Deal.findById(id)

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found',
      })
    }

    if (title) deal.title = title
    if (description) deal.description = description
    if (originalPrice) deal.originalPrice = originalPrice
    if (discountedPrice) deal.discountedPrice = discountedPrice
    if (category) deal.category = category
    if (expiryDate) deal.expiryDate = expiryDate
    if (isActive !== undefined) deal.isActive = isActive
    if (link) deal.link = link

    // Recalculate discount if prices changed
    if (originalPrice || discountedPrice) {
      const origPrice = originalPrice || deal.originalPrice
      const discPrice = discountedPrice || deal.discountedPrice
      deal.discount = Math.round(((origPrice - discPrice) / origPrice) * 100)
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
