
  
  const start = new Date(2022,8,18)
  const dayInMs = 24 * 3600 * 1000
  
  const lastEvent = events[events.length - 1]
  const end = lastEvent.date
  const span = (end - start) / dayInMs
   
  const timeline = document.querySelector('.timeline-track')
  const line = document.querySelector('.timeline-line')
  
  timeline.style.height = `${(span + 3) * 200}px`
  line.style.height = `${(span + 3) * 200}px`
  
  const addZero = (val) => (val < 10 ? "0" + val : val)

  events.forEach((evt, i) => {
    const delta = (evt.date - start) / dayInMs
    const container = document.querySelector('.timeline-track')
    container.innerHTML += `<div style="top: ${100 + (delta * 200)}px;" class="event">
    <div class="timeline-point" onclick="showEvents(${i})">
      <div class="timeline-point-inner">
        <i class="fas fa-clock    "></i>
      </div>
    </div>
    <div class="calendar">
        <div >${addZero(evt.date.getDate())}</div>
        <div >${addZero(evt.date.getMonth() + 1)}</div>
        <div >${evt.date.getFullYear()}</div>
      </div>
    </div>`
  })




const renderMessages = idx => {
  
  const phoneContainer = document.querySelector('.phone')
  phoneContainer.style.background = "#efefef"
  phoneContainer.innerHTML = `
  <div class="chin"></div>
      <div class="status-bar" onclick="renderHomeScreen(${idx})">
        <div>
          9:41
        </div>
        <div>
          <i class="fa fa-wifi" aria-hidden="true"></i>
          <i class="fa fa-battery-half" aria-hidden="true"></i>
        </div>
      </div>
      <div class="header">
        <i onclick="hideMessages()" class="fa-solid fa-2x fa-angle-left"></i>
        <div class="profile"></div>
        <div class="heading-text">Sic Simpie Tyrannis</div>
        <i class="fa-solid fa-2x fa-ellipsis-v"></i>
      </div>
      <div class="messages">
      </div>
      <div class="input">
        <div class="field"></div>
        <div class="send"><i class="fa-solid fa-angle-right fa-2x"></i></div>
      </div>
  `
  document.querySelector(".status-bar").style.color = "black"
  const msgList = document.querySelector('.messages')

  msgList.innerHTML = ""
  const messages = events[idx].messages
  messages.forEach(msg => {
    msgList.innerHTML += msg.sent 
      ? `<div class="message-sent">${msg.msg}<div class="time">${msg.time}</div></div>`
      : `<div class="message-received">${msg.msg}<div class="time">${msg.time}</div></div>`
  })

  if(!messages.length) {
    msgList.innerHTML = `<div class="message-sent">This chat is empty. Messages sent on Whatsapp are end to end encrypted.<div class="time"></div></div>`
  }
  

}

const hideMessages = () => {
  const phoneContainer = document.querySelector('.phone-container')
  phoneContainer.style.display=  "none"

}



const renderHomeScreen = (idx) => {
  document.querySelector('.phone').style.removeProperty('background')
  document.querySelector('.phone').innerHTML = `
  <div class="chin"></div>
  <div class="status-bar" >
    <div>
      9:41
    </div>
    <div>
      <i class="fa fa-wifi" aria-hidden="true"></i>
      <i class="fa fa-battery-half" aria-hidden="true"></i>
    </div>
  </div>
  <div class="navigation">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="icons">
    <div class="icon-photos" onclick="renderPhotos(${idx}, events)">
      <i class="fa fa-camera" aria-hidden="true"></i>
    </div>
    <div class="icon-messages" onclick="renderMessages(${idx})">
      <i class="fa fa-comments" aria-hidden="true"></i>
    </div>
  </div>
  `
}




// renderPhotos(1, events)

const showEvents = (idx) => {
  document.querySelector('.phone-container').style.display = "block"
  renderHomeScreen(idx)
}

