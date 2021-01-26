const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post("/form", (req, res) => {
  // フォームの中身を送信する
  const reqBody = req.body
  console.log(reqBody)

  res.cookie("samesiteStrictPost", "strict", {
    sameSite: "strict",
  })

  res.cookie("samesiteLaxPost", "lax", {
    sameSite: "lax",
  })

  res.send("OK")
})

app.get("/", (req, res) => {
  res.cookie("samesiteStrict", "strict", {
    sameSite: "strict",
  })

  res.cookie("samesiteLax", "lax", {
    sameSite: "lax",
  })

  // noneの場合は、secure属性を付与しないと送信が拒否される
  res.cookie("samesiteNone", "none", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })
  res.sendFile(__dirname + "/public/index.html")
})

// 画像を表示する
app.get("/img", (req, res) => {
  // set-cookieに付与される
  res.cookie("imgCookie", "img", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })

  res.sendFile(__dirname + "/img/profile.jpg")
})

// javascriptファイルを読み込む
app.get("/js", (req, res) => {
  // set-cookieに付与されるが、samesiteがnoneになっていないと、ブロックされる
  res.cookie("jsCookie", "js", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })

  res.sendFile(__dirname + "/index.js")
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
