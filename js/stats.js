console.log(document.querySelector('main').clientWidth)
if(document.querySelector('main').clientWidth < 600) {
    console.log('main')
    document.getElementById('msg-by-date').style.width = `300px`
}