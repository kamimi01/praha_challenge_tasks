const express = require("express")
const app = express()

const session = require("express-session")

app.set("view engine", "ejs")

app.use(
  session({
    secret: "keyboad cat",
    resave: false,
    saveUninitialized: true,
    name: "sid",
  })
)

app.get("/", (req, res) => {
  const count = req.session.count || 0
  req.session.count += 1
  res.render(
    "/Users/mikaurakawa/Desktop/praha_challenge/web_basic/understand_cookie/session/views/index.ejs",
    { count }
  )
})

app.listen(8000, () => {
  console.log("listening on port 8000")
})