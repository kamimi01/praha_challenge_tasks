const simpleUrl = "http://localhost:8080/simple"
const preflightUrl = "http://localhost:8080/preflight"

// シンプルリクエストを行う
const simpleReq = new XMLHttpRequest()
simpleReq.open("POST", simpleUrl)
simpleReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

simpleReq.onreadystatechange = function () {
  if (
    simpleReq.readyState === XMLHttpRequest.DONE &&
    simpleReq.status === 200
  ) {
    console.log("処理終了")
  }
}
simpleReq.send("name=hoge")

// プリフライトリクエストを行う
const preflightReq = new XMLHttpRequest()
preflightReq.open("POST", preflightUrl)
preflightReq.setRequestHeader("Access-Control-Request-Method", "POST")
preflightReq.setRequestHeader("Content-Type", "application/json")

preflightReq.onreadystatechange = function () {
  if (
    preflightReq.readyState === XMLHttpRequest.DONE &&
    preflightReq.status === 200
  ) {
    console.log("処理終了")
  }
}
preflightReq.send({ name: "hoge" })
