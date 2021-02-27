// alert("test")

const cors = document.querySelector("#cors")

// こんな関数を作ることはない気がするのですが、今回はPOSTとPUTリクエストを同時に確認したかったので、関数にしました
function sendData(method) {
  // リクエストを行う
  const req = new XMLHttpRequest()
  const baseUrl = "http://praha-test-20200202.s3-website-ap-northeast-1.amazonaws.com/"
  // const baseUrl = "http://<バケット名>.s3-website-<リージョン名>.amazonaws.com/"

  req.open(method, baseUrl)

  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      console.log("リクエストの処理終了")
    }
  }
  req.send(null)
}

cors.addEventListener("click", (event) => {
  sendData("GET")
})