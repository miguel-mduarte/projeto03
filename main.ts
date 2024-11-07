let dado = 0
info.setScore(0)

let ghostAnim = assets.animation `myAnim`
let imgGhost = assets.image `ghost`

let imgpc = assets.image `PC`
let pc = sprites.create(imgpc)

let sorte = parseInt(
    (game.askForNumber
        ("defina sua sorte       (max: 10)", 2) / 2
    ) + ""
)
if (sorte >= 10) { sorte = 4 }
console.log("sorte: " + sorte)

pc.say("High Score: " + info.highScore())

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    
    pc.setFlag(SpriteFlag.Invisible, true)
    let ghost = sprites.create(imgGhost)
    ghost.setScale(3, ScaleAnchor.Middle)
    animation.runImageAnimation(
        ghost,
        ghostAnim,
        100,
        false
    )
    pause(500)
    sprites.destroy(ghost)
    pc.setFlag(SpriteFlag.Invisible, false)
    dado = Math.randomRange(1, 10)
    let dadoSorte = dado + sorte
    if (dadoSorte>10){dadoSorte = 10}
    
    console.log(dado)
    pc.say("você tirou: " + dadoSorte)
    
    if (dadoSorte > 5) {
            
        console.log(dadoSorte)
        info.player1.changeScoreBy(10)
        console.log("+10 pontos")

    } else {
        info.saveHighScore()
        info.saveHighScore()
        game.gameOver(false)
        pc.say ("pontuação máxima: " + info.highScore())
        

    }
})

