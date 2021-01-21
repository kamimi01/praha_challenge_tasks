const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 3000

app.use(cookieParser())

const staticOptions = {
  setHeaders: function (res, path, stat) {
    res.cookie("third_party", "fuga", {
      // httpOnly属性のみだと、Chromeブラウザのデフォルト設定がSameSiteがLaxであるため、ブロックされる
      httpOnly: true,
      // クロスサイト間でのクッキーのやりとりを可能にするため、以下の属性を付与する
      sameSite: "none",
      secure: true,
    })
  },
}

app.use("/img", express.static(__dirname + "/img", staticOptions))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
