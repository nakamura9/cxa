document.querySelector('.cover').addEventListener("click", (evt) => {
    document.querySelectorAll('.page-content')
        .forEach(page => {
            page.classList.remove('active')
        })
        document.getElementById("contents")
            .classList.add("active")
})

document.querySelectorAll('.link')
    .forEach(el => {
        el.addEventListener("click", (evt) => {
            console.log('clicked')
            document.querySelectorAll('.page-content')
                .forEach(page => {
                    console.log(page)
                    page.classList.remove('active')
                })
                const id = evt.target.dataset.id
                console.log(id)
                document.getElementById(id)
                    .classList.add("active")
        
            evt.stopPropagation()
        })
})
