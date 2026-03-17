import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'

import dealsRoutes from './src/routes/dealsRoutes.js'

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
    '<body style="background-color: #7FbBFF; font-family: Arial, sans-serif;"><h1 style="color: #15202b; text-align: center;">IQ Smart Deals</h1></body>',
  )
})

app.use('/deals', dealsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is healthy' })
})

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`)
})
