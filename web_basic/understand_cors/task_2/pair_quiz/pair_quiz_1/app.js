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

// APIの提供
apiApp.use(express.urlencoded({ extended: true }))
apiApp.use(express.json())

const corsOptions = {
  origin: "http://localhost:8090",
  methods: "PUT, POST",
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: 204,
}

function commonProcess(req, res) {
  console.log(req.params.id)
  console.log(req.headers.origin)

  const id = req.params.id
  const resBody = {
    message: `取得したID：${id}`,
  }
  res.json(resBody)
}

apiApp.options("/users/:id", cors(corsOptions))

apiApp.post("/users/:id", cors(corsOptions), (req, res) => {
  commonProcess(req, res)
})

apiApp.put("/users/:id", cors(corsOptions), (req, res) => {
  commonProcess(req, res)
})

apiApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
