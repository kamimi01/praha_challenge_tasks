const express = require("express")

// クッキーの取得のためのミドルウェア
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())

app.use(express.json())

app.get("/", (req, res) => {
  //// クッキーの取得
  const parsedCookie = req.cookies

  // CORSを許可する（ngrokとlocalhostで切り替えが面倒なので、一旦*で）
  res.header("Access-Control-Allow-Origin", "*")

  //// クッキーの設定
  // 第一引数がname、第二引数がvalue、第三引数はオプション
  res.cookie("name1", "value1")

  res.cookie("name2", "value2", {
    // ミリ秒で1分に期限を設定
    // max-ageに設定したmsを経過するとクッキーが削除される
    maxAge: 60000,
    httpOnly: false,
  })

  // 現在時刻を取得
  const currentDate = new Date()
  // 現在時刻から1分追加
  currentDate.setMinutes(currentDate.getMinutes() + 1)

  res.cookie("name3", "value3", {
    // expiresに設定した期限を経過するとクッキーが削除される
    expires: currentDate,
  })

  res.cookie("name4", "value4", {
    // これをtrueにすると、javascriptのdocument.cookieでクッキーが取得できなくなる
    httpOnly: true,
  })

  res.cookie("name5", "value5", {
    // ここに設定されているドメインのサブドメインにはクッキーが送られる
    // ただ、ここには何も設定しないのが一番安全
    // ngrok.ioはPublic Suffix Listにあるため、適用はされないが、一応書いてる
    domain: ".ngrok.io",
  })

  res.cookie("name6", "value6", {
    // httpsにのみクッキーが送られる
    secure: true,
  })

  res.cookie("name7", "value7", {
    sameSite: "lax",
  })

  console.log(parsedCookie)

  res.json(parsedCookie)
})

app.listen(8000, () => {
  console.log("listening on port 8000")
})
