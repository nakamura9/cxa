

let values = []



let state = 0
const states = [
    '&#x1F97A;',
    '&#x1F62D;',
    '&#x1F604;'
]

const setEmoji = (msg) => {
    const el = document.querySelector('.emoji')
    const m = document.querySelector('.message')
    el.innerHTML = states[state]
    m.innerHTML = msg
}

setEmoji("Hello, is it you?")

document.querySelector('input').addEventListener('input', event => {
  const value = event.target.value
  console.log(value)
  if(value == "180922") {
    document.cookie += "login=1;"
    state = 2
    setEmoji("It is! Welcome.")
    setTimeout(() => {location.replace('/cxa/')}, 2000)
  } else {
    state = 1
    setEmoji("I don't seem to know you.")
  }
})



document.querySelector(".body").addEventListener("click", () => {
  document.querySelector("input").focus()
})