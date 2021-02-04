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

apiApp.use(express.urlencoded({ extended: true }))
apiApp.use(express.json())

function showCurDate() {
  // 現在時刻を出力
  const curDate = new Date()
  console.log(curDate)
}

apiApp.get("/use_cache", (req, res) => {
  showCurDate()
  // プライベートだが、ブラウザキャッシュには保存される。
  // （共有キャッシュへの保存は許可されない→nginxやcloud frontで確認必要）
  // 期限を10秒に設定
  // res.header("cache-control", "private, max-age=20")
  res.header("cache-control", "no-transform")
  // res.header("cache-control", "no-cache")

  // 現在時刻を取得
  const currentDate = new Date()
  // 現在時刻から10秒追加
  currentDate.setSeconds(currentDate.getSeconds() + 10)
  // 15秒後にブラウザをリフレッシュしたが、まだキャッシュが効いていたため、expiresヘッダの設定は無視されていることがわかった
  // cache-control:no-transformの場合は、expiresが優先されるはずだが、最初の10s以外は効いていたが、そのあとは10s以内でも304 でサーバまで来ていた
  res.header("Expires", currentDate)

  res.sendFile(__dirname + "/image/dog.png")

  console.log("GET /use_cache")
})

apiApp.get("/use_cache_vary", (req, res) => {
  showCurDate()
  const langList = req.headers["accept-language"].split(",")
  const primaryLang = langList[0]
  console.log(primaryLang)

  const resBody = () => {
    switch (primaryLang) {
      case "ja":
        return { language: "ja" }
      case "en":
        return { language: "en" }
      default:
        return { language: "others" }
    }
  }

  // 期限を30秒に設定（jaとen版を確認したいので、長めに、、）
  res.header("cache-control", "max-age=30")
  // Chromeの設定から、言語の優先度を日本語と英語で入れ替えて実験
  res.header("vary", "accept-language")

  res.header("Access-Control-Allow-Origin", "*")

  res.json(resBody())

  console.log("GET /use_cache_vary")
})

apiApp.get("/nouse_cache", (req, res) => {
  showCurDate()
  // キャッシュを行わない
  res.header("cache-control", "no-store")
  res.sendFile(__dirname + "/image/cat.png")

  console.log("GET /nouse_cache")
})

apiApp.listen(PORT_API, () => {
  console.log(`listening on http://localhost:${PORT_API}`)
})
