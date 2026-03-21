import express from 'express'
import {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} from '../controllers/dealsController.js'

const router = express.Router()

// Create a new deal.
// Required body fields: deal_slug, merchant_display_name.
router.post('/', createDeal)

// Get all deals.
// Supported query params: isActive, category, deal_slug, merchant_display_name.
router.get('/', getAllDeals)

// Get a single deal by MongoDB id.
router.get('/:id', getDealById)

// Update a deal by MongoDB id.
// Accepts any Deal schema fields in the request body.
router.put('/:id', updateDeal)

// Delete a deal by MongoDB id.
router.delete('/:id', deleteDeal)

export default router
