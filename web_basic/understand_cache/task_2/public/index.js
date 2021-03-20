const url = "http://localhost:8080/use_cache_vary"

const req = new XMLHttpRequest()
req.open("GET", url)
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

req.onreadystatechange = function () {
  if (
    req.readyState === XMLHttpRequest.DONE &&
    req.status === 200
  ) {
    console.log("シンプルリクエストの処理終了")
  }
}
req.send(null)