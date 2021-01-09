const express = require("express")
const app = express()

// x-www-urlencodedをパースする
app.use(express.urlencoded({ extended: true }))

app.post("/", (req, res) => {
  console.log("🚀 ~ file: app.js ~ line 9 ~ app.post ~ req", req)

  const contentType = req.headers["content-type"]
  console.log(
    "🚀 ~ file: app.js ~ line 9 ~ app.post ~ contentType",
    contentType
  )

  const reqBody = req.body
  console.log("🚀 ~ file: app.js ~ line 11 ~ app.post ~ reqBody", reqBody)
})

app.listen(3000)
