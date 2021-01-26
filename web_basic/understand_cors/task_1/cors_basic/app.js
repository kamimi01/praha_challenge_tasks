const express = require("express")
const app = express()

const PORT = 8080
const HOST = "0.0.0.0"
const OTHERPORT = 8000

app.get("/", (req, res)=> {
  console.log("htmlページが表示された")
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(OTHERPORT, HOST)
console.log(`Running on http://${HOST}:${OTHERPORT}`)

app.get("/api", (req, res) => {
  console.log("corsのAPIが呼ばれた")

  // クッキーを送信する場合、*の値だとエラーになるので、具体的なドメインを指定する
  res.header('Access-Control-Allow-Origin', "*");
  // クッキーを送信する場合、レスポンスヘッダ として以下を返す必要がある
  res.header("Access-Control-Allow-Credentials", true)

  res.send("Hello World")
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)