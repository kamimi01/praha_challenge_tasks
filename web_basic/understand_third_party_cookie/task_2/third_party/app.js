const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 3000

app.use(cookieParser())

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.cookie("third_party", "fuga", {
    httpOnly: true,
  })
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
})