function parseCsv(cityName) {
    const promise = fetch(`/csv/${cityName}.csv`)
        .then((response) => response.text())
        .then((data) => {
            const list = data.split("\n")
            return list
        }) 
        .then((list) => {

            const users = [] 
            
            for (let i = 1; i < list.length; i++) {

                const s = list[i].trim()

                const userList = s.split(",")
                const userObject = {
                    name: userList[0],
                    username: userList[1]
                }

                users.push(userObject)
            }
            
            return users
        })
        .catch((error) => console.log(error))

    return promise
}

function tohtml(userObject) {

    const url = `https://community.infiniteflight.com/u/${userObject.username}/summary`

    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', "_self")
    a.innerHTML += userObject.name


    const p = document.createElement('p')
    p.appendChild(a)

    return p.outerHTML
}

function usersToHtmls(users) {
    const htmls = []

    for (let i = 0; i < users.length; i++) {
        const userObject = users[i]
        const html = tohtml(userObject)
        htmls.push(html)
    }   

    return htmls
}

function injectCityHtml(cityId, htmls) {
    const cityDiv = document.getElementById(cityId)
    const users = htmls.join(" <br> ")
    cityDiv.innerHTML += users
}