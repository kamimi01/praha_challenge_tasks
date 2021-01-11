/**
 * @file 課題3：リクエストをパースするWEBサーバを作ってみる
 */

const express = require("express")
const data = require("./data")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * @namespace
 * Hello-World-200
 *
 * @description
 * <li>GETリクエスト受けた時、{text: hello world}とjsonをHTTPステータス200で返す</li>
 */
app.get("/", (req, res) => {
  const resBody = data.HelloWorld
  res.status(200).json(resBody)
})

/**
 * @namespace
 * Name-Hoge-201 / Name-Hoge-400
 *
 * @description
 * <li>POSTリクエストを受けた時、リクエストbodyに含まれるjsonデータを、レスポンスのbodyに含めて、HTTPステータス201で返す</li>
 * <li>GContent-Typeがapplication/json以外の時は、HTTPステータス400を返す</li>
 */
app.post("/", (req, res) => {
  const reqBody = req.body
  const expectedContentType = "application/json"

  if (req.is(expectedContentType)) {
    res.status(201).json(reqBody)
    return
  }

  const resBody = data.BadRequest

  res.status(400).json(resBody)
})

app.listen(port)
console.log("listen on port: " + port)
