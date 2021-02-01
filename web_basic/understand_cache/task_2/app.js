const { static } = require("express")
const express = require("express")
const app = express()
const apiApp = express()
const PORT = 8000
const PORT_API = 8080

app.use(express.static("./public"))

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

function showCurDate() {
  // 現在時刻を出力
  const curDate = new Date()
  console.log(curDate)
}

apiApp.get("/use_cache", (req, res) => {
  showCurDate()
  // 期限を10秒に設定
  res.header("cache-control", "max-age=10")
  res.sendFile(__dirname + "/image/dog.png")

  console.log("サーバにdog画像のデータを取得しにきた")
})

apiApp.get("/nouse_cache", (req, res) => {
  showCurDate()
  // キャッシュを行わない
  res.header("cache-control", "no-store")
  res.sendFile(__dirname + "/image/cat.png")

  console.log("サーバにcat画像のデータを取得しにきた")
})

apiApp.listen(PORT_API, () => {
  console.log(`listening on http://localhost:${PORT_API}`)
})
