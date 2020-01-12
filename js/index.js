document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded")
    let monsterContainer = document.getElementById("monster-container")
    let createMonsterDiv = document.getElementById("create-monster")
    let page = 1
    let limit = 50

    function getMonsters() {
        console.log("getMonsters")
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then( response => response.json())
        .then( data => {
            data.forEach(function (monster) {
                let monsterDiv = document.createElement("div")
                monsterDiv.innerHTML = `
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>${monster.description}</p>
                `
                monsterContainer.append(monsterDiv)
            })
        })
    }

    function createMonsterForm () {
        let monsterForm = document.createElement("form")
        monsterForm.id = "monster-form"
        monsterForm.innerHTML = `
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <input type="submit">
        `
        createMonsterDiv.append(monsterForm)
    }
    createMonsterForm()

    let form = document.querySelector("#monster-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let name = e.target.name.value
        let age = e.target.age.value
        let description = e.target.description.value
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name, age, description}) 
        })
        .then(response => response.json())
        .then(monster => {
            console.log(monster) 
            let monsterDiv = document.createElement("div")
            monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>${monster.description}</p>
            `
            monsterContainer.append(monsterDiv)
        
        })    
    })

    function goBack() {
        if (page === 1) {
            alert("Cannot go back!")
        } else {
            monsterContainer.innerHTML = ''
            --page
            getMonsters()
        }
    }

    function goForward () {
        if (monsterContainer.childElementCount <= 19) {
            alert("No more monsters to show!")
        } else {
            monsterContainer.innerHTML = ''
            ++page
            getMonsters()
        }
    }

    let backButton = document.getElementById("back")
    let forwardButton = document.getElementById("forward")

    backButton.addEventListener("click", goBack)
    forwardButton.addEventListener("click", goForward)

    getMonsters()
})

