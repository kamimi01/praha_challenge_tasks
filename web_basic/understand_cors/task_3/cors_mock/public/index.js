const baseUrl = "http://localhost:8080"
const simpleUrl = baseUrl + "/simple"
const preflightUrl = baseUrl + "/preflight"

console.log(simpleUrl, preflightUrl)

// シンプルリクエストを行う
const simpleReq = new XMLHttpRequest()
simpleReq.open("POST", simpleUrl)
simpleReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

simpleReq.onreadystatechange = function () {
  if (
    simpleReq.readyState === XMLHttpRequest.DONE &&
    simpleReq.status === 200
  ) {
    console.log("シンプルリクエストの処理終了")
  }
}
simpleReq.send("name=hoge")

// プリフライトリクエストを行う
const preflightReq = new XMLHttpRequest()
preflightReq.open("POST", preflightUrl)
preflightReq.setRequestHeader("Content-Type", "application/json")

preflightReq.onreadystatechange = function () {
  if (
    preflightReq.readyState === XMLHttpRequest.DONE &&
    preflightReq.status === 200
  ) {
    console.log("プリフライトリクエストの処理終了")
  }
}

const reqBody = JSON.stringify({ name: "fuga" })
preflightReq.send(reqBody)
