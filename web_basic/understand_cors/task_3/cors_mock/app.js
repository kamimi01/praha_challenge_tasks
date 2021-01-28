const express = require("express")
const app = express()
const PORT = 8000
const OTHER_PORT = 8080

// corsの設定
const cors = (req, res, next) => {
  const origin = req.headers.origin
  const ALLOWED_ORIGINS = ["http://localhost:8000"]
  const ALLOWED_METHODS = ["POST", "OPTIONS"]
  const ALLOWED_HEADERS = ["Content-Type"]

  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin)
    res.header("Access-Control-Allow-Methods", ALLOWED_METHODS.join(","))
    res.header("Access-Control-Allow-Headers", ALLOWED_HEADERS.join(","))
  }

  next()
}

// x-www-urlencodedの設定を行う
app.use(express.urlencoded({ extended: true }))
// jsonの設定を行う
app.use(express.json())
// CORSの設定を行う（corsモジュールは使用せずに実装します）
app.use(cors)

// index.htmlを表示する
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// index.jsを実行する
app.get("/js", (req, res) => {
  res.sendFile(__dirname + "/public/index.js")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// プリフライトリクエストのOPTIONSメソッドでのリクエストを受ける
app.options("/preflight", (req, res) => {
  res.sendStatus(204)
})

// シンプルリクエストを受ける
app.post("/simple", (req, res) => {
  const resBody = {
    message: "シンプルリクエストを受け付けた",
  }

  res.json(resBody)
})

// プリフライトリクエストの実際のリクエストを受ける
app.post("/preflight", (req, res) => {
  const resBody = {
    message: "プリフライトリクエストを受け付けた",
  }

  res.json(resBody)
})

app.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
