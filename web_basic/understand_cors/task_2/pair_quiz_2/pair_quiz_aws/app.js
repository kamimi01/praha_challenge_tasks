const express = require("express")
const app = express()
const otherApp = express()
const PORT = 8000
const OTHER_PORT = 8080

app.use(express.static("public"))

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

otherApp.use(express.static("other_public"))

otherApp.listen(OTHER_PORT, () => {
  console.log(`listening on http://localhost:${OTHER_PORT}`)
})