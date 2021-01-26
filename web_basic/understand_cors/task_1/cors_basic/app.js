const express = require("express")
const app = express()

const PORT = 8080
const OTHERPORT = 8000

app.get("/", (req, res)=> {
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(OTHERPORT)
console.log(`Running on http://localhost:${OTHERPORT}`)

app.get("/api", (req, res) => {

  // クッキーを送信する場合、*の値だとエラーになるので、具体的なドメインを指定する
  res.header('Access-Control-Allow-Origin', "http://localhost:8000");
  // クッキーを送信する場合、レスポンスヘッダ として以下を返す必要がある
  res.header("Access-Control-Allow-Credentials", true)

  res.send("Hello World")
})

app.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)