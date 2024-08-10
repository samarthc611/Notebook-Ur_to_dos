const connecttomongo = require('./db');
const express = require('express')
var cors = require('cors')
connecttomongo();

const app = express()
const port = 5000
app.use(cors())


app.use(express.json())
// Available route
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
}) 