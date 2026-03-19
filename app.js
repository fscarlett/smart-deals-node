import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'

import dealsRoutes from './src/routes/dealsRoutes.js'
import categoriesRoutes from './src/routes/categoriesRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.send(
    '<body style="background-color: #7FbBFF; font-family: Arial, sans-serif;"><p style="color: #15202b; text-align: center;">IQ Smart Deals</p></body>',
  )
})

app.use('/api/v1/deals', dealsRoutes)
app.use('/api/v1/categories', categoriesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(), // Uptime in seconds
    timestamp: Date.now(),
  })
})

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`)
})
