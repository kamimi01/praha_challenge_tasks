const express = require("express")
const router = express.Router()

// シンプルリクエストを受ける
router.post("/simple", (req, res) => {
  const resBody = {
    message: "シンプルリクエストを受け付けた",
  }

  res.json(resBody)
})

// プリフライトリクエストのOPTIONSメソッドでのリクエストを受ける
router.options("/preflight", (req, res) => {
  res.sendStatus(204)
})

// プリフライトリクエストの実際のリクエストを受ける
router.post("/preflight", (req, res) => {
  const resBody = {
    message: "プリフライトリクエストを受け付けた",
  }

  res.json(resBody)
})

module.exports = router