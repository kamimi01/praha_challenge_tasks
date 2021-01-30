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

// CORSの設定
const corsOptionsDelegate = function (req, callback) {
  const origin = req.headers.origin
  const ALLOW_ORIGINS = ["http://localhost:8090", "http://localhost:8091"]
  const ALLOW_METHODS = ["PUT", "POST"]
  const ALLOW_HEADERS = ["Content-Type"]
  const OPTIONS_SUCCESS_STATUS = 204

  const allowedOrigin = function () {
    if (ALLOW_ORIGINS.includes(origin)) {
      return origin
    }
    return ""
  }
  console.log(allowedOrigin())

  const corsOptions = {
    origin: allowedOrigin(),
    methods: ALLOW_METHODS.join(","),
    allowedHeaders: ALLOW_HEADERS.join(","),
    optionsSuccessStatus: OPTIONS_SUCCESS_STATUS,
  }

  console.log(corsOptions)
  callback(null, corsOptions)
}

function commonProcess(req, res) {
  console.log(req.method)
  console.log(req.params.id)

  const id = req.params.id
  const resBody = {
    message: `取得したID：${id}`,
  }
  res.json(resBody)
}

// ルーティングの実装は省略しました...!
apiApp.options("/users/:id", cors(corsOptionsDelegate))

apiApp.post("/users/:id", cors(corsOptionsDelegate), (req, res) => {
  commonProcess(req, res)
})

apiApp.put("/users/:id", cors(corsOptionsDelegate), (req, res) => {
  commonProcess(req, res)
})

apiApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
