function randomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function randomSpeed() { 
    return Math.round(Math.random() * 2 + 5)
}

function randomSize() {
    return Math.round(Math.random() * 60 + 90)
}

function randomPosition() {
    return Math.round(Math.random() * 1770)
}

function collision(x1, y1, x2, y2, width2, height2) {
    if(((x1 > x2) && (x1 < (x2 + (width2))) && (y1 > y2) && (y1 < (y2 + (height2)))) || 
    ((x1 < x2) && (x1 > (x2 - (width2))) && (y1 > y2) && (y1 < (y2 + (height2))))) {
        return true
    }else return false
}

function randomAsteroidType() {
    let randomNumber = Math.round(Math.random() * 2 + 1)
    if(randomNumber === 1) return "asteroid1"
    else if(randomNumber === 2) return "asteroid2"
    else return "asteroid3"
}

function randomAsteroidRotation() {
    return "rotate(" + Math.round(Math.random() * 270) + "deg)"
}

let asteroidsVelocity = []

function createNewAsteroid(start) {
    if(start){
        let newAsteroid = document.createElement("div")
        newAsteroid.className = `asteroid ${randomAsteroidType()}`
        newAsteroid.style.top = "-150px"
        newAsteroid.style.left = randomPosition() + "px"
        const size = randomSize()
        newAsteroid.style.width = size + "px"
        newAsteroid.style.height = size + "px"
        newAsteroid.style.transform = randomAsteroidRotation()
        asteroidsVelocity.push(randomSpeed())
        document.body.appendChild(newAsteroid)
    }
}

let enemyMovement = []

function createNewEnemy(start) {
    if(start){
        let newEnemy = document.createElement("div")
        newEnemy.className = "enemy"
        newEnemy.style.top = "-90px"
        newEnemy.style.left = randomPosition() + "px"
        newEnemy.style.width = "90px"
        newEnemy.style.height = "90px"
        enemyMovement.push(randomNumber(0, 1))
        document.body.appendChild(newEnemy)
    }
}

function createNewSpaceCraft() {
    let newSpaceCraft = document.createElement("div")
    newSpaceCraft.id = "spacecraft"
    newSpaceCraft.style.left = (screen.width/2)-40 + "px"
    newSpaceCraft.style.top = "860px"
    newSpaceCraft.style.width = "90px"
    newSpaceCraft.style.height = "90px"
    document.body.appendChild(newSpaceCraft)
}

function createRandomHeart(start) {
    if(start) {
        var randomHeart = document.createElement("div")
        randomHeart.className = "heart randomHeart"
        randomHeart.style.top = "-60px"
        randomHeart.style.left = randomPosition() + "px"
        randomHeart.style.transform = "rotateY(0deg)"
        document.body.appendChild(randomHeart)
    }
}

let maxPoints = 0

function updatePunctuation() {
    let newValue = parseInt(document.getElementById("punctuation").innerHTML.split(" ")[1])+10
    document.getElementById("punctuation").innerHTML = "POINTS: " + newValue
    if(newValue > maxPoints) maxPoints = newValue
}

let startGame = false
let leftHearts = []

function evaluateHearts() {
    if(leftHearts.length === 0) return true
    else return false
}

function createHearts() {
    var heart1 = document.createElement("div")
    heart1.className = "heart"
    heart1.id = "heart1"
    var heart2 = document.createElement("div")
    heart2.className = "heart"
    heart2.id = "heart2"
    var heart3 = document.createElement("div")
    heart3.className = "heart"
    heart3.id = "heart3"
    leftHearts.push("heart3")
    leftHearts.push("heart2")
    leftHearts.push("heart1")
    document.body.appendChild(heart1)
    document.body.appendChild(heart2)
    document.body.appendChild(heart3)
}

function createPunctuation() {
    var newPunctuation = document.createElement("p")
    newPunctuation.id = "punctuation"
    newPunctuation.innerHTML = "POINTS: 0"
    document.body.appendChild(newPunctuation)
}

function createMenuStartButton() {
    let newStartGameButton = document.createElement("button")
    newStartGameButton.id = "startGame"
    newStartGameButton.innerHTML = "Start playing!!"
    newStartGameButton.addEventListener("click", () => {
        createPunctuation()
        createHearts()

        document.getElementById("startGame").remove()
        document.getElementById("maxPunctuation").remove()

        startGame = true

        document.getElementById("backgroundMusic").volume = 0.02
        document.getElementById("backgroundMusic").play()
    })
    document.body.appendChild(newStartGameButton)
}

function createMaxPunctuationView() {
    let maxPointsPunctuation = document.createElement("p")
    maxPointsPunctuation.id = "maxPunctuation"
    maxPointsPunctuation.innerHTML = "MAX POINTS: " + maxPoints
    document.body.appendChild(maxPointsPunctuation)
}

function resetGame() {
    startGame = false

    let asteroids = [...document.getElementsByClassName("asteroid")]
    asteroids.forEach(asteroid => asteroid.remove())
    let enemies = [...document.getElementsByClassName("enemy")]
    enemies.forEach(enemy => enemy.remove())
    let spacecraftShots = [...document.getElementsByClassName("spaceShipShot")]
    spacecraftShots.forEach(shot => shot.remove())
    let enemiesShots = [...document.getElementsByClassName("enemyShot")]
    enemiesShots.forEach(shot => shot.remove())
    let randomHearts = [...document.getElementsByClassName("randomHeart")]
    randomHearts.forEach(heart => heart.remove())
    
    createMenuStartButton()
    createMaxPunctuationView()

    document.getElementById("backgroundMusic").pause()
    document.getElementById("punctuation").remove()
}

createNewSpaceCraft()
createMenuStartButton()
createMaxPunctuationView()

let notShotted = true

document.addEventListener("keydown", (k) => {
    if(startGame) {
        if(k.key === "ArrowRight"){
            var pos = parseInt(document.getElementById("spacecraft").style.left.replace("px", ""))
            if(parseInt(document.getElementById("spacecraft").style.left.replace("px", "")) <= screen.width-95) document.getElementById("spacecraft").style.left = pos+15 + "px"
        }else if(k.key === "ArrowLeft"){
            var pos = parseInt(document.getElementById("spacecraft").style.left.replace("px", ""))
            if(parseInt(document.getElementById("spacecraft").style.left.replace("px", "")) >= 0) document.getElementById("spacecraft").style.left = pos-15 + "px"
        }else if(k.key === "ArrowUp"){
            if(notShotted){
                var newShot = document.createElement("div")
                newShot.className = "spaceShipShot"
                newShot.style.top = "850px"
                newShot.style.left = parseInt(document.getElementById("spacecraft").style.left.replace("px", ""))+37 + "px"
                document.body.appendChild(newShot)
                var newShotSound = document.createElement("audio")
                newShotSound.src = "../audio/shot.mp3"
                newShotSound.preload = "auto"
                newShotSound.volume = 0.01
                newShotSound.play()
                notShotted = false
                setTimeout(() => {
                    notShotted = true
                }, 400)
            }
        }
    }
})

// Creates a random asteroid
setInterval(() => {
    setTimeout(() => {
        createNewAsteroid(startGame)
    }, randomNumber(0, 1000))
}, 1500)

setInterval(() => {
    let asteroids = [...document.getElementsByClassName("asteroid")]
    let spacecraft = document.getElementById("spacecraft")

    asteroids.forEach((asteroid, index) => {
        var top = parseInt(asteroid.style.top.replace("px", ""))
        if(top <= screen.height) {
            asteroid.style.top = top+asteroidsVelocity[index] + "px"
            if(asteroid.className.split(" ")[1] !== "asteroid2") {
                asteroid.style.transform = "rotate(" + (parseInt(asteroid.style.transform.split("(")[1].slice(0, -4)) + 1) + "deg)"
            }
        } else {
            asteroidsVelocity.splice(index, 1)
            asteroid.remove()
        }

        if(collision(parseInt(spacecraft.style.left.replace("px", "")), parseInt(spacecraft.style.top.replace("px", "")), parseInt(asteroid.style.left.replace("px", "")), parseInt(asteroid.style.top.replace("px", "")), parseInt(asteroid.style.width.replace("px", "")), parseInt(asteroid.style.height.replace("px", "")))){
            asteroidsVelocity.splice(index, 1)
            asteroid.remove()
            spacecraft.remove()
            document.getElementById(leftHearts[0]).remove()
            leftHearts.splice(0, 1)
            if(evaluateHearts()) resetGame()
            createNewSpaceCraft()
        }
    })
}, 20)

// Creates a random enemy
setInterval(() => {
    setTimeout(() => {
        createNewEnemy(startGame)
    }, randomNumber(0, 2000))

    setTimeout(() => {
        createNewEnemy(startGame)
    }, randomNumber(4000, 6000))
}, 8000)

setInterval(() => {
    let enemies = [...document.getElementsByClassName("enemy")]
    let shots = [...document.getElementsByClassName("spaceShipShot")]
    let spacecraft = document.getElementById("spacecraft")
    
    enemies.forEach((enemy, index) => {
        var topPos = parseInt(enemy.style.top.replace("px", ""))
        var leftPos = parseInt(enemy.style.left.replace("px", ""))
        if(topPos <= screen.height) {
            enemy.style.top = topPos+1 + "px"
            if(enemyMovement[index] === 0){
                if(parseInt(enemy.style.left.replace("px", "")) <= screen.width-90) enemy.style.left = leftPos+1 + "px"
                else enemyMovement[index] = 1
            }else {
                if(parseInt(enemy.style.left.replace("px", "")) >= 0) enemy.style.left = leftPos-1 + "px"
                else enemyMovement[index] = 0
            }
        }else {
            enemyMovement.splice(index, 1)
            enemy.remove()
        }

        shots.forEach((shot) => {
            if(collision(parseInt(shot.style.left.replace("px", "")), parseInt(shot.style.top.replace("px", "")),
            parseInt(enemy.style.left.replace("px", "")), parseInt(enemy.style.top.replace("px", "")),
            parseInt(enemy.style.width.replace("px", "")), parseInt(enemy.style.height.replace("px", "")))) {
                enemyMovement.splice(index, 1)
                enemy.remove()
                shot.remove()
                updatePunctuation()
            }
        })

        if(topPos === randomNumber(-20, 100) || topPos === randomNumber(100, 200) || topPos === randomNumber(200, 300)){
            var newEnemyShot = document.createElement("div")
            newEnemyShot.className = "enemyShot"
            newEnemyShot.style.left = parseInt(enemy.style.left.replace("px", ""))+37 + "px"
            newEnemyShot.style.top = parseInt(enemy.style.top.replace("px", ""))+85 + "px"
            document.body.appendChild(newEnemyShot)
            var newShotSound = document.createElement("audio")
            newShotSound.src = "../audio/shot.mp3"
            newShotSound.preload = "auto"
            newShotSound.volume = 0.01
            newShotSound.play()
        }

        if(collision(parseInt(spacecraft.style.left.replace("px", "")), parseInt(spacecraft.style.top.replace("px", "")), parseInt(enemy.style.left.replace("px", "")), parseInt(enemy.style.top.replace("px", "")), parseInt(enemy.style.width.replace("px", "")), parseInt(enemy.style.height.replace("px", "")))){
            enemy.remove()
            spacecraft.remove()
            document.getElementById(leftHearts[0]).remove()
            leftHearts.splice(0, 1)
            if(evaluateHearts()) resetGame()
            createNewSpaceCraft()
        }
    })
}, 5)

setInterval(() => {
    let shots = [...document.getElementsByClassName("spaceShipShot")]

    shots.forEach((shot) => {
        var pos = parseInt(shot.style.top.replace("px", ""))
        if(pos >= 0) shot.style.top = pos-3 + "px"
        else{
            shot.remove()
        }
    })
}, 3)

setInterval(() => {
    let shots = [...document.getElementsByClassName("enemyShot")]
    let spacecraft = document.getElementById("spacecraft")

    shots.forEach((shot) => {
        var pos = parseInt(shot.style.top.replace("px", ""))
        if(pos <= screen.height) shot.style.top = pos+2 + "px"
        else{
            shot.remove()
        }

        if(collision(parseInt(shot.style.left.replace("px", "")), parseInt(shot.style.top.replace("px", "")), parseInt(spacecraft.style.left.replace("px", "")), parseInt(spacecraft.style.top.replace("px", "")), parseInt(spacecraft.style.width.replace("px", "")), parseInt(spacecraft.style.height.replace("px", "")))){
            shot.remove()
            spacecraft.remove()
            document.getElementById(leftHearts[0]).remove()
            leftHearts.splice(0, 1)
            if(evaluateHearts()) resetGame()
            createNewSpaceCraft()
        }
    })
}, 3)

setInterval(() => {
    createRandomHeart(startGame)
}, 30000)

setInterval(() => {
    let hearts = [...document.getElementsByClassName("randomHeart")]
    let spacecraft = document.getElementById("spacecraft")

    hearts.forEach((heart) => {
        var pos = parseInt(heart.style.top.replace("px", ""))
        if(pos <= screen.height) {
            heart.style.top = pos+2 + "px"
            heart.style.transform = "rotateY(" + (parseInt(heart.style.transform.split("(")[1].slice(0, -4)) + 1) + "deg)"
        }else{
            heart.remove()
        }

        if(collision(parseInt(heart.style.top.replace("px", "")), parseInt(heart.style.left.replace("px", "")), parseInt(spacecraft.style.top.replace("px", "")), parseInt(spacecraft.style.left.replace("px", "")), parseInt(spacecraft.style.width.replace("px", "")), parseInt(spacecraft.style.height.replace("px", "")))){
            heart.remove()
            var newHeart = document.createElement("div")
            newHeart.className = "heart"
            if(leftHearts.length === 1){
                newHeart.id = "heart2"
                leftHearts.unshift("heart2")
                document.body.appendChild(newHeart)
            }else if(leftHearts.length === 2){
                newHeart.id = "heart3"
                leftHearts.unshift("heart3")
                document.body.appendChild(newHeart)
            }
        }
    })
}, 10)
