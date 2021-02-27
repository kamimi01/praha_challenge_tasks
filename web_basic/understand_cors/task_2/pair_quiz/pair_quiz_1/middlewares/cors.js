const cors = require("cors")

// CORSの設定
const corsOptionsDelegate = (req, callback) => {
  const origin = req.headers.origin
  const ALLOW_ORIGINS = ["http://localhost:8090", "http://localhost:8091"]
  const ALLOW_METHODS = ["PUT", "POST"]
  const ALLOW_HEADERS = ["Content-Type"]
  const OPTIONS_SUCCESS_STATUS = 204

  // ALLOW_ORIGINSの要素以外のオリジンでは、origin:falseとなるため、CORSエラーが発生する
  const isAllowOrigin = () => {
    if (ALLOW_ORIGINS.includes(origin)) {
      return true
    }
    return false
  }

  const corsOptions = {
    origin: isAllowOrigin(),
    methods: ALLOW_METHODS.join(","),
    allowedHeaders: ALLOW_HEADERS.join(","),
    optionsSuccessStatus: OPTIONS_SUCCESS_STATUS,
  }

  console.log(corsOptions)
  callback(null, corsOptions)
}

module.exports.corsWithOptions = cors(corsOptionsDelegate)