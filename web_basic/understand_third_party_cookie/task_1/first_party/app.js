const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8000

app.use(cookieParser())

app.get("/", (req, res) => {
  // set-cookieに付与される
  res.cookie("first_party", "hoge", {
    httpOnly: true,
  })
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
