class People extends Phaser.Scene {

  constructor() {

    super("People");
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

    /* var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
    tablebg.displayWidth = 900
    tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 1025, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 950
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(858, 562, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    var lawIcon = this.add.image(42, 562, 'icons_clear', 38).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(1);
    this.nameText = this.add.text(100, 547, 'Cititzen Data ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })

    //thumb

    //gameStats.population = 80

    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'Citizen Data', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var workers = sim.getWorkers()

    this.popText = this.add.bitmapText(25, 625, 'topaz', 'Pop: ' + sim.gameData.population + ' Workers: ' + workers, 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();
    this.housingText = this.add.bitmapText(25, 700, 'topaz', 'Housing Capacity: ' + sim.getTotalResCapacity(), 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();

    console.log(sim.gameData.zoneCounts)
    //console.log(roadInRange(tile.xy))
    /* if (tile.hasBuilding) {
      console.log(tile.building.frame.name)
      console.log(tile.building.texture.key)
    } else {
      console.log('no building')
    } */

    //
    var tablebg_break = this.add.image(game.config.width / 2, 908, 'modal_break').setOrigin(.5, 1);
    this.tablebg_tab = this.add.image(game.config.width / 2, 950, 'modal_tab', 0).setOrigin(.5, 1);
    this.eduText = this.add.text(50, 940, 'Education', { fontFamily: 'PixelFont', fontSize: '30px', color: '#E1803F', align: 'left' }).setOrigin(0, 1).setInteractive()
    this.eduText.on('pointerdown', function () {
      this.tablebg_tab.setFrame(0)
      this.eqGroup.setAlpha(1)
      this.hqGroup.setAlpha(0)
    }, this)
    this.healthText = this.add.text(500, 940, 'Health', { fontFamily: 'PixelFont', fontSize: '30px', color: '#E1803F', align: 'left' }).setOrigin(0, 1).setInteractive()
    this.healthText.on('pointerdown', function () {
      this.tablebg_tab.setFrame(1)
      this.eqGroup.setAlpha(0)
      this.hqGroup.setAlpha(1)
    }, this)

    var chart = this.add.image(450, 1550, 'chart').setOrigin(.5, 1)
    ////////////////////////////////////
    // eq
    ////////////////////////////////////
    //close screen E1803F
    this.eqGroup = this.add.container()

    for (var i = 0; i < sim.gameData.generations.length; i++) {
      if (i > 4 && i < 13) {
        var color = 0xE1803F
      } else {
        var color = 0xC0403F
      }

      var test = new ChartBar(this, 65 + i * 43, 1545, sim.gameData.generations[i].EQ, 150, color, this.eqGroup)
      var text = this.add.bitmapText(65 + i * 43, 1555, 'topaz', ages[i], 35).setOrigin(0).setTint(0xCAD4D8);
      this.eqGroup.add(text)
    }

    var EQ = getEq()
    var eqTitle = this.add.bitmapText(25, 1025, 'topaz', 'EQ - ' + 'Pop: ' + EQ.pEQ + ' WF: ' + EQ.wfEQ, 40).setOrigin(0, 1).setTint(0xCAD4D8);
    this.eqGroup.add(eqTitle)
    var edCap = this.add.bitmapText(600, 1025, 'topaz', 'Capacity ' + sim.gameData.schoolCapacity, 40).setOrigin(0, 1).setTint(0xCAD4D8);
    this.eqGroup.add(edCap)
    this.eqGroup.setAlpha(1)
    ////////////////////////////////////
    // hq
    ////////////////////////////////////
    this.hqGroup = this.add.container()
    //var test1 = new ChartBar(this, 150, 1545, 70, 100)
    var wfHqTotal = 0
    for (var i = 0; i < sim.gameData.generations.length; i++) {
      if (i > 4 && i < 13) {
        var color = 0xE1803F
        wfHqTotal += sim.gameData.generations[i].HQ
      } else {
        var color = 0xC0403F
      }
      var test = new ChartBar(this, 65 + i * 43, 1545, sim.gameData.generations[i].HQ, 100, color, this.hqGroup)

      var text = this.add.bitmapText(65 + i * 43, 1555, 'topaz', ages[i], 35).setOrigin(0).setTint(0xCAD4D8);
      this.hqGroup.add(text)
    }
    var HQ = getHq()
    var hqTitle = this.add.bitmapText(25, 1025, 'topaz', 'EQ - ' + 'Pop: ' + HQ.pHQ + ' WF: ' + HQ.wfHQ, 40).setOrigin(0, 1).setTint(0xCAD4D8);
    this.hqGroup.add(hqTitle)
    var hosCap = this.add.bitmapText(600, 1025, 'topaz', 'Capacity ' + sim.gameData.hospitalCapacity, 40).setOrigin(0, 1).setTint(0xCAD4D8);
    this.hqGroup.add(hosCap)
    this.hqGroup.setAlpha(0)

    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
}



class ChartBar {

  constructor(scene, x, y, value, max, color, group) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.value = value;
    this.max = max
    this.barHeight = 450
    this.color = color
    this.draw();

    scene.add.existing(this.bar);
    group.add(this.bar)
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return (this.value === 0);
  }

  draw() {
    this.bar.clear();

    //  BG
    //this.bar.fillStyle(0x000000);
    // this.bar.fillRect(this.x, this.y, 20, -200);

    //  Health

    this.bar.fillStyle(0xffffff, 0);
    this.bar.fillRect(this.x, this.y, 35, -this.barHeight);

    if (this.value < 30) {
      this.bar.fillStyle(this.color);
    }
    else {
      this.bar.fillStyle(this.color);
    }

    var d = Math.floor(this.barHeight * (this.value / this.max));

    this.bar.fillRect(this.x, this.y, 35, -d);
  }

}