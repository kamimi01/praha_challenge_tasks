const express = require("express")
const path = require("path")
const router = express.Router()

router.get("/", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "../public/index.html")
  res.sendFile(indexFilePath)
})

router.get("/js", (req, res) => {
  const jsFilePath = path.resolve(__dirname, "../public/index.js")
  res.sendFile(jsFilePath)
})

module.exports = router
