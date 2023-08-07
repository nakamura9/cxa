
  
  const start = new Date(2022,8,18)
  const dayInMs = 24 * 3600 * 1000
  
  const lastEvent = events[events.length - 1]
  const end = lastEvent.date
  const span = (end - start) / dayInMs
   
  const timeline = document.querySelector('.timeline-track')
  const line = document.querySelector('.timeline-line')
  
  timeline.style.height = `${(span + 3) * 200}px`
  line.style.height = `${(span + 3) * 200}px`
  
  events.forEach((evt, i) => {
    const delta = (evt.date - start) / dayInMs
    const container = document.querySelector('.timeline-track')
    container.innerHTML += `<div style="top: ${delta * 200}px;" class="timeline-point" onclick="showEvents">
    <div class="timeline-point-inner">
      <i class="fas fa-clock    "></i>
    </div>
  </div>`
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



