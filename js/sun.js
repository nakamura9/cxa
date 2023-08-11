/**
 * sine opposite hypotenuse
 * cos adj hypotenuse
 * h cos(x) = a // horizontal x axis 
 * h sin(x) = o // vertical from the midpoint of the screen
 */


const calculateSunPositionByAngle = (x) => {
    const angleRad = (x / 360) * (2 * Math.PI)
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
    document.querySelector('.skybox').appendChild(div)
}

let angle = 90

const updateSun = () => {
    calculateSunPositionByAngle(angle)
    angle++
    if(angle < 360) {
        setTimeout(updateSun, 33)
    }
}

updateSun()


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

