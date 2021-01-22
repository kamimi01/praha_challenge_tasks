const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post("/", (req, res)=>{
  // フォームの中身を送信する
  const reqBody = req.body
  console.log(reqBody)

  res.cookie("samesiteStrictPost", "strict", {
    sameSite: "strict",
  })

  res.cookie("samesiteLaxPost", "lax", {
    sameSite: "lax",
  })
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
    sameSite: "none",
    secure: true,
  })
  res.sendFile(__dirname + "/public/index.html")
})

// const staticOptions = {
//   setHeaders: function (res, path, stat) {
//     res.cookie("third_party", "fuga", {
//       // httpOnly属性のみだと、Chromeブラウザのデフォルト設定がSameSiteがLaxであるため、ブロックされる
//       httpOnly: true,
//       // クロスサイト間でのクッキーのやりとりを可能にするため、以下の属性を付与する
//       sameSite: "none",
//       secure: true,
//     })
//   },
// }

// app.use("/img", express.static(__dirname + "/img", staticOptions))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
