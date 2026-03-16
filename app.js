import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send(
    '<body style="background-color: #7FbBFF; font-family: Arial, sans-serif;"><h1 style="color: #15202b; text-align: center;">Hello, World!</h1></body>',
  )
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
