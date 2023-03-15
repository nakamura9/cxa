
  
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
  const modulo = 1000
  
  const position = track.scrollLeft

  let ratio = (position % modulo) / modulo
  ratio = ratio > 0.5 ? 2- (ratio * 2) : ratio * 2
  const color = dayLight.map((v, i) => v - parseInt(delta[i] * ratio))
  skybox.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})` 
  const dark = document.querySelector('.dark')
  dark.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})` 
}


const calculateSunPositionByAngle = (x) => {
  const angleRad = (Math.PI / 2) + ((x / 360) * (2 * Math.PI))
  const width = document.querySelector('.skybox').clientWidth
  const height = document.querySelector('.skybox').clientHeight
  const radius = height / 2
  const adj = Math.cos(angleRad) * radius
  const opp = Math.sin(angleRad) * radius
  const xPos = (width / 2) - adj
  const yPos = (height / 2) - opp
  const sun = document.querySelector('.sun')
  sun.style.top = `${yPos}px`
  sun.style.left = `${xPos}px`
}

const calculateMoonPositionByAngle = (x) => {
  const angleRad = ((3 * Math.PI) / 2) + ((x / 360) * (2 * Math.PI))
  const width = document.querySelector('.skybox').clientWidth
  const height = document.querySelector('.skybox').clientHeight
  const radius = height / 2
  const adj = Math.cos(angleRad) * radius
  const opp = Math.sin(angleRad) * radius
  const xPos = (width / 2) - adj
  const yPos = (height / 2) - opp
  const moon = document.querySelector('.moon')
  moon.style.top = `${yPos}px`
  moon.style.left = `${xPos}px`
}

const setMoonFraction = () => {
  const count = parseInt(track.scrollLeft / 1000) % 5
  const dark = document.querySelector('.dark')
  dark.style.left = `${75 - (count * 15)}px`
} 

const calculateSunPosition = () => {
  const modulo = 1000
  const position = track.scrollLeft
  let ratio = (position % modulo) / modulo
  
  calculateSunPositionByAngle(ratio * 360)
}

const calculateMoonPosition = () => {
  const modulo = 1000
  const position = track.scrollLeft
  let ratio = (position % modulo) / modulo
  
  calculateMoonPositionByAngle(ratio * 360)
  setMoonFraction()
}


track.addEventListener('scroll', evt => {
  calculateDayColour()
  calculateSunPosition()
  calculateMoonPosition()
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