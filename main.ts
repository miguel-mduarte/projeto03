// declarando as variaveis em 0
let dado = 0
let sorte = 0
info.setScore(0)
let continuarJogo = true

//criando o sprite e a animação do fantasma
let ghostAnim = assets.animation `myAnim`
let imgGhost = assets.image `ghost`
//pc é uma imagem estatica de ghost
let pc = sprites.create(imgGhost)

function explicacao() {
    //explicação do jogo para o jogador
    game.splash("Bem vindo", "ao dado da morte...")
    game.splash("a morte rolará", "1d10...")
    game.splash("se a rolagem for >=5", "você ganha pontos")
    game.splash("se o resultado for", "menor que 5...")
    game.splash("você morre.")
    game.splash("Acumule o máximo de pontos", "que conseguir.")
    game.splash("Boa sorte.")
}
    
let primeiraRodada = true
// Iniciar o jogo
iniciarJogo()
// Função que controla a lógica do jogo
function iniciarJogo() {
    let continuarJogo = true
    if (primeiraRodada) {
        explicacao()
        primeiraRodada = false
    }
    while (continuarJogo) {
        jogo()
        
        // Perguntar se o jogador quer jogar novamente
        switch (game.ask("Você quer jogar de novo?")) {
            case true:
                continuarJogo = true
                break;
    
            case false:
                continuarJogo = false
                break;
        }
    }
}
//logica do jogo
function jogo() {
    
        //definindo a sorte do jogador
    
        switch (game.ask("você quer uma vantagem?")) {
            case true:
                sorte = definirSorte()
                pc.say("sorte = " + sorte)
                pause(1000)
                break;
            case false:
                pc.say("sorte = " + sorte)
                pause(1000)
            
        }
        let jogando = true
        while (jogando) {
        //botao A
        controller.A.onEvent(ControllerButtonEvent.Pressed, () => { rolarDados() })
        let r = rolarDados()
        switch (game.ask("você confia na sua sorte?")) {
            
            case true:
                //chama a rolagem de dados
                

                // de a rolagem der 5 ou mais o jogador ganaha o valor da rolagem em pontos
                if (r >= 5) {
                    console.log(r)
                    pc.say("você tirou: " + r)
                    pause(600)
                    info.player1.changeScoreBy(r)
                    console.log("+" + r + " pontos")
                } else {
                    //se menor que 5 o score do jgoar zera e ele perde
                    pc.say("você não devia ter confiado na sua sorte")
                    pause(5500)
                    pc.say("você tirou: " + r)
                    pause(1000)
                    info.setScore(0)
                    game.gameOver(false)
                    jogando = false
                }
                break;
            
            //botao B
            case false:
                //salva o score do jogador 
                info.saveHighScore()
                if (r >= 5) {
                    pc.say("pena que desistiu, você iria ganhar +" + r + " pontos.")
                } else {
                    pc.say("que bom que desistiu, você estava prestes a morrer.")
                }
                
                pause(6000)
                //jogador ganha com sua pontuação total
                game.gameOver(true)
                jogando = false
                pc.say("pontuação máxima: " + info.highScore())
                break;

        }
    }
}
//rola o numero aleatorio de 1 a 10 e soma com a sorte do jogador
function rolarDados() {
    //animação do fantasma 
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
    
    //sorteia o numero 
    dado = Math.randomRange(1, 10)
    
    //soma a sorte
    let dadoSorte = dado + sorte
    if (dadoSorte > 10) { dadoSorte = 10 }
    
    console.log(dado)

    return dadoSorte
    }


function definirSorte() {
    //salva a entrada do jogador
    let s = game.askForNumber("defina sua sorte       (max: 3)", 1)
    
    //define a sorte como maximo 4
    if (s >= 3) { s = 3 }
    console.log("sorte: " + s)
    return s
}