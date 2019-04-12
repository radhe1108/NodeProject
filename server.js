const express = require('express')
const app = express()
const path = require('path')
const { db } = require('./db')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api').route)

const port = process.env.PORT || 7676
db.sync()
  .then(() => {
    app.listen(port)
  })