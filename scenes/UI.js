class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {

    this.load.plugin('rexcircularprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogressplugin.min.js', true);

  }
  create() {
    this.drag = false;

    this.zoom = 5
    this.Main = this.scene.get('playGame');

    //this.Main.drag = true
    this.headerGroup = this.add.container()




    this.header = this.add.image(0, 0, 'main_ui').setOrigin(0, 0)
    this.headerGroup.add(this.header)
    // this.header.displayWidth = 150;
    ///this.header.displayHeight = 200;


    this.circularProgress = this.add.rexCircularProgress({
      x: 100, y: 48 + 197 / 2,
      radius: 70,
      thickness: 0.2,
      trackColor: 0x00203F,
      barColor: 0xDF8000,
      centerColor: 0xcccccc,
      // anticlockwise: true,

      value: 0
    })
    //this.headerGroup.add(this.circularProgress)
    this.playpause = this.add.image(100, 45 + 197 / 2, 'playpause', 0).setScale(4).setOrigin(.5).setInteractive()
    this.playpause.on('pointerdown', function () {
      if (this.day.paused) {
        this.day.paused = false
        this.playpause.setFrame(0)
      } else {
        this.day.paused = true
        this.playpause.setFrame(1)
      }
    }, this)
    this.headerGroup.add(this.playpause)
    /*  this.rcibg = this.add.image(150, 150, 'blank').setOrigin(0, .5).setTint(0xfafafa).setAlpha(.7)
     this.rcibg.displayWidth = 150
     this.rcibg.displayHeight = 200 */

    this.res = this.add.image(225, 150, 'blank').setOrigin(.5, 1).setTint(0x529345)
    this.res.displayWidth = 25
    this.res.displayHeight = -75
    this.headerGroup.add(this.res)

    this.com = this.add.image(275, 150, 'blank').setOrigin(.5, 1).setTint(0x45a0c6)
    this.com.displayWidth = 25
    this.com.displayHeight = -75
    this.headerGroup.add(this.com)

    this.ind = this.add.image(325, 150, 'blank').setOrigin(.5, 1).setTint(0xc6c245)
    this.ind.displayWidth = 25
    this.ind.displayHeight = -75
    this.headerGroup.add(this.ind)

    this.rci = this.add.image(275, 150, 'blank').setOrigin(.5, 1).setTint(0x000000)
    this.rci.displayWidth = 150
    this.rci.displayHeight = 5
    this.headerGroup.add(this.rci)

    this.month = ['--', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    //sim.gameData.day
    // this.scoreText = this.add.bitmapText(100, 40 + 197 / 2, 'topaz', sim.gameData.day, 65).setOrigin(.5).setTint(0xCAD4D8).setAlpha(1);
    this.fundsText = this.add.bitmapText(420, 85, 'topaz', formatter.format(sim.gameData.funds), 42).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);
    this.headerGroup.add(this.fundsText)
    this.popText = this.add.bitmapText(420, 145, 'topaz', 'P: ' + sim.gameData.population, 42).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);
    this.headerGroup.add(this.popText)
    this.yearText = this.add.bitmapText(420, 205, 'topaz', this.month[sim.gameData.day] + ' ' + sim.gameData.year, 42).setOrigin(0, .5).setTint(0xCAD4D8).setAlpha(1);
    this.headerGroup.add(this.yearText)

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

    this.advisorGroup = this.add.container()
    var peopleIcon = this.add.image(75, 425, 'icons', 38).setOrigin(.5).setScale(2).setInteractive()
    peopleIcon.on('pointerdown', function () {
      this.scene.launch('People')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    this.advisorGroup.add(peopleIcon)

    var rciIcon = this.add.image(75, 500, 'icons', 40).setOrigin(.5).setScale(2).setInteractive()
    rciIcon.on('pointerdown', function () {
      this.scene.launch('Rci')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    this.advisorGroup.add(rciIcon)

    var powerIcon = this.add.image(75, 575, 'icons', 3).setOrigin(.5).setScale(2).setInteractive()
    powerIcon.on('pointerdown', function () {
      this.scene.launch('Power')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    this.advisorGroup.add(powerIcon)

    var financeIcon = this.add.image(75, 650, 'icons', 30).setOrigin(.5).setScale(2).setInteractive()
    financeIcon.on('pointerdown', function () {
      this.scene.launch('Finance')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    this.advisorGroup.add(financeIcon)

    var policeIcon = this.add.image(75, 725, 'icons', 48).setOrigin(.5).setScale(2).setInteractive()
    policeIcon.on('pointerdown', function () {
      this.scene.launch('Police')
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
    }, this)
    this.advisorGroup.add(policeIcon)
    this.advisorGroup.setPosition(-150, 0)
    ///////////////////////////////////////////////////////
    this.dataGroup = this.add.container()
    var traflON = false
    var trafIcon = this.add.image(75, 425, 'icons', 44).setOrigin(.5).setScale(2).setInteractive()
    trafIcon.on('pointerdown', function () {
      if (traflON) {
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        traflON = false
      } else {
        //updateTraffic()
        this.Main.drawTrafficGrid()
        traflON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    this.dataGroup.add(trafIcon)
    var polON = false
    var polIcon = this.add.image(75, 500, 'icons', 42).setOrigin(.5).setScale(2).setInteractive()
    polIcon.on('pointerdown', function () {
      if (polON) {
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
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
    this.dataGroup.add(polIcon)
    var lvON = false
    var lvIcon = this.add.image(75, 575, 'icons', 52).setOrigin(.5).setScale(2).setInteractive()
    lvIcon.on('pointerdown', function () {
      if (lvON) {
        this.Main.graphicsData.clear()
        lvON = false
      } else {

        this.Main.drawLVGrid()
        lvON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    this.dataGroup.add(lvIcon)
    var waterON = false
    var waterIcon = this.add.image(75, 650, 'icons', 53).setOrigin(.5).setScale(2).setInteractive()
    waterIcon.on('pointerdown', function () {
      if (waterON) {
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        waterON = false
      } else {

        this.Main.drawWaterGrid()
        waterON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    this.dataGroup.add(waterIcon)

    var powerON = false
    var powerDIcon = this.add.image(75, 725, 'icons', 3).setOrigin(.5).setScale(2).setInteractive()
    powerDIcon.on('pointerdown', function () {
      if (powerON) {
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        powerON = false
      } else {

        this.Main.drawPowerGrid()
        powerON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    this.dataGroup.add(powerDIcon)

    var crimeON = false
    var crimeIcon = this.add.image(75, 800, 'icons', 48).setOrigin(.5).setScale(2).setInteractive()
    crimeIcon.on('pointerdown', function () {
      if (crimeON) {
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        crimeON = false
      } else {

        this.Main.drawCrimeGrid()
        crimeON = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)
    this.dataGroup.add(crimeIcon)

    this.dataGroup.setPosition(-150, 0)
    var dataOn = false
    var dataIcon = this.add.image(75, 275, 'icons', 51).setOrigin(.5, 0).setScale(3).setInteractive()
    dataIcon.on('pointerdown', function () {
      if (dataOn) {
        //this.Main.graphics.clear()
        //this.dataGroup.setPosition(-150, 0)
        //this.headerGroup.setPosition(0, 0)
        dataIcon.setFrame(51)
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        /*  var tween = this.tweens.add({
           targets: this.advisorGroup,
           x: 0,
           duration: 300
         }) */
        var tween = this.tweens.add({
          targets: this.headerGroup,
          y: 0,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.dataGroup,
          x: -150,
          duration: 300
        })
        dataOn = false
      } else {
        //updateTraffic()
        //this.Main.drawTrafficGrid()
        //this.dataGroup.setPosition(0, 0)
        //this.headerGroup.setPosition(0, -500)
        dataIcon.setFrame(56)
        advisorIcon.setFrame(54)
        advisorOn = false
        var tween = this.tweens.add({
          targets: this.advisorGroup,
          x: -150,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.headerGroup,
          y: -500,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.dataGroup,
          x: 0,
          duration: 300
        })
        dataOn = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)


    var advisorOn = false
    var advisorIcon = this.add.image(200, 275, 'icons', 54).setOrigin(.5, 0).setScale(3).setInteractive()
    advisorIcon.on('pointerdown', function () {
      if (advisorOn) {
        //this.Main.graphics.clear()
        //this.dataGroup.setPosition(-150, 0)
        //this.headerGroup.setPosition(0, 0)
        advisorIcon.setFrame(54)
        this.Main.graphicsData.clear()
        this.Main.graphicsBorder.clear()
        var tween = this.tweens.add({
          targets: this.advisorGroup,
          x: -150,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.headerGroup,
          y: 0,
          duration: 300
        })
        /*  var tween = this.tweens.add({
           targets: this.dataGroup,
           x: -150,
           duration: 300
         }) */
        advisorOn = false
      } else {
        //updateTraffic()
        //this.Main.drawTrafficGrid()
        //this.dataGroup.setPosition(0, 0)
        //this.headerGroup.setPosition(0, -500)
        advisorIcon.setFrame(55)
        dataIcon.setFrame(51)
        dataOn = false
        var tween = this.tweens.add({
          targets: this.advisorGroup,
          x: 0,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.headerGroup,
          y: -500,
          duration: 300
        })
        var tween = this.tweens.add({
          targets: this.dataGroup,
          x: -150,
          duration: 300
        })
        advisorOn = true
      }

      /*  this.scene.launch('Rci')
       this.scene.pause()
       this.scene.pause('playGame')
       this.scene.pause('Menu') */
    }, this)










    var homeIcon = this.add.image(825, 1575, 'settings').setOrigin(.5).setScale(3.5).setInteractive();
    homeIcon.on('pointerdown', function () {
      this.scene.launch('Settings')
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
    var yeargoal = 1905
    ///////////////////////////////
    // Day Counter
    //////////////////////////////
    this.day = this.time.addEvent({
      delay: gameRules.dayLength,
      callback: function () {

        sim.gameData.day++
        var newYear = false
        var fiveYear = false
        this.popText.setText('P: ' + sim.gameData.population)
        if (sim.gameData.day == 13) {
          sim.gameData.year++
          newYear = true
          sim.gameData.day = 1
        }
        if (sim.gameData.year == yeargoal) {
          fiveYear = true
          yeargoal += 5
        }
        this.events.emit('endDay');
        sim.endDay(newYear, fiveYear)
        this.yearText.setText(this.month[sim.gameData.day] + ' ' + sim.gameData.year)
        // this.scoreText.setText(sim.gameData.day);
        this.fundsText.setText(formatter.format(sim.gameData.funds))
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
    // this.progress.displayHeight = 160 * (this.day.getElapsed() / gameRules.dayLength)
    this.circularProgress.setValue(this.day.getElapsed() / gameRules.dayLength)
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