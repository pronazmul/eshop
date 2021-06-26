//External Modules:
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const colors = require('colors')

// Internal Modules:
const {
  notFoundHandler,
  errorHandler,
} = require('./middleware/common/errorHandler')
const productRouter = require('./router/productRouter')
const mongoConnection = require('./config/db')

// Configuration
const app = express()
dotenv.config()

// MongoDB Connection:
mongoConnection()

// Request Parser
app.use(express.json())

// Cookie Signed-Cookie Parser:
app.use(cookieParser(process.env.COOKIE_SECRET))

// Application Routing:
app.use('/api/products', productRouter)

// Not Found Handler:
app.use(notFoundHandler)

// Error Handler:
app.use(errorHandler)

// Server Listener:
app.listen(process.env.PORT, () =>
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode in port: ${process.env.PORT} `
      .rainbow.bold
  )
)
