const postSubmit = document.querySelector("#postSubmit")
const putSubmit = document.querySelector("#putSubmit")

function sendData(id) {
  // stringなのでnumberに変換
  if (typeof id !== "number") {
    id = +id
  }

  // リクエストを行う
  const req = new XMLHttpRequest()
  const baseUrl = "http://localhost:8080/users/"
  console.log(baseUrl + id)

  req.open("POST", baseUrl + id)
  req.setRequestHeader("Content-Type", "application/json")

  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      console.log("リクエストの処理終了")
    }
  }
  req.send(null)
}

postSubmit.addEventListener("click", (event) => {
  // javascript側でリクエストするため、フォーム送信をキャンセル
  event.preventDefault()

  // inputタグからユーザの入力値を取得
  const idForPost = document.forms.formForPost.idForPost.value

  // XMLHttpRequestでリクエストを行う
  sendData(idForPost)
})

putSubmit.addEventListener("click", (event) => {
  // javascript側でリクエストするため、フォーム送信をキャンセル
  event.preventDefault()

  // inputタグからユーザの入力値を取得
  const idForPost = document.forms.formForPut.idForPut.value

  // XMLHttpRequestでリクエストを行う
  sendData(idForPost)
})
