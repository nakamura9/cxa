

let values = []
const ans = [
  'Digit1',
  'Digit8',
  'Digit0',
  'Digit9',
  'Digit2',
  'Digit2',
]


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

window.addEventListener('keydown', event => {
  if(event.code == 'Backspace') {
    values.pop()
  } else {
    values.push(event.code)
  }
  console.log(values)
  const cells = document.querySelectorAll('.password-input')
  Array.from(cells).forEach(el => el.innerHTML = '')
  if (values.length > 0) {
    for(let i = 0; i < values.length; i++) {
      const el = document.querySelector(`.password-input:nth-child(${i+1})`)
      el.innerHTML = '*'
    }
    
  }
  
  if(values.length == 6) {
    let valid = true
    for(let i=0; i < 6; i++) {
      if(values[i] != ans[i]){
        valid = false
        break
      }
    }
    if(valid) {
        state = 2
        setEmoji("It is! Welcome.")
        setTimeout(() => {location.replace('/')}, 2000)
    } else {
        state = 1
        setEmoji("I don't seem to know you.")
    }
    values = []
  }
  console.log(event.code)
})