//****Project Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1365
canvas.height = 725

c.fillRect(0, 0, canvas.width, canvas.height)

//****Create Player and Enemy (with rectangles)
const gravity = 0.7

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    //Rectangle color, position, width, and height
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //Call update to move sprites across screen
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Keeps sprites from going out of the screen
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity
    }
}
//Define positon
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

console.log(player)
//Input key press controls ==> continue in animate function
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

//Animation loop to simulate movement
function animate() {
    //Request animate function over and over again
    window.requestAnimationFrame(animate)
    //Keeps canvas black and objects from overflow
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    //Call these commands to draw characters on canvas
    player.update()
    enemy.update()
    //**Define characer movement ==> refer to event listeners
    player.velocity.x = 0
    enemy.velocity.x = 0
    //Player Movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    //Enemy Movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
}
//Call function to create infinite loop
animate()

//****Move characters with event listeners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break

    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key)
})