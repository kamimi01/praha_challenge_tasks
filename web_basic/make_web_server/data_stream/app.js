const express = require("express")
const app = express()

// メソッドにかかわらず実行する場合は、allを使用する
app.all("/", (req, res) => {
  let body = ""
  console.log(req.method)
  console.log(req.url)
  console.log(JSON.stringify(req.headers))

  req.on("data", (chunk) => {
    console.log(chunk)
    body += chunk
    console.log(body)
  })
  req.on("end", () => {
    console.log(body)
  })
  res.send("OK")
})

app.listen(3000)