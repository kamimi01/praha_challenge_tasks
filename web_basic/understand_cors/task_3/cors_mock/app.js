const express = require("express")
const staticFileRouter = require("./routes/staticFile")
const app = express()
const PORT = 8000

// x-www-urlencoded、jsonなどのミドルウェアの設定
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// index.html、index.jsなどの静的リソースへのルーティング
app.use("/", staticFileRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

const cors = require("./middlewares/cors")
const corsApp = express()
const corsRequestRouter = require("./routes/corsRequest")
const OTHER_PORT = 8080

// CORS（corsモジュールは使用せずに実装）のミドルウェアの設定
corsApp.use(cors)

// CORS設定APIへのルーティング
corsApp.use("/", corsRequestRouter)

corsApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
