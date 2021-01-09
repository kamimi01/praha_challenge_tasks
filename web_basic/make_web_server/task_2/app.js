const express = require("express")
const app = express()
// メソッドを_methodの値で上書きするミドルウェア
const methodOverride = require("method-override")

// x-www-urlencodedをパースする
app.use(express.urlencoded({ extended: true }))

// キー(_method)を指定する
app.use(methodOverride("_method"))

app.put("/", (req, res) => {
  console.log("受け取ったメソッド：", req.method)

  const contentType = req.headers["content-type"]
  console.log("リクエストのContent-Type：", contentType)

  const reqBody = req.body
  console.log("リクエストボディ：", reqBody)
})

app.listen(3000)
