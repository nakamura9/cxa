var renderImages = (idx, arr) => {
    const modal = document.querySelector('.modal')
    const imgList = document.querySelector('.img-selector')
    const current = document.querySelector('#current-img')
    const links = arr[idx].photos
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
  
  var setCurrentImg = (url) => {
    const current = document.querySelector('#current-img')
    current.src = url
  
  }

  var hideModal = () => {
    const phoneContainer = document.querySelector('.modal')
    phoneContainer.style.display=  "none"
  
  }