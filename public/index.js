const displayArea = document.getElementById('imageResults')
const prev = document.getElementById('prevButton')
const next = document.getElementById('nextButton')
const CLIENT_ID = "add yours here"

var PAGE = 1
function searchPhotos(dir) {
    const search = document.getElementsByTagName('input')[0].value
    displayArea.innerHTML = ""
    dir ? adjustPageNum(dir) : PAGE = 1
    fetch(`https://api.unsplash.com/search/photos/?client_id=${CLIENT_ID}&query=${search}&page=${PAGE}`, {
        method: "GET",
        headers: {
            'Accept-Version': 'v1'
        }
    })
    .then(
        response => {
            response.json()
                .then(
                    res => {
                        displayPhotos(res)
                    }
                )
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

function displayPhotos(res){
    for (let i = 0; i < res.results.length; i++) {
        displayPhoto(res.results[i], i)

    }

}

function displayPhoto(res, i){
    if (!i && i != 0) i += 1
    let link = document.createElement("a")
    link.setAttribute('href', res.urls.full)
    link.setAttribute('target', '_blank')
    link.setAttribute('id', 'viewImage' + i)
    document.getElementById('imageResults').appendChild(link)

    let image = document.createElement("img")
    image.setAttribute('src', res.urls.small)
    document.getElementById('viewImage' + i).appendChild(image)
}

function randomPhoto(){
    displayArea.innerHTML = ""
    fetch(`https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}`, {
        method: "GET",
        headers: {
            'Accept-Version': 'v1'
        }
    })
    .then(
        response => {
            response.json()
                .then(
                    res => {
                        displayPhoto(res)
                    }
                )
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

function adjustPageNum(dir) {
    dir == "next" ? PAGE ++ : PAGE --
    buttonDisable()
}

function buttonDisable() {
    console.log(prev, next)
    PAGE <= 1 ? prev.disabled = true : prev.disabled = false
}