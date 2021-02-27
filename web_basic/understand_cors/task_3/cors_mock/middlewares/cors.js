const cors = (req, res, next) => {
  const origin = req.headers.origin
  const ALLOWED_ORIGINS = ["http://localhost:8000"]
  const ALLOWED_METHODS = ["POST", "OPTIONS"]
  const ALLOWED_HEADERS = ["Content-Type"]

  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin)
    res.header("Access-Control-Allow-Methods", ALLOWED_METHODS.join(","))
    res.header("Access-Control-Allow-Headers", ALLOWED_HEADERS.join(","))
  }

  next()
}

module.exports = cors