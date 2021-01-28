const express = require("express")
const app = express()
const PORT = 8000
const OTHER_PORT = 8080

// index.htmlを表示する
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORSの設定を行う
app.use((req, res, next) => {
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
})

// OPTIONSメソッドでのリクエストを受ける
app.options("*", (req, res) => {
  res.sendStatus(204)
})

// シンプルリクエストを受ける
app.post("/simple", (req, res) => {
  const resBody = {
    message: "シンプルリクエストを受け付けた",
  }

  res.json(resBody)
})

app.post("/preflight", (req, res) => {
  const resBody = {
    message: "プリフライトリクエストを受け付けた",
  }

  res.json(resBody)
})

app.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
