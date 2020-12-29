// ライブラリの読み込み
const express    = require("express")
const app        = express()
const bodyParser = require("body-parser")

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// 3000ポートにする
const port = process.env.PORT || 3000

// CORSを許可していないGETのAPI
app.get("/api/v1/ng_cors", function(req, res) {
  res.json({
    message: "CORS許可してないよ"
  })

  console.log("req.headers.origin: " + req.headers.origin)
})

// CORSを許可しているGETのAPI
app.get("/api/v1/ok_cors", function(req, res) {
  // CORSを許可する（corsモジュールを使用するとより簡潔な記載になる）
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);

  res.json({
    message: "CORS許可してるよ"
  })

  console.log("req.headers.origin: " + req.headers.origin)
})

// サーバ起動
app.listen(port)
console.log("listen on port: " + port)