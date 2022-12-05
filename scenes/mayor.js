class Mayor extends Phaser.Scene {

  constructor() {

    super("Mayor");
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


    /*  var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
     tablebg.displayWidth = 900
     tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 825, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 750
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(858, 762, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    var lawIcon = this.add.image(42, 762, 'icons_clear', 60).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(1);
    this.nameText = this.add.text(100, 747, 'Mayor Data ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })




    //thumb

    //gameStats.population = 80


    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'Power', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();


    var avgPol = getAveragePollution()
    var p = scaleValue(avgPol, [-500, 500], [0, 10], true)
    var averCon = getAverageCongestion()
    var c = scaleValue(averCon, [0, 25], [0, 10], true)
    var avLV = sim.gameData.averageLV
    var l = scaleValue(avLV, [-700, 700], [0, 10], true)
    var averCrime = getAverageCrimeAfterCoverage()
    var cr = scaleValue(averCrime, [-25, 25], [0, 10], true)
    var eq = getEq()
    var e = scaleValue(eq.pEQ, [0, 100], [0, 10], true)
    var hq = getHq()
    var h = scaleValue(hq.pHQ, [0, 100], [0, 10], true)
    this.consumptionText = this.add.text(25, 825, 'Stats', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })

    this.acText = this.add.bitmapText(25, 925, 'topaz', 'Average Pollution: ' + avgPol + ' ' + p, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.fundText = this.add.bitmapText(25, 1000, 'topaz', 'Average Congestion: ' + averCon + ' ' + c, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.psRadText = this.add.bitmapText(25, 1075, 'topaz', 'Average Land Value: ' + avLV + ' ' + l, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.phRadText = this.add.bitmapText(25, 1150, 'topaz', 'Average Crime: ' + averCrime + ' ' + cr, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.eqText = this.add.bitmapText(25, 1225, 'topaz', 'EQ: ' + eq.pEQ + ' ' + e, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.hqText = this.add.bitmapText(25, 1300, 'topaz', 'HQ: ' + hq.pHQ + ' ' + h, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    /* this.totalText = this.add.bitmapText(23, 1000, 'topaz', 'Total: ' + consumption[4], 50).setOrigin(0, .5).setTint(0xF0B060).setInteractive(); */
    var rating = Math.round((p + c + l + cr + e + h) / 6)
    this.ratingText = this.add.bitmapText(25, 1375, 'topaz', 'Mayor Rating: ' + rating, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    /* this.consumptionText = this.add.text(25, 1100, 'Capacity', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' }) */




    //close screen

    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
}