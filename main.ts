namespace SpriteKind {
    export const Bottle = SpriteKind.create()
    export const Treasure = SpriteKind.create()
    export const Compass = SpriteKind.create()
}
function clearSave () {
    blockSettings.clear()
    game.reset()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    clearSave()
})
function makeBottle () {
    if (!(foundBottle)) {
        bottleMessage = sprites.create(img`
            . . . . . . . e . . . . . . . . 
            . . . . . . 1 b 1 . . . . . . . 
            . . . . . . 1 b 1 . . . . . . . 
            . . . . . . 1 9 1 . . . . . . . 
            . . . . . . 1 9 1 . . . . . . . 
            . . . . . 1 9 b 9 1 . . . . . . 
            . . . . . 1 c b d 1 . . . . . . 
            . . . . 1 9 c b d 9 1 . . . . . 
            . . . . 1 9 1 b d 9 1 . . . . . 
            . . . . 1 1 5 1 d 9 1 . . . . . 
            . . . . 1 9 1 b d 9 1 . . . . . 
            . . . . 1 9 c b 1 9 1 . . . . . 
            . . . . 1 9 c 1 5 1 1 . . . . . 
            . . . . 1 9 c b 1 9 1 . . . . . 
            . . . . 1 9 c b d 9 1 . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            `, SpriteKind.Bottle)
        tiles.placeOnRandomTile(bottleMessage, assets.tile`myTile`)
        while (Math.abs(thePlayer.x - bottleMessage.x) > 200 || Math.abs(thePlayer.y - bottleMessage.y) > 200) {
            tiles.placeOnRandomTile(bottleMessage, assets.tile`myTile`)
        }
    }
}
function makeOtherBottle () {
    bottleMessage = sprites.create(img`
        . . . . . . . e . . . . . . . . 
        . . . . . . 1 b 1 . . . . . . . 
        . . . . . . 1 b 1 . . . . . . . 
        . . . . . . 1 9 1 . . . . . . . 
        . . . . . . 1 9 1 . . . . . . . 
        . . . . . 1 9 b 9 1 . . . . . . 
        . . . . . 1 c b d 1 . . . . . . 
        . . . . 1 9 c b d 9 1 . . . . . 
        . . . . 1 9 1 b d 9 1 . . . . . 
        . . . . 1 1 5 1 d 9 1 . . . . . 
        . . . . 1 9 1 b d 9 1 . . . . . 
        . . . . 1 9 c b 1 9 1 . . . . . 
        . . . . 1 9 c 1 5 1 1 . . . . . 
        . . . . 1 9 c b 1 9 1 . . . . . 
        . . . . 1 9 c b d 9 1 . . . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        `, SpriteKind.Bottle)
    tiles.placeOnRandomTile(bottleMessage, assets.tile`myTile`)
    while (Math.abs(thePlayer.x - bottleMessage.x) > 200 || Math.abs(thePlayer.y - bottleMessage.y) > 200) {
        tiles.placeOnRandomTile(bottleMessage, assets.tile`myTile`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Treasure, function (sprite, otherSprite) {
    otherSprite.destroy()
    theCompass.destroy()
    makeOtherBottle()
    info.changeScoreBy(1)
    if (info.score() > 10) {
        game.over(true)
    }
})
function loadGame () {
    thePlayer.setPosition(blockSettings.readNumber("playerX"), blockSettings.readNumber("playerY"))
    foundBottle = blockSettings.readNumber("foundBottle") == 1
    if (foundBottle) {
        createTreasure()
        theTreasure.setPosition(blockSettings.readNumber("treasureX"), blockSettings.readNumber("treasureY"))
    }
    boatName = blockSettings.readString("boatName")
    if (!(blockSettings.exists("enemiesXPositions"))) {
        enemiesXPositions = []
        enemiesYPositions = []
        for (let index = 0; index <= 15; index++) {
            kraken = sprites.create(img`
                . . . . . 1 . 1 . . 1 b 1 1 d 6 
                . . 1 . 1 . . 1 1 b 2 2 2 2 1 6 
                . . . 1 . . 1 b 2 2 2 2 2 2 2 d 
                . . . . . . 2 2 2 2 2 2 2 2 2 1 
                2 . . 1 . 2 2 2 2 2 b 2 2 2 b 1 
                2 . . . 2 1 2 2 2 b 2 2 2 2 1 . 
                2 b 2 2 2 f 2 2 b 2 2 2 2 b . . 
                b 2 2 . b 5 2 b 2 2 2 2 2 1 . . 
                . . . . 5 5 2 2 2 2 2 2 1 . . . 
                2 2 2 b f f 5 5 f 1 2 . . . . 1 
                . . . 2 b f 5 b 2 2 . . . 1 . . 
                . b 2 b . 2 . . 2 . 1 . 1 . . . 
                . 2 . . 2 . 2 2 2 . . . . . . 1 
                2 b . . 2 . 2 b . . . . . 1 . . 
                . . . 2 . . b 2 . . . . . . . . 
                . . . 2 . . . b 2 . . . . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(kraken, assets.tile`myTile`)
            enemiesXPositions.push(kraken.x)
            enemiesYPositions.push(kraken.y)
            blockSettings.writeNumberArray("enemiesXPositions", enemiesXPositions)
            blockSettings.writeNumberArray("enemiesYPositions", enemiesYPositions)
        }
    } else {
        enemiesXPositions = blockSettings.readNumberArray("enemiesXPositions")
        enemiesYPositions = blockSettings.readNumberArray("enemiesYPositions")
        for (let index = 0; index <= enemiesXPositions.length - 1; index++) {
            kraken = sprites.create(img`
                . . . . . 1 . 1 . . 1 b 1 1 d 6 
                . . 1 . 1 . . 1 1 b 2 2 2 2 1 6 
                . . . 1 . . 1 b 2 2 2 2 2 2 2 d 
                . . . . . . 2 2 2 2 2 2 2 2 2 1 
                2 . . 1 . 2 2 2 2 2 b 2 2 2 b 1 
                2 . . . 2 1 2 2 2 b 2 2 2 2 1 . 
                2 b 2 2 2 f 2 2 b 2 2 2 2 b . . 
                b 2 2 . b 5 2 b 2 2 2 2 2 1 . . 
                . . . . 5 5 2 2 2 2 2 2 1 . . . 
                2 2 2 b f f 5 5 f 1 2 . . . . 1 
                . . . 2 b f 5 b 2 2 . . . 1 . . 
                . b 2 b . 2 . . 2 . 1 . 1 . . . 
                . 2 . . 2 . 2 2 2 . . . . . . 1 
                2 b . . 2 . 2 b . . . . . 1 . . 
                . . . 2 . . b 2 . . . . . . . . 
                . . . 2 . . . b 2 . . . . . . . 
                `, SpriteKind.Enemy)
            kraken.setPosition(enemiesXPositions[index], enemiesYPositions[index])
        }
    }
}
function createTreasure () {
    theTreasure = sprites.create(img`
        . . . . . . b b 5 5 b . . . . . 
        . . . . b b 5 e e e 5 b . . . . 
        . . b b 5 e e e e 5 5 b . . . . 
        b b e e e e e 5 5 e b . . . . . 
        b 5 5 e e 5 5 f f f e . . . . . 
        5 e e 5 5 f f f f f b . . . . . 
        5 e e 5 f f f b b 5 5 b b . . . 
        5 e 5 f f b b 5 5 5 5 5 5 b 5 . 
        . 5 f b b 5 5 5 5 5 5 b b d d . 
        e 5 b 5 5 5 5 5 5 b b b e d d . 
        5 e 5 5 5 5 5 b b b e d d d d d 
        5 e b e 5 5 b b d d d d d d d d 
        d d b d b 5 e b d e d d d . d . 
        d f d d d 5 e d d f d d e d . . 
        d d d d d d d d d d d d d . . . 
        . . . d d d d d d d . . . . . . 
        `, SpriteKind.Treasure)
    tiles.placeOnRandomTile(theTreasure, assets.tile`myTile0`)
    theCompass.setImage(compass[0])
}
function createOtherTreasure () {
    theTreasure = sprites.create(img`
        . . . . . . b b 5 5 b . . . . . 
        . . . . b b 5 e e e 5 b . . . . 
        . . b b 5 e e e e 5 5 b . . . . 
        b b e e e e e 5 5 e b . . . . . 
        b 5 5 e e 5 5 f f f e . . . . . 
        5 e e 5 5 f f f f f b . . . . . 
        5 e e 5 f f f b b 5 5 b b . . . 
        5 e 5 f f b b 5 5 5 5 5 5 b 5 . 
        . 5 f b b 5 5 5 5 5 5 b b d d . 
        e 5 b 5 5 5 5 5 5 b b b e d d . 
        5 e 5 5 5 5 5 b b b e d d d d d 
        5 e b e 5 5 b b d d d d d d d d 
        d d b d b 5 e b d e d d d . d . 
        d f d d d 5 e d d f d d e d . . 
        d d d d d d d d d d d d d . . . 
        . . . d d d d d d d . . . . . . 
        `, SpriteKind.Treasure)
    tiles.placeOnRandomTile(theTreasure, assets.tile`myTile0`)
    theCompass.setImage(compass[0])
}
function saveGame () {
    blockSettings.writeNumber("playerX", thePlayer.x)
    blockSettings.writeNumber("playerY", thePlayer.y)
    if (foundBottle) {
        blockSettings.writeNumber("foundBottle", 1)
        blockSettings.writeNumber("treasureX", theTreasure.x)
        blockSettings.writeNumber("treasureY", theTreasure.y)
    } else {
        blockSettings.writeNumber("foundBottle", 0)
    }
    blockSettings.writeString("boatName", boatName)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bottle, function (sprite, otherSprite) {
    otherSprite.destroy()
    foundBottle = true
    createTreasure()
})
let angleToTreasure = 0
let kraken: Sprite = null
let enemiesYPositions: number[] = []
let enemiesXPositions: number[] = []
let theTreasure: Sprite = null
let bottleMessage: Sprite = null
let boatName = ""
let foundBottle = false
let theCompass: Sprite = null
let thePlayer: Sprite = null
let compass: Image[] = []
tiles.setTilemap(tilemap`level1`)
compass = [
img`
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . 2 5 5 d d d 2 d d d 5 5 2 . . 
    . 5 d d d d 2 2 2 d d d d 5 . . 
    . 5 d d d 2 2 2 2 2 d d d 5 . . 
    5 d d d 2 2 2 2 2 2 2 d d d 5 . 
    5 d d d d d 2 2 2 d d d d d 5 . 
    5 d d d d d 2 2 2 d d d d d 5 . 
    2 d d d d d 2 2 2 d d d d d 2 . 
    5 d d d d d 2 2 2 d d d d d 5 . 
    5 d d d d d 1 1 1 d d d d d 5 . 
    5 d d d d d 1 1 1 d d d d d 5 . 
    . 5 d d d d 1 1 1 d d d d 5 . . 
    . 5 d d d d 1 1 1 d d d d 5 . . 
    . 2 5 5 d d 1 1 1 d d 5 5 2 . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . 5 d d d d d d 2 2 2 2 2 5 . 
    . . 5 d d d d d d d 2 2 2 2 5 . 
    . 5 d d d d d d d 2 2 2 2 2 d 5 
    . 5 d d d d d d 2 2 2 2 2 2 d 5 
    . 5 d d d d d 2 2 2 2 2 d 2 d 5 
    . 2 d d d d 1 2 2 2 2 d d d d 2 
    . 5 d d d 1 1 1 2 2 d d d d d 5 
    . 5 d d 1 1 1 1 1 d d d d d d 5 
    . 5 d 1 1 1 1 1 d d d d d d d 5 
    . . 5 1 1 1 1 d d d d d d d 5 . 
    . . 5 1 1 1 d d d d d d d d 5 . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . 5 d d d d d d d d d d d 5 . 
    . . 5 d d d d d d d d d d d 5 . 
    . 5 d d d d d d d d d 2 d d d 5 
    . 5 d d d d d d d d d 2 2 d d 5 
    . 5 1 1 1 1 1 2 2 2 2 2 2 2 d 5 
    . 2 1 1 1 1 1 2 2 2 2 2 2 2 2 2 
    . 5 1 1 1 1 1 2 2 2 2 2 2 2 d 5 
    . 5 d d d d d d d d d 2 2 d d 5 
    . 5 d d d d d d d d d 2 d d d 5 
    . . 5 d d d d d d d d d d d 5 . 
    . . 5 d d d d d d d d d d d 5 . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . 5 1 1 1 d d d d d d d d 5 . 
    . . 5 1 1 1 1 d d d d d d d 5 . 
    . 5 d 1 1 1 1 1 d d d d d d d 5 
    . 5 d d 1 1 1 1 1 d d d d d d 5 
    . 5 d d d 1 1 1 2 2 d d d d d 5 
    . 2 d d d d 1 2 2 2 2 d d d d 2 
    . 5 d d d d d 2 2 2 2 2 d 2 d 5 
    . 5 d d d d d d 2 2 2 2 2 2 d 5 
    . 5 d d d d d d d 2 2 2 2 2 d 5 
    . . 5 d d d d d d d 2 2 2 2 5 . 
    . . 5 d d d d d d 2 2 2 2 2 5 . 
    . . 2 5 5 d d d d d d d 5 5 2 . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    . . 2 5 5 d d 1 1 1 d d 5 5 2 . 
    . . 5 d d d d 1 1 1 d d d d 5 . 
    . . 5 d d d d 1 1 1 d d d d 5 . 
    . 5 d d d d d 1 1 1 d d d d d 5 
    . 5 d d d d d 1 1 1 d d d d d 5 
    . 5 d d d d d 2 2 2 d d d d d 5 
    . 2 d d d d d 2 2 2 d d d d d 2 
    . 5 d d d d d 2 2 2 d d d d d 5 
    . 5 d d d d d 2 2 2 d d d d d 5 
    . 5 d d d 2 2 2 2 2 2 2 d d d 5 
    . . 5 d d d 2 2 2 2 2 d d d 5 . 
    . . 5 d d d d 2 2 2 d d d d 5 . 
    . . 2 5 5 d d d 2 d d d 5 5 2 . 
    . . . . . 5 5 5 2 5 5 5 . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . 5 d d d d d d d d 1 1 1 5 . . 
    . 5 d d d d d d d 1 1 1 1 5 . . 
    5 d d d d d d d 1 1 1 1 1 d 5 . 
    5 d d d d d d 1 1 1 1 1 d d 5 . 
    5 d d d d d 2 2 1 1 1 d d d 5 . 
    2 d d d d 2 2 2 2 1 d d d d 2 . 
    5 d 2 d 2 2 2 2 2 d d d d d 5 . 
    5 d 2 2 2 2 2 2 d d d d d d 5 . 
    5 d 2 2 2 2 2 d d d d d d d 5 . 
    . 5 2 2 2 2 d d d d d d d 5 . . 
    . 5 2 2 2 2 2 d d d d d d 5 . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . 5 d d d d d d d d d d d 5 . . 
    . 5 d d d d d d d d d d d 5 . . 
    5 d d d 2 d d d d d d d d d 5 . 
    5 d d 2 2 d d d d d d d d d 5 . 
    5 d 2 2 2 2 2 2 2 1 1 1 1 1 5 . 
    2 2 2 2 2 2 2 2 2 1 1 1 1 1 2 . 
    5 d 2 2 2 2 2 2 2 1 1 1 1 1 5 . 
    5 d d 2 2 d d d d d d d d d 5 . 
    5 d d d 2 d d d d d d d d d 5 . 
    . 5 d d d d d d d d d d d 5 . . 
    . 5 d d d d d d d d d d d 5 . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    `,
img`
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . 5 2 2 2 2 2 d d d d d d 5 . . 
    . 5 2 2 2 2 d d d d d d d 5 . . 
    5 d 2 2 2 2 2 d d d d d d d 5 . 
    5 d 2 2 2 2 2 2 d d d d d d 5 . 
    5 d 2 d 2 2 2 2 2 d d d d d 5 . 
    2 d d d d 2 2 2 2 1 d d d d 2 . 
    5 d d d d d 2 2 1 1 1 d d d 5 . 
    5 d d d d d d 1 1 1 1 1 d d 5 . 
    5 d d d d d d d 1 1 1 1 1 d 5 . 
    . 5 d d d d d d d 1 1 1 1 5 . . 
    . 5 d d d d d d d d 1 1 1 5 . . 
    . 2 5 5 d d d d d d d 5 5 2 . . 
    . . . . 5 5 5 2 5 5 5 . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
thePlayer = sprites.create(img`
    . . . f f f e . . . . . . . . . 
    . . f f 1 f e . . . . . . . . . 
    . . . f f f e . . . . . . . . . 
    . . . . . e e e . . . . . . . . 
    . . . 1 1 1 1 1 1 1 . . . . . . 
    . . 1 1 1 1 1 1 1 1 . . . . . . 
    . . 1 1 1 1 1 1 1 . . . . . . . 
    . . 1 1 1 1 1 1 1 . . . . . . . 
    . . . 1 1 1 1 1 1 1 . . e e e e 
    e . . . 1 1 1 1 1 1 e e e . e . 
    e e e e . . e . . e e e e e e e 
    e e e e e e e e e e e 9 e 9 e 9 
    . b b f b f b f b f b b b b b b 
    . e e e e e e e e e e e e e e e 
    . . b b b b b b b b b b b b . . 
    . . . e e e e e e e e e e e . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(thePlayer, assets.tile`myTile`)
theCompass = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Compass)
theCompass.setFlag(SpriteFlag.RelativeToCamera, true)
theCompass.setPosition(150, 110)
controller.moveSprite(thePlayer)
scene.cameraFollowSprite(thePlayer)
foundBottle = false
makeBottle()
loadGame()
if (!(blockSettings.exists("boatName"))) {
    boatName = game.askForString("Name yer ship, ya scurvy dog!")
}
thePlayer.sayText("welcome aboard the " + boatName, 2000, false)
game.onUpdate(function () {
    if (thePlayer.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
        if (controller.right.isPressed()) {
            thePlayer.setImage(img`
                . . . . . . . . . e f f f . . . 
                . . . . . . . . . e f 1 f f . . 
                . . . . . . . . . e f f f . . . 
                . . . . . . . . e e e . . . . . 
                . . . . . . 1 1 1 1 1 1 1 . . . 
                . . . . . . 1 1 1 1 1 1 1 1 . . 
                . . . . . . . 1 1 1 1 1 1 1 . . 
                . . . . . . . 1 1 1 1 1 1 1 . . 
                e e e e . . 1 1 1 1 1 1 1 . . . 
                . e . e e e 1 1 1 1 1 1 . . . e 
                e e e e e e e . . e . . e e e e 
                9 e 9 e 9 e e e e e e e e e e e 
                b b b b b b f b f b f b f b b . 
                e e e e e e e e e e e e e e e . 
                . . b b b b b b b b b b b b . . 
                . . e e e e e e e e e e e . . . 
                `)
        } else if (controller.up.isPressed()) {
            thePlayer.setImage(img`
                . . . . . . . e . . . . . . . . 
                . . . . . . . e . . . . . . . . 
                . . . . . . e f e . . . . . . . 
                . . . . . e b 1 b e . . . . . . 
                . . . . e b e f e b e . . . . . 
                . . . . e b e e e b e . . . . . 
                . . e e e e e e e e e e e . . . 
                . . . 1 1 1 1 e 1 1 1 1 . . . . 
                . . 1 1 1 1 1 e 1 1 1 1 1 . . . 
                . . . . e b e b e b e . . . . . 
                . . . . e b e b e b e . . . . . 
                . . . e e e e f e e e e . . . . 
                . . . e e b f f f b e e . . . . 
                . . . e b e e 3 e e b e . . . . 
                . . . e e b b f b b e e . . . . 
                . . . . e e e e e e e . . . . . 
                `)
        } else if (controller.down.isPressed()) {
            thePlayer.setImage(img`
                . . . . . e e e e e e e . . . . 
                . . . . e e b b f b b e e . . . 
                . . . . e b e e 3 e e b e . . . 
                . . . . e e b f f f b e e . . . 
                . . . . e e e e f e e e e . . . 
                . . . . . e b e b e b e . . . . 
                . . . . . e b e b e b e . . . . 
                . . . 1 1 1 1 1 e 1 1 1 1 1 . . 
                . . . . 1 1 1 1 e 1 1 1 1 . . . 
                . . . e e e e e e e e e e e . . 
                . . . . . e b e e e b e . . . . 
                . . . . . e b e f e b e . . . . 
                . . . . . . e b 1 b e . . . . . 
                . . . . . . . e f e . . . . . . 
                . . . . . . . . e . . . . . . . 
                . . . . . . . . e . . . . . . . 
                `)
        } else {
            thePlayer.setImage(img`
                . . . f f f e . . . . . . . . . 
                . . f f 1 f e . . . . . . . . . 
                . . . f f f e . . . . . . . . . 
                . . . . . e e e . . . . . . . . 
                . . . 1 1 1 1 1 1 1 . . . . . . 
                . . 1 1 1 1 1 1 1 1 . . . . . . 
                . . 1 1 1 1 1 1 1 . . . . . . . 
                . . 1 1 1 1 1 1 1 . . . . . . . 
                . . . 1 1 1 1 1 1 1 . . e e e e 
                e . . . 1 1 1 1 1 1 e e e . e . 
                e e e e . . e . . e e e e e e e 
                e e e e e e e e e e e 9 e 9 e 9 
                . b b f b f b f b f b b b b b b 
                . e e e e e e e e e e e e e e e 
                . . b b b b b b b b b b b b . . 
                . . . e e e e e e e e e e e . . 
                `)
        }
    } else {
        thePlayer.setImage(img`
            . . 1 . . . f f f f . . . . . . 
            . 1 1 . . f f 5 f f f . . . . . 
            1 1 . . f f f f f f f f . . . . 
            1 1 . f f f f f f f f f f . . . 
            1 1 . . e d 8 1 f f d e . . . . 
            1 1 . . . d e e e e d 5 . . . . 
            . 1 . . . e e e e e e . . . . . 
            5 5 . 5 5 e e e e e e 5 5 . . . 
            . d f f f f e e e e f f f f . . 
            . e f f f f e e e e f f f f . . 
            . 5 . . f f f e e f f f f f . . 
            . . . . f f f 5 f f f f . d . . 
            . . . . f f f f f f f f . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . . e . . f . . . . . . 
            . . . . . . e . . f f . . . . . 
            `)
    }
    if (foundBottle) {
        angleToTreasure = Math.atan2(theTreasure.y - thePlayer.y, theTreasure.x - thePlayer.x)
        theCompass.setImage(compass[(Math.floor(Math.map(angleToTreasure, -3.14159, 3.14159, 0, 8)) + 7) % 8])
    }
})
game.onUpdateInterval(1000, function () {
    saveGame()
})
