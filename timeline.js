const events = [
    {
      'date': new Date(2022,8,18),
      'photos': [
        "https://lh3.googleusercontent.com/BfVKgk6vcmCG6iS_H2kumjgXXUwAJDyWNMckL_x9uwiNKI8iZFxXwcTAx2mp9zjaL9W_7j3wpSGRGVvhR3-UVaffvGE92KSDaPBhLZHPpiBfdCHznQTlaNlOHLC-ShebyXqaH6sBkA=w2400"
      ]
    },
    {
      'date': new Date(2022,8,25),
      'photos': [
        "https://lh3.googleusercontent.com/BfVKgk6vcmCG6iS_H2kumjgXXUwAJDyWNMckL_x9uwiNKI8iZFxXwcTAx2mp9zjaL9W_7j3wpSGRGVvhR3-UVaffvGE92KSDaPBhLZHPpiBfdCHznQTlaNlOHLC-ShebyXqaH6sBkA=w2400"
      ]
    },
    
  ]
  
  const start = new Date(2022,8,18)
  const dayInMs = 24 * 3600 * 1000
  
  const lastEvent = events[events.length - 1]
  const end = lastEvent.date
  const span = (end - start) / dayInMs
  
  
  const timeline = document.querySelector('.timeline')
  const dummy = document.querySelector('#timeline-inner')
  timeline.style.width = `${(span + 3) * 200}px`
  dummy.style.width = `${(span + 3) * 200}px`
  
  events.forEach(evt => {
    const delta = (evt.date - start) / dayInMs
    const container = document.querySelector('.ticker-layer')
    container.innerHTML += `<div class="ticker" style="left: ${delta * 200}px;">
            <div class="callout">
                <div class="ticker-label">${evt.date.toDateString()}</div>
                <div class="button-container">
                    <div class="button"><i class="fa-regular fa-comments fa-3x"></i></div>
                    <div class="button"><i class="fa-regular fa-image fa-3x"></i></div>
                </div>
            </div>
            <div class="ticker-stem"></div>
            
            
        </div>`
  })
  