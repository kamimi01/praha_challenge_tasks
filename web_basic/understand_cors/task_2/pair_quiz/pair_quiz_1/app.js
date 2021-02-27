const express = require("express")
const app = express()
const apiApp = express()
const router = require("./routes/router")
const PORT = 8090
const OTHER_PORT = 8080

// 静的ファイルの提供
app.use(express.static("public"))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// APIの提供
apiApp.use(express.urlencoded({ extended: true }))
apiApp.use(express.json())

apiApp.use("/", router)

apiApp.listen(OTHER_PORT, () => {
  console.log(`listening on port ${OTHER_PORT}`)
})
