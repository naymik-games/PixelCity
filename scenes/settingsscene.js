class Settings extends Phaser.Scene {

  constructor() {

    super("Settings");
  }
  preload() {
    /*    this.load.scenePlugin({
         key: 'rexuiplugin',
         url: '../classes/uiplug.min.js',
         //  url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
         sceneKey: 'rexUI'
       }); */
  }

  create() {
    this.Main = this.scene.get('playGame');
    console.log(this.mapXY)
    /*    var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
       tablebg.displayWidth = 900
       tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 825, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 750
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(858, 762, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 747, 'Settings ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })




    //thumb

    //gameStats.population = 80


    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'RCI', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();



    this.jobText = this.add.bitmapText(25, 825, 'topaz', 'home ', 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();

    this.jobText.on('pointerdown', function () {
      this.scene.stop('Menu')
      this.scene.stop()
      this.scene.stop('playGame')
      this.scene.start('startGame')
    }, this)
    if (gameRules.dayLength == 36000) {
      this.speed = 0
    } else if (gameRules.dayLength == 24000) {
      this.speed = 1
    } else if (gameRules.dayLength == 12000) {
      this.speed = 2
    } else if (gameRules.dayLength == 6000) {
      this.speed = 3
    }
    this.speedRadios = []
    //this.speed = 1
    this.speedContainer = this.add.container(0, 1050)
    var speedText = this.add.text(25, 0, 'Speed ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' })
    this.speedContainer.add(speedText)

    var radioS1 = this.add.image(50, 75, 'radio', 3)
    this.speedContainer.add(radioS1)
    this.speedRadios.push(radioS1)
    var radioS1Text = this.add.bitmapText(radioS1.x + 50, 75, 'topaz', 'Slow ', 45).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive()
    this.speedContainer.add(radioS1Text)
    radioS1Text.on('pointerdown', function () {
      this.speedHandler(0)
    }, this);


    var radioS2 = this.add.image(250, 75, 'radio', 3)
    this.speedContainer.add(radioS2)
    this.speedRadios.push(radioS2)
    var radioS2Text = this.add.bitmapText(radioS2.x + 50, 75, 'topaz', 'Normal ', 45).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive()
    this.speedContainer.add(radioS2Text)
    radioS2Text.on('pointerdown', function () {
      this.speedHandler(1)
    }, this);

    var radioS3 = this.add.image(475, 75, 'radio', 3)
    this.speedContainer.add(radioS3)
    this.speedRadios.push(radioS3)
    var radioS3Text = this.add.bitmapText(radioS3.x + 50, 75, 'topaz', 'Quick ', 45).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive()
    this.speedContainer.add(radioS3Text)
    radioS3Text.on('pointerdown', function () {
      this.speedHandler(2)
    }, this);

    var radioS4 = this.add.image(700, 75, 'radio', 3)
    this.speedContainer.add(radioS4)
    this.speedRadios.push(radioS4)
    var radioS4Text = this.add.bitmapText(radioS4.x + 50, 75, 'topaz', 'Fast ', 45).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive()
    this.speedContainer.add(radioS4Text)
    radioS4Text.on('pointerdown', function () {
      this.speedHandler(3)
    }, this);

    this.speedHandler(this.speed)
    /*    this.slowText = this.add.bitmapText(25, 1125, 'topaz', 'Slow ', 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();
       this.slowText.on('pointerdown', function () {
         gameRules.dayLength = 36000
       }, this)
       this.normText = this.add.bitmapText(245, 1125, 'topaz', 'Normal ', 40).setOrigin(0, .5).setTint(0xF0B060).setInteractive();
       this.normText.on('pointerdown', function () {
         gameRules.dayLength = 24000
       }, this)
       this.quickText = this.add.bitmapText(460, 1125, 'topaz', 'Quick ', 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();
       this.quickText.on('pointerdown', function () {
         gameRules.dayLength = 12000
       }, this)
       this.fastText = this.add.bitmapText(750, 1125, 'topaz', 'Fast ', 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();
       this.fastText.on('pointerdown', function () {
         gameRules.dayLength = 6000
       }, this) */

    //console.log(roadInRange(tile.xy))
    /* if (tile.hasBuilding) {
      console.log(tile.building.frame.name)
      console.log(tile.building.texture.key)
    } else {
      console.log('no building')
    } */

    //

    //close screen

    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
  speedHandler(radio) {
    for (var i = 0; i < this.speedRadios.length; i++) {
      this.speedRadios[i].setFrame(3)
    }
    this.speedRadios[radio].setFrame(2)
    this.speed = radio
    if (this.speed == 0) {
      gameRules.dayLength = 36000
    } else if (this.speed == 1) {
      gameRules.dayLength = 24000
    } else if (this.speed == 2) {
      gameRules.dayLength = 12000
    } else if (this.speed == 3) {
      gameRules.dayLength = 6000
    }
  }
}