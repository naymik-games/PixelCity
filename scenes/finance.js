class Finance extends Phaser.Scene {

  constructor() {

    super("Finance");
  }
  preload() {
    /*    this.load.scenePlugin({
         key: 'rexuiplugin',
         url: '../classes/uiplug.min.js',
         //  url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
         sceneKey: 'rexUI'
       }); */
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });

  }

  create() {
    this.Main = this.scene.get('playGame');


    /*  var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
     tablebg.displayWidth = 900
     tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 1225, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 1150
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(42, 362, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 347, 'Finances ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })



    this.consumptionText = this.add.text(25, 425, 'Tax Rates', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })

    var rtLabel = this.add.bitmapText(25, 550, 'topaz', 'R: ', 40).setOrigin(0, .5).setTint(0xC0D7E2)
    var rtText = this.add.bitmapText(75, 550, 'topaz', sim.gameData.taxRates[0], 40).setOrigin(0, .5).setTint(0xC0D7E2)

    /* R   0.0035
    C   0.0045
    I   0.0050 */
    // 0.07 X 50000 X 40 X 0.0050 X 12
    // TR x pop x LV x Modifier x months
    //var resIncome = Math.round(sim.gameData.taxRates[0] * sim.gameData.population * 22 * 0.0035)
    var rIText = this.add.bitmapText(625, 550, 'topaz', getResTaxIncome(), 40).setOrigin(0, .5).setTint(0xC0D7E2)
    var min = 0,
      max = 12,
      range = max - min,
      gap = 1;
    var rtSlider = this.rexUI.add.slider({
      x: 375,
      y: 550,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[0] / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        rtText.setText(Math.round(value) + '%')
        sim.gameData.taxRates[0] = Math.round(value)
        rIText.setText(formatter.format(getResTaxIncome()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();

    var ctlabel = this.add.bitmapText(25, 650, 'topaz', 'C: ', 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    var ctText = this.add.bitmapText(75, 650, 'topaz', sim.gameData.taxRates[1], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    /* R   0.0035
    C   0.0045
    I   0.0050 */
    // 0.07 X 50000 X 40 X 0.0050 X 12
    // TR x pop x LV x Modifier x months

    var cIText = this.add.bitmapText(625, 650, 'topaz', getComTaxIncome(), 40).setOrigin(0, .5).setTint(0xC0D7E2)
    var ctSlider = this.rexUI.add.slider({
      x: 375,
      y: 650,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[1] / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        ctText.setText(Math.round(value) + '%')
        sim.gameData.taxRates[1] = Math.round(value)
        cIText.setText(formatter.format(getComTaxIncome()))
      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();

    var itLabel = this.add.bitmapText(25, 750, 'topaz', 'I: ', 40).setOrigin(0, .5).setTint(0xC0D7E2)
    var itText = this.add.bitmapText(75, 750, 'topaz', sim.gameData.taxRates[2], 40).setOrigin(0, .5).setTint(0xC0D7E2)


    var iIText = this.add.bitmapText(625, 750, 'topaz', getIndTaxIncome(), 40).setOrigin(0, .5).setTint(0xC0D7E2)
    var itSlider = this.rexUI.add.slider({
      x: 375,
      y: 750,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[2] / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        itText.setText(Math.round(value) + '%')
        sim.gameData.taxRates[2] = Math.round(value)
        iIText.setText(formatter.format(getIndTaxIncome()))
      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();

    var totalLabel = this.add.bitmapText(575, 850, 'topaz', 'Income:  ', 40).setOrigin(1, .5).setTint(0xC0D7E2)
    this.incomeTotalText = this.add.bitmapText(625, 850, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xC0D7E2)

    this.maintenanceText = this.add.text(25, 950, 'Maintenance Costs', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })
    /*  var totalCost = getTotalMaintenanceCost() */
    var totalCostsLabel = this.add.bitmapText(575, 1050, 'topaz', 'Expenditures:  ', 40).setOrigin(1, .5).setTint(0xC0D7E2)
    this.totalCostsText = this.add.bitmapText(625, 1050, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xC0D7E2)


    this.maintenanceText = this.add.text(25, 1150, 'Funds', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })
    this.plusminus = this.add.image(625, 1250, 'arrows', 0).setOrigin(1, .5).setScale(1.5)
    var newFundsLabel = this.add.bitmapText(575, 1250, 'topaz', 'Balance:  ', 40).setOrigin(1, .5).setTint(0xC0D7E2)
    this.newFundsText = this.add.bitmapText(625, 1250, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xC0D7E2)

    this.updateTotals()

    rtSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    ctSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    itSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);


    //close screen

    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
  updateTotals() {
    var totalI = getResTaxIncome() + getComTaxIncome() + getIndTaxIncome()
    this.incomeTotalText.setText(formatter.format(totalI))
    var totalCost = getTotalMaintenanceCost()
    this.totalCostsText.setText(formatter.format(totalCost))
    var balance = totalI - totalCost
    if (Math.sign(balance) == 1) {
      this.plusminus.setFrame(0)
    } else {
      this.plusminus.setFrame(1)
    }
    var newfunds = sim.gameData.funds + balance
    this.newFundsText.setText(formatter.format(newfunds))

  }
}


//console.log(formatter.format(2500)); /* $2,500.00 */