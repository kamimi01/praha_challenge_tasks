const express = require("express")
const data = require("./data")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GETリクエスト受けた時、
// {text: hello world}とjsonをHTTPステータス200で返してください
app.get("/", (req, res) => {
  const resBody = data.HelloWorld
  res.status(200).json(resBody)
})

// POSTリクエストを受けた時、
// リクエストbodyに含まれるjsonデータを、レスポンスのbodyに含めて、HTTPステータス201で返してください
app.post("/", (req, res) => {
  const reqBody = req.body
  const actualContentType = req.headers["content-type"]
  const expectedContentType = "application/json"

  // Content-Typeがapplication/json以外の時は、
  // HTTPステータス400を返してください
  if (actualContentType != expectedContentType) {
    const resBody = data.BadRequest
    res.status(400).json(resBody)
    return
  }

  res.status(201).json(reqBody)
})

app.listen(port)
console.log("listen on port: " + port)
