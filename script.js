const container = document.querySelector('.stars')


Array.apply(null, Array(100)).forEach(i => {
  const width = parseInt(Math.random() * container.clientWidth)
  const height = parseInt(Math.random() * container.clientHeight)
  console.log({width, height})
  container.innerHTML += `<div style="left: ${width}px; top: ${height}px;"></div>`
})

