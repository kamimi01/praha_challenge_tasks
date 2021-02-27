const express = require("express")
const cors = require("../middlewares/cors")
const router = express.Router()

function commonProcess(req, res) {
  console.log(req.method)
  console.log(req.params.id)

  const id = req.params.id
  const resBody = {
    message: `取得したID：${id}`,
  }
  res.json(resBody)
}

router.options("/users/:id", cors.corsWithOptions)

router.post("/users/:id", cors.corsWithOptions, (req, res) => {
  commonProcess(req, res)
})

router.put("/users/:id", cors.corsWithOptions, (req, res) => {
  commonProcess(req, res)
})

module.exports = router