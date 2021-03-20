const myImage = document.querySelector("img")
const myRequest = new Request("http://localhost:53233/")

const initOptions = {
  method: "GET",
  mode: "cors",
  credentials: "include"
}

fetch(myRequest, initOptions)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status)
    }
    return response.blob()
  })
  .then(function (myBlob) {
    const objectURL = URL.createObjectURL(myBlob)
    myImage.src = objectURL
  })
  .catch(function (error) {
    console.log(error)
  })
