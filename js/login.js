const updateTime = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const date = document.getElementById("date")
    if(!date) return 
    console.log("date")
    const time = document.getElementById("time")
    const now = new Date()
    date.innerHTML = `${day[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`
    time.innerHTML = `${now.getHours()}: ${now.getMinutes()}`
}

setInterval(updateTime, 500)

const renderLockScreen = () => { 
    document.querySelector(".phone").innerHTML = `
    <div class="chin"></div>
      <div class="status-bar" >
        <div>
          
        </div>
        <div>
          <i class="fa fa-wifi" aria-hidden="true"></i>
          <i class="fa fa-battery-half" aria-hidden="true"></i>
        </div>
      </div>
      <div>
        <h5 id="date"></div>
        <h1 id="time"></div>
      </div>
      `
      updateTime()

}

const renderPasswordInput = () => { 
    
}

// renderLockScreen()

let numbers  = []

const registerNumberEvents = () => {
    document.querySelectorAll(".number")
        .forEach(btn => {
            btn.addEventListener("click", evt => {
                numbers.push(evt.target.dataset.value )
                if(numbers.length == 6) {
                    logIn()
                }
                if(numbers.length > 6 ) {
                    resetNumbers()
                }
                renderDots()
                console.log(numbers)
            })
        })
}

registerNumberEvents()

const logIn = () => {
    if(numbers.join("") == "180922") {
        document.cookie += "login=1; path=/"
        location.href = "/index.html"
        window.localStorage.setItem("LoggedIn", 1)
    }
}

const resetNumbers = () => {
    document.querySelectorAll(".dot")
        .forEach(el => {
            el.classList.remove("active")
        })
    numbers = []
}

const renderDots = () => {
    document.querySelectorAll(".dot")
        .forEach(el => {
            el.classList.remove("active")
        })

    document.querySelectorAll(".dot")
        .forEach((el, i) => {
            if(i < numbers.length) {
                el.classList.add("active")
            }
            
        })
}