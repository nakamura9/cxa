const renderPhotos = (idx, arr) => {
    const links = arr[idx].photos
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
        <div class="photo-app">
          <div class="current-photo">
            
          </div>
          <div class="photo-list">
            <div class="photo-track">
              ${links.map(l => (`<div class="photo" onclick="setCurrent('${l}')">
              <img src="${l}" >
            </div>`)).join("")}
            </div>
          </div>
        </div>
    `
    document.querySelector(".status-bar").style.color = "black"
    
    const photoContainer = document.querySelector('.current-photo')
    if(!links.length) {
      photoContainer.innerHTML = `
      <div><i class="fa fa-camera fa-7x" aria-hidden="true"></i><br>
      <h4>No photos found!</h4></div>
      `
    } else {
      photoContainer.innerHTML = `
        <img id="current-img">
      `
      const current = document.querySelector('#current-img')
      current.src = links[0]
    }
    
  }

  function hideOverlay() {
    document.querySelector('.phone-container').style.display = "none"
  
  }
  
  setCurrent = (url) => {
    const current = document.querySelector('#current-img')
    current.src = url
  
  }
  