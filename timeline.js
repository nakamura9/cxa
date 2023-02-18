
  
  const start = new Date(2022,8,18)
  const dayInMs = 24 * 3600 * 1000
  
  const lastEvent = events[events.length - 1]
  const end = lastEvent.date
  const span = (end - start) / dayInMs
  
  
  const timeline = document.querySelector('.timeline')
  const dummy = document.querySelector('#timeline-inner')
  timeline.style.width = `${(span + 3) * 200}px`
  dummy.style.width = `${(span + 3) * 200}px`
  
  events.forEach((evt, i) => {
    const delta = (evt.date - start) / dayInMs
    const container = document.querySelector('.ticker-layer')
    container.innerHTML += `<div class="ticker" style="left: ${delta * 200}px;">
            <div class="callout">
                <div class="ticker-label">${evt.date.toDateString()}</div>
                <div class="button-container">
                  ${evt.photos.length > 0 ? `<div class="button" onclick="renderImages(${i})"><i class="fa-regular fa-image fa-3x"></i></div> `: ""}      
                  ${evt.messages.length > 0 ? `<div class="button" onclick="renderMessages(${i})"><i class="fa-regular fa-comments fa-3x"></i></div> `: ""}
                </div>
            </div>
            <div class="ticker-stem"></div>
            
            
        </div>`
  })
  

  const track = document.querySelector('.timeline-container')
  const skybox = document.querySelector('.skybox')


const calculateDayColour = () => {
  const dayLight = [135,206,235]
  const night = [25,25,112]
  const delta = dayLight.map((v,i) => v - night[i])
  const modulo = 1400
  
  const position = track.scrollLeft

  let ratio = (position % modulo) / modulo
  ratio = ratio > 0.5 ? 2- (ratio * 2) : ratio * 2
  const color = dayLight.map((v, i) => v - parseInt(delta[i] * ratio))
  skybox.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})` 
}


const calculateSunPosition = () => {
  const angle = 180
  const modulo = 1400
  const origin = [0, 50]
  const midday = [50, 5]
  const sunset = [100, 50]
  
  const position = track.scrollLeft
  let ratio = (position % modulo) / modulo
  

  const sun = document.querySelector('.sun')
  
  if(ratio > 0.25 && ratio < 0.75) {
    sun.style.display = 'none'
    return
  } else {
    sun.style.display = 'block'
  }

  let sunX = 0
  let sunY = 50

  

  
  if(ratio <= 0.25) {
    ratio = ratio / 0.25
  } else {
    ratio = (1 - ratio) / 0.25
  }

  sunY = ratio * 100
  sunX = ratio * 100

  sun.style.top = `${sunY}vh`
  sun.style.left = `${sunY}vw`
}

const calculateMoonPosition = () => {
  const dayLight = [135,206,235]
  const night = [25,25,112]
  const delta = dayLight.map((v,i) => v - night[i])
  const modulo = 1400
  
  const position = track.scrollLeft
  console.log(position)
  let ratio = (position % modulo) / modulo
  ratio = ratio > 0.5 ? 2- (ratio * 2) : ratio * 2
  const color = dayLight.map((v, i) => v - parseInt(delta[i] * ratio))
  track.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}


track.addEventListener('scroll', evt => {
  calculateDayColour()
  // calculateSunPosition()
})

const starContainer = document.querySelector('.stars')


Array.apply(null, Array(100)).forEach(i => {
  const width = parseInt(Math.random() * starContainer.clientWidth)
  const height = parseInt(Math.random() * starContainer.clientHeight)
  starContainer.innerHTML += `<div style="left: ${width}px; top: ${height}px;"></div>`
})


const renderMessages = idx => {
  const phoneContainer = document.querySelector('.phone-container')
  const msgList = document.querySelector('.messages')
  msgList.innerHTML = ""
  const messages = events[idx].messages
  messages.forEach(msg => {
    msgList.innerHTML += msg.sent 
      ? `<div class="message-sent">${msg.msg}<div class="time">${msg.time}</div></div>`
      : `<div class="message-received">${msg.msg}<div class="time">${msg.time}</div></div>`
  })
  phoneContainer.style.display=  "flex"

}

const hideMessages = () => {
  const phoneContainer = document.querySelector('.phone-container')
  phoneContainer.style.display=  "none"

}

const renderImages = idx => {
  const modal = document.querySelector('.modal')
  const imgList = document.querySelector('.img-selector')
  const current = document.querySelector('#current-img')
  const links = events[idx].photos
  current.src = links[0]
  
  modal.style.display=  "flex"

  imgList.innerHTML = ""
  links.forEach(l => {
    imgList.innerHTML += `
      <div class="thumbnail" onclick="setCurrentImg('${l}')">
        <img src="${l}" />
      </div>
    `
  })
}

const setCurrentImg = (url) => {
  const current = document.querySelector('#current-img')
  current.src = url

}

const hideModal = () => {
  const phoneContainer = document.querySelector('.modal')
  phoneContainer.style.display=  "none"

}