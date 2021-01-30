const express = require("express")
const app = express()
const apiApp = express()
const cors = require("cors")
const PORT = 8090
const OTHER_PORT = 8080

// 静的ファイルの提供
app.use(express.static("public"))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

apiApp.use(express.urlencoded({ extended: true }))
apiApp.use(express.json())

const corsOptions = {
  "origin": "*",
  // "methods": "PUT, POST",
  // "allowedHeaders": "Content-Type",
  // "optionsSuccessStatus": 204
}

apiApp.post("/users/:id", cors(corsOptions), (req, res) => {
  console.log("受けた")
  console.log(req.params.id)
  const resBody = {
    message: "受け付けた",
  }
  res.json(resBody)
})

apiApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
