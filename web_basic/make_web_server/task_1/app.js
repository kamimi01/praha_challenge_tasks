const express = require("express")
const data = require("./data")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * GET "/"
 * Hello-World-200（POSTMANのリクエスト名）
 *
 * @description
 * GETリクエスト受けた時、{text: hello world}とjsonをHTTPステータス200で返す
 * 
 * @return {"text": "hello world"}
 */
app.get("/", (req, res) => {
  const resBody = data.HelloWorld
  res.status(200).json(resBody)
})

/**
 * POST "/"
 * Name-Hoge-201
 * Name-Hoge-400
 *
 * @description
 * POSTリクエストを受けた時、リクエストbodyに含まれるjsonデータを、レスポンスのbodyに含めて、HTTPステータス201で返す
 * Content-Typeがapplication/json以外の時は、HTTPステータス400を返す
 * 
 * @param {Object} req
 * @return {Object} json
 */
app.post("/", (req, res) => {
  const reqBody = req.body
  const actualContentType = req.headers["content-type"]
  const expectedContentType = "application/json"

  if (actualContentType != expectedContentType) {
    const resBody = data.BadRequest
    res.status(400).json(resBody)
    return
  }

  res.status(201).json(reqBody)
})

app.listen(port)
console.log("listen on port: " + port)
