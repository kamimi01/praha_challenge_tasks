const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8000

app.use(cookieParser())

const staticOptions = {
  setHeaders: function (res, path, stat) {
    res.cookie("first_party", "hoge", {
      httpOnly: true,
    })
  },
}

app.use("/public", express.static(__dirname + "/public", staticOptions))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
