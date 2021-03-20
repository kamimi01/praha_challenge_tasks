const express = require("express")
const cors = require("cors")
const app = express()
const appApi = express()
const PORT = 8000
const OTHER_PORT = 8080

app.use(express.static("public"))

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

const corsOptions = {
  origin: "http://localhost:49763",
  credentials: true
}

appApi.use(cors(corsOptions))

appApi.get("/", (req, res) => {
  res.cookie("name", "hoge")
  console.log("fetchのCORSテスト成功")
  res.sendFile(__dirname + "/image/dog.png")
})

appApi.listen(OTHER_PORT, () => {
  console.log(`listening on http://localhost:${OTHER_PORT}`)
})
