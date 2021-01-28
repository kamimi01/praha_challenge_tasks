const express = require("express")
const app = express()
const staticFileRouter = require("./routes/staticFile")
const cors = require("./middlewares/cors")
const PORT = 8000
const OTHER_PORT = 8080

// x-www-urlencoded、json、cors（corsモジュールは使用せずに実装）などのミドルウェアの設定
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors)

// index.html、index.jsなどの静的リソース
app.use("/", staticFileRouter)

app.use("/js", staticFileRouter)

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
