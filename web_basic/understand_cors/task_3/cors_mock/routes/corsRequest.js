const express = require("express")
const router = express.Router()

router.post("/simple", (req, res) => {
  const resBody = {
    message: "シンプルリクエストを受け付けた",
  }

  res.json(resBody)
})

router.options("/preflight", (req, res) => {
  res.sendStatus(204)
})

router.post("/preflight", (req, res) => {
  const resBody = {
    message: "プリフライトリクエストを受け付けた",
  }

  res.json(resBody)
})

module.exports = router