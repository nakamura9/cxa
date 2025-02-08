let loggedIn = false
  document.cookie.split(";").forEach(c => {
    if(c.indexOf("login") > -1) {
      const [key, value] = c.split("=")
      if(value === "1") {
        loggedIn = true
      }
    }
  })

  if(window.localStorage.getItem("LoggedIn") == null) {
    location.replace("/cxa/login.html")
  }
 