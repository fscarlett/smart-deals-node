import express from 'express'
import {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} from '../controllers/dealsController.js'

const router = express.Router()

// Create a new deal
router.post('/', createDeal)

// Get all deals
router.get('/', getAllDeals)

// Get a single deal by ID
router.get('/:id', getDealById)

// Update a deal
router.put('/:id', updateDeal)

// Delete a deal
router.delete('/:id', deleteDeal)

export default router
