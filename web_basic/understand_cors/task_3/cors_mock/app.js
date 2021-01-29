const express = require("express")
const staticFileRouter = require("./routes/staticFile")
const app = express()
const PORT = 8000

// x-www-urlencoded、jsonなどのミドルウェアの設定
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// index.html、index.jsなどの静的リソース
app.use("/", staticFileRouter)

app.use("/js", staticFileRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

const cors = require("./middlewares/cors")
const corsApp = express()
const OTHER_PORT = 8080

// cors（corsモジュールは使用せずに実装）のミドルウェアの設定
corsApp.use(cors)

/**
 * TODO：CORS対応のAPIもrouterを使用して、corsApp.use("/simple", corsRequestRouter)のようにしたかったが、
 * 静的ファイルのようにうまくいかなった&時間切れのため、未実装
 */

// シンプルリクエストを受ける
corsApp.post("/simple", (req, res) => {
  const resBody = {
    message: "シンプルリクエストを受け付けた",
  }

  res.json(resBody)
})

// プリフライトリクエストのOPTIONSメソッドでのリクエストを受ける
corsApp.options("/preflight", (req, res) => {
  res.sendStatus(204)
})

// プリフライトリクエストの実際のリクエストを受ける
corsApp.post("/preflight", (req, res) => {
  const resBody = {
    message: "プリフライトリクエストを受け付けた",
  }

  res.json(resBody)
})

corsApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
