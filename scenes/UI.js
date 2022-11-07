class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {
    this.drag = false;

    this.zoom = 5
    this.Main = this.scene.get('playGame');

    //this.Main.drag = true

    this.header = this.add.image(0, 0, 'main_ui').setOrigin(0, 0)
    // this.header.displayWidth = 150;
    ///this.header.displayHeight = 200;


    this.progress = this.add.image(23, 70, 'blank').setOrigin(0).setTint(0xe08000)
    this.progress.displayWidth = 19
    this.progress.displayHeight = 0

    this.playpause = this.add.image(25 + 62.5, 220, 'playpause', 0).setScale(3).setOrigin(.5, 1).setInteractive()
    this.playpause.on('pointerdown', function () {
      if (this.day.paused) {
        this.day.paused = false
        this.playpause.setFrame(0)
      } else {
        this.day.paused = true
        this.playpause.setFrame(1)
      }
    }, this)

    /*  this.rcibg = this.add.image(150, 150, 'blank').setOrigin(0, .5).setTint(0xfafafa).setAlpha(.7)
     this.rcibg.displayWidth = 150
     this.rcibg.displayHeight = 200 */

    this.res = this.add.image(175, 150, 'blank').setOrigin(.5, 1).setTint(0x529345)
    this.res.displayWidth = 25
    this.res.displayHeight = -75

    this.com = this.add.image(225, 150, 'blank').setOrigin(.5, 1).setTint(0x45a0c6)
    this.com.displayWidth = 25
    this.com.displayHeight = -75

    this.ind = this.add.image(275, 150, 'blank').setOrigin(.5, 1).setTint(0xc6c245)
    this.ind.displayWidth = 25
    this.ind.displayHeight = -75

    this.rci = this.add.image(225, 150, 'blank').setOrigin(.5, 1).setTint(0x000000)
    this.rci.displayWidth = 150
    this.rci.displayHeight = 5



    this.scoreText = this.add.bitmapText(80, 100, 'topaz', sim.gameData.day, 80).setOrigin(.5).setTint(0xCAD4D8).setAlpha(1);
    this.fundsText = this.add.bitmapText(325, 85, 'topaz', '$' + sim.gameData.funds, 45).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);
    this.popText = this.add.bitmapText(325, 145, 'topaz', 'P: ' + sim.gameData.population, 45).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);
    this.yearText = this.add.bitmapText(325, 205, 'topaz', 'Y: ' + sim.gameData.year, 45).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);

    this.modeLabelText = this.add.bitmapText(600, 25, 'topaz', 'Mode:', 50).setOrigin(0, .5).setTint(0xffffff).setInteractive();
    this.modeText = this.add.bitmapText(750, 25, 'topaz', '', 50).setOrigin(0, .5).setTint(0xffffff);
    this.modeLabelText.on('pointerdown', function () {
      this.modeNum++
      if (this.modeNum == GAME_MODES.length) {
        this.modeNum = 0
      }
      gameMode = GAME_MODES[this.modeNum]
      if (gameMode == GM_PAN) {
        this.Main.drag = true
      } else {
        this.Main.drag = false
      }

    }, this)


    var peopleIcon = this.add.image(850, 300, 'icons', 38).setOrigin(1, .5).setScale(2).setInteractive()
    peopleIcon.on('pointerdown', function () {
      this.scene.launch('People')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)


    var rciIcon = this.add.image(850, 400, 'icons', 40).setOrigin(1, .5).setScale(2).setInteractive()
    rciIcon.on('pointerdown', function () {
      this.scene.launch('Rci')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    var polON = false
    var polIcon = this.add.image(850, 500, 'icons', 42).setOrigin(1, .5).setScale(2).setInteractive()
    polIcon.on('pointerdown', function () {
      if (polON) {
        this.Main.graphics.clear()
        polON = false
      } else {
        updatePollution()
        this.Main.drawMapGrid()
        polON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    var powerIcon = this.add.image(850, 600, 'icons', 3).setOrigin(1, .5).setScale(2).setInteractive()
    powerIcon.on('pointerdown', function () {


      this.scene.launch('Power')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)


    this.cursorIcon = this.add.image(825, 1389, 'icons', 1).setOrigin(.5).setScale(3).setInteractive();
    this.cursorIcon.on('pointerdown', function () {
      this.events.emit('cursor');
      this.togglePan()
    }, this)
    this.zoomInIcon = this.add.image(820, 1289, 'icons', 34).setOrigin(1, .5).setScale(1.5).setInteractive().setAlpha(0);
    this.zoomInIcon.on('pointerdown', function () {
      this.setZoom('in')
    }, this)
    this.zoomOutIcon = this.add.image(830, 1289, 'icons', 35).setOrigin(0, .5).setScale(1.5).setInteractive().setAlpha(0);
    this.zoomOutIcon.on('pointerdown', function () {
      this.setZoom('out')
    }, this)
    this.coordText = this.add.bitmapText(game.config.width / 2, 150, 'topaz', '--', 50).setOrigin(.5).setTint(0x000000).setAlpha(0);

    ///////////////////////////////
    // Day Counter
    //////////////////////////////
    this.day = this.time.addEvent({
      delay: gameRules.dayLength,
      callback: function () {
        this.events.emit('endDay');
        sim.endDay()
        sim.gameData.day++
        this.scoreText.setText(sim.gameData.day);
        this.popText.setText('P: ' + sim.gameData.population)
        if (sim.gameData.day % 10 == 0) {
          sim.gameData.year++
          this.yearText.setText('Y: ' + sim.gameData.year)
        }
        //this.saveStats()
        this.Main.saveMap()
      },
      callbackScope: this,
      loop: true
    })
    //////////////////////////////

    //var this.Main = this.scene.get('playGame');
    this.Main.events.on('score', function (coord) {


      //console.log('dots ' + string)
      this.coordText.setText(coord.x + ', ' + coord.y)
    }, this);

    this.Main.events.on('updateStats', function () {
      this.updateStats()
    }, this);

  }

  update() {
    this.progress.displayHeight = 160 * (this.day.getElapsed() / gameRules.dayLength)
    this.modeText.setText(gameModeNames[gameMode])


    this.res.displayHeight = 75 * (sim.gameData.rci[0] / 2000)
    this.com.displayHeight = 75 * (sim.gameData.rci[1] / 1500)
    this.ind.displayHeight = 75 * (sim.gameData.rci[2] / 1500)
  }
  updateStats() {
    this.fundsText.setText('$' + sim.gameData.funds)
  }
  togglePan() {
    if (this.drag) {
      this.drag = false;
      this.cursorIcon.setFrame(1)
      this.zoomInIcon.setAlpha(0)
      this.zoomOutIcon.setAlpha(0)
    } else {
      this.drag = true;
      this.cursorIcon.setFrame(2)
      this.zoomInIcon.setAlpha(1)
      this.zoomOutIcon.setAlpha(1)
    }
  }
  setZoom(dir) {
    if (dir == 'in') {
      this.zoom += .5
      if (this.zoom == 9) {
        this.zoom = 8.5

      }
      this.Main.cameras.main.setZoom(this.zoom)
    } else {
      this.zoom -= .5
      if (this.zoom == .5) {
        this.zoom = 1

      }
      this.Main.cameras.main.setZoom(this.zoom)
    }
  }
}