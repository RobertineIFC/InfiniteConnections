function search_cities() {
	let input = document.getElementById('searchbar').value
	input = input.toLowerCase();
	let x = document.getElementsByClassName('button');

	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display = "none";
            x[i].className = "test123";
		} else {
			x[i].style.display = "table-row";
		}
	}
}


main()

async function main() {
    const cities = ["paris", "newyork", "saopaulo", "barcelona", "atlanta", "buffalo", "munich", "AlphenaandenRijn", "bangalore", "coloradosprings", "london", "bognorregis", "tijuana", "rotterdam", "bergen", "phoenix", "portland", "sanantonio", "washingtondc",  "sanfrancisco", "manizales", "saltlakecity", "toronto", "dallas", "charlotte", "sacramento", "pune", "eindhoven", "cambridge"]
    cities.forEach(addCity)
}

async function addCity(cityID) {
    const users = await parseCSV(cityID)
    const html = users.map(toHTML)
    injectCityHtml(cityID, html)
}

async function parseCSV(cityName) {
    try {
        const response = await fetch(`csv/${cityName}.csv`)
        const text = await response.text()
        const lines = text.split("\n").slice(1)

        const users = lines.map(parseUserLineToObject)

        return users
    } catch (e) {
        console.error(e)
    }
}

function parseUserLineToObject(userLine) {
    const userList = userLine.split(",")
    return {
        name: userList[0],
        username: userList[1]
    }
}

function toHTML(userObject) {

    const url = `https://community.infiniteflight.com/u/${userObject.username}/summary`

    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', "_self")
    a.innerHTML += userObject.name


    const p = document.createElement('p')
    p.appendChild(a)

    return p.outerHTML
}

function injectCityHtml(cityID, htmls) {
    const cityDiv = document.getElementById(cityID)
    const users = htmls.join(" <br> ")
    cityDiv.innerHTML += users
}
