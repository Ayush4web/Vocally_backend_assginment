require('dotenv').config()
require('express-async-errors')

const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const BadRequest = require('./errors/BadRequest')

// middlewares
const customErrorHandler = require('./middleware/customErrorHandler')
const notfound = require('./middleware/Notfound')
const auth = require('./middleware/auth')

// swagger 
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

// rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// router
const libraryRouter = require('./routes/libraryRoutes')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const port = process.env.PORT || 5000

// routes

app.get('/', (req, res) => {
  // signing jwt
  const token = jwt.sign({ data: 'test' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  // since we do not have any frontend for this project we  are not using cookies
  //  rather sending token directly as response (Not ideal) just for making testing easy

  res.status(200).json({
    msg: 'Hey, welcome to the vocally backend assginment!',
    api_docs:'/api-docs',
    token: token,
  })
})

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))

app.use('/api/v1', auth, libraryRouter)

app.use(customErrorHandler)
app.use(notfound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port: ${port}...`)
    )
  } catch (error) {
    throw new BadRequest('Cannot Connect to db')
  }
}
start()
