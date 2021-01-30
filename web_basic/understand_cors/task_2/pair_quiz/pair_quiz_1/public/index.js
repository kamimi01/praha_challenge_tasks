const postSubmit = document.querySelector("#postSubmit")
const putSubmit = document.querySelector("#formForPut")

postSubmit.addEventListener("click", (event) => {
  function sendData(id) {
    // stringなのでnumberに変換
    if (typeof id !== "number") {
      id = +id
    }

    // シンプルリクエストを行う
    const req = new XMLHttpRequest()
    const baseUrl = "http://localhost:8080/users/"
    console.log(baseUrl + id)

    req.open("POST", baseUrl + id)
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        console.log("シンプルリクエストの処理終了")
      }
    }
    req.send(null)
  }

  // javascript側でリクエストするため、フォーム送信をキャンセル
  event.preventDefault()

  // inputタグからユーザの入力値を取得
  const idForPost = document.forms.formForPost.idForPost.value

  // XMLHttpRequestでリクエストを行う
  sendData(idForPost)
})
