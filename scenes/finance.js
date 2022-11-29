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

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 1300, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 1225
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    var tablebg_break = this.add.image(game.config.width / 2, 1350, 'modal_break').setOrigin(.5, 1);
    this.tablebg_tab = this.add.image(game.config.width / 2, game.config.height - 1260, 'modal_tab', 0).setOrigin(.5, 1);
    this.closeIcon = this.add.image(858, 287, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    var financeIcon = this.add.image(42, 287, 'icons_clear', 28).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(1);
    this.nameText = this.add.text(100, 272, 'Finances ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })

    this.incomeGroup = this.add.container()
    this.expendituresGroup = this.add.container()

    this.tab = 0
    this.incomeTabText = this.add.text(225, game.config.height - 1273, 'Income', { fontFamily: 'PixelFont', fontSize: '25px', color: '#C0D7E2', align: 'left' }).setOrigin(.5, 1).setInteractive()
    this.incomeTabText.on('pointerdown', function () {
      this.tablebg_tab.setFrame(0)
      this.incomeGroup.setAlpha(1)
      this.expendituresGroup.setAlpha(0)
    }, this)
    this.expendituresTabText = this.add.text(675, game.config.height - 1273, 'Expenditures', { fontFamily: 'PixelFont', fontSize: '25px', color: '#C0D7E2', align: 'left' }).setOrigin(.5, 1).setInteractive()
    this.expendituresTabText.on('pointerdown', function () {
      this.tablebg_tab.setFrame(1)
      this.incomeGroup.setAlpha(0)
      this.expendituresGroup.setAlpha(1)
    }, this)

    this.incomeGroup = this.add.container()

    this.consumptionText = this.add.text(25, 425, 'Tax Rates', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })
    this.incomeGroup.add(this.consumptionText)
    //res slider
    var rtLabel = this.add.bitmapText(25, 525, 'topaz', 'R: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(rtLabel)
    var rtText = this.add.bitmapText(75, 525, 'topaz', sim.gameData.taxRates[0], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(rtText)
    /* R   0.0035
    C   0.0045
    I   0.0050 */
    // 0.07 X 50000 X 40 X 0.0050 X 12
    // TR x pop x LV x Modifier x months
    //var resIncome = Math.round(sim.gameData.taxRates[0] * sim.gameData.population * 22 * 0.0035)
    var rIText = this.add.bitmapText(625, 525, 'topaz', getResTaxIncome(), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(rIText)
    var minz = 0,
      maxz = 20,
      rangez = maxz - minz,
      gap = 1;
    var rtSlider = this.rexUI.add.slider({
      x: 375,
      y: 525,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[0] / rangez,
      gap: gap / rangez,
      valuechangeCallback: function (value) {
        value = (value * rangez) + minz;
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
    this.incomeGroup.add(rtSlider)

    //com slider
    var ctlabel = this.add.bitmapText(25, 600, 'topaz', 'C: ', 35).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.incomeGroup.add(ctlabel)
    var ctText = this.add.bitmapText(75, 600, 'topaz', sim.gameData.taxRates[1], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(ctText)
    /* R   0.0035
    C   0.0045
    I   0.0050 */
    // 0.07 X 50000 X 40 X 0.0050 X 12
    // TR x pop x LV x Modifier x months

    var cIText = this.add.bitmapText(625, 600, 'topaz', getComTaxIncome(), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(cIText)
    var ctSlider = this.rexUI.add.slider({
      x: 375,
      y: 600,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[1] / rangez,
      gap: gap / rangez,
      valuechangeCallback: function (value) {
        value = (value * rangez) + minz;
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
    this.incomeGroup.add(ctSlider)

    //ind slider
    var itLabel = this.add.bitmapText(25, 675, 'topaz', 'I: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(itLabel)
    var itText = this.add.bitmapText(75, 675, 'topaz', sim.gameData.taxRates[2], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(itText)

    var iIText = this.add.bitmapText(625, 675, 'topaz', getIndTaxIncome(), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.incomeGroup.add(iIText)
    var itSlider = this.rexUI.add.slider({
      x: 375,
      y: 675,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: sim.gameData.taxRates[2] / rangez,
      gap: gap / rangez,
      valuechangeCallback: function (value) {
        value = (value * rangez) + minz;
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
    this.incomeGroup.add(itSlider)
    /////////
    // Expenditures sliders
    /////////
    //power slider
    //var powerSLabel = this.add.bitmapText(25, 525, 'topaz', 'P: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var powerIcon = this.add.image(5, 525, 'icons_clear', 6).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(powerIcon)
    var powerSText = this.add.bitmapText(75, 525, 'topaz', sim.gameData.maintenanceCostsPer[9], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(powerSText)

    var powerSDollarText = this.add.bitmapText(625, 525, 'topaz', formatter.format(getPowerMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(powerSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var powersSlider = this.rexUI.add.slider({
      x: 375,
      y: 525,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[9] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        powerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[9] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[9] + (sim.gameData.maintenanceCosts[9] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[9] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[9] = Math.round(newspend)

        powerSDollarText.setText(formatter.format(getPowerMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(powersSlider)
    /// end power slider
    //police slider
    //var policeSLabel = this.add.bitmapText(25, 600, 'topaz', 'P: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var policeIcon = this.add.image(5, 600, 'icons_clear', 48).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(policeIcon)
    var policeSText = this.add.bitmapText(75, 600, 'topaz', sim.gameData.maintenanceCostsPer[14], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(policeSText)

    var policeSDollarText = this.add.bitmapText(625, 600, 'topaz', formatter.format(getPoliceMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(policeSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var policeSlider = this.rexUI.add.slider({
      x: 375,
      y: 600,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[14] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        policeSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[14] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[14] + (sim.gameData.maintenanceCosts[14] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[14] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[14] = Math.round(newspend)

        policeSDollarText.setText(formatter.format(getPoliceMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(policeSlider)
    /// end police slider
    //fire slider
    //var fireSLabel = this.add.bitmapText(25, 675, 'topaz', 'F: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var fireIcon = this.add.image(5, 675, 'icons_clear', 50).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(fireIcon)
    var firePerSText = this.add.bitmapText(75, 675, 'topaz', sim.gameData.maintenanceCostsPer[15], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(firePerSText)

    var fireSDollarText = this.add.bitmapText(625, 675, 'topaz', formatter.format(getFireMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(fireSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var fireSlider = this.rexUI.add.slider({
      x: 375,
      y: 675,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[15] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        firePerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[15] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[15] + (sim.gameData.maintenanceCosts[15] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[15] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[15] = Math.round(newspend)

        fireSDollarText.setText(formatter.format(getFireMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(fireSlider)
    /// end fire slider
    //Health slider
    //var healthSLabel = this.add.bitmapText(25, 750, 'topaz', 'H: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var healthIcon = this.add.image(5, 750, 'icons_clear', 52).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(healthIcon)
    var healthPerSText = this.add.bitmapText(75, 750, 'topaz', sim.gameData.maintenanceCostsPer[13], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(healthPerSText)

    var healthSDollarText = this.add.bitmapText(625, 750, 'topaz', formatter.format(getHealthMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(healthSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var healthSlider = this.rexUI.add.slider({
      x: 375,
      y: 750,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[13] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        healthPerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[13] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[13] + (sim.gameData.maintenanceCosts[13] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[13] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[13] = Math.round(newspend)

        healthSDollarText.setText(formatter.format(getHealthMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(healthSlider)
    /// end health slider
    //education and culture slider
    /// var educationSLabel = this.add.bitmapText(25, 825, 'topaz', 'E: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var educationIcon = this.add.image(5, 825, 'icons_clear', 22).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(educationIcon)

    var educationPerSText = this.add.bitmapText(75, 825, 'topaz', sim.gameData.maintenanceCostsPer[16], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(educationPerSText)

    var educationSDollarText = this.add.bitmapText(625, 825, 'topaz', formatter.format(getEducationMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(educationSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var educationSlider = this.rexUI.add.slider({
      x: 375,
      y: 825,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[16] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        educationPerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[16] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[16] + (sim.gameData.maintenanceCosts[16] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[16] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[16] = Math.round(newspend)
        educationSDollarText.setText(formatter.format(getEducationMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(educationSlider)
    /// end education slider
    //parks slider
    //var parksSLabel = this.add.bitmapText(25, 900, 'topaz', 'P: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var parkIcon = this.add.image(5, 900, 'icons_clear', 30).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(parkIcon)

    var parksPerSText = this.add.bitmapText(75, 900, 'topaz', sim.gameData.maintenanceCostsPer[18], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(parksPerSText)

    var parksSDollarText = this.add.bitmapText(625, 900, 'topaz', formatter.format(getParksMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(parksSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var parksSlider = this.rexUI.add.slider({
      x: 375,
      y: 900,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[18] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        parksPerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[18] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[18] + (sim.gameData.maintenanceCosts[18] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[18] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[18] = Math.round(newspend)
        parksSDollarText.setText(formatter.format(getParksMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(parksSlider)
    /// end parks slider
    //transportation slider
    //var transportationSLabel = this.add.bitmapText(25, 975, 'topaz', 'T: ', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    var transIcon = this.add.image(5, 975, 'icons_clear', 10).setOrigin(0, .5).setScale(2).setInteractive().setAlpha(1);
    this.expendituresGroup.add(transIcon)

    var transportationPerSText = this.add.bitmapText(75, 975, 'topaz', sim.gameData.maintenanceCostsPer[23], 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(transportationPerSText)

    var transportationSDollarText = this.add.bitmapText(625, 975, 'topaz', formatter.format(getTransportationMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(transportationSDollarText)
    var min = 50,
      max = 120,
      range = max - min,
      gap = 1;
    var transportationSlider = this.rexUI.add.slider({
      x: 375,
      y: 975,
      width: 400,
      height: 40,
      orientation: 'x',

      track: this.add.image(0, 0, 'slider_track'),
      thumb: this.add.image(0, 0, 'slider_thumb'),
      value: (sim.gameData.maintenanceCostsPer[23] - min) / range,
      gap: gap / range,
      valuechangeCallback: function (value) {
        value = (value * range) + min;
        transportationPerSText.setText(Math.round(value) + '%')
        if (value <= 100) {
          var newspend = (sim.gameData.maintenanceCosts[23] * (value / 100))
        } else {
          var newspend = sim.gameData.maintenanceCosts[23] + (sim.gameData.maintenanceCosts[23] * ((value - 100) / 100))
        }

        sim.gameData.maintenanceCostsPer[23] = Math.round(value)
        sim.gameData.maintenanceCostsSpending[23] = Math.round(newspend)
        transportationSDollarText.setText(formatter.format(getTransportationMaintenanceCost()))

      },
      space: {
        top: 4,
        bottom: 4
      },
      input: 'drag', // 'drag'|'click'
    })
      .layout();
    this.expendituresGroup.add(transportationSlider)
    /// end transportation slider

    this.totalFlexibleCostsLabel = this.add.bitmapText(575, 1050, 'topaz', 'Flexible Costs:  ', 35).setOrigin(1, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(this.totalFlexibleCostsLabel)
    this.totalFlexibleCostsText = this.add.bitmapText(625, 1050, 'topaz', formatter.format(getTotalFlexibleMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(this.totalFlexibleCostsText)

    this.totalFixedCostsLabel = this.add.bitmapText(575, 1125, 'topaz', 'Fixed Costs:  ', 35).setOrigin(1, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(this.totalFixedCostsLabel)
    this.totalFixedCostsText = this.add.bitmapText(625, 1125, 'topaz', formatter.format(getTotalFixedMaintenanceCost()), 35).setOrigin(0, .5).setTint(0xC0D7E2)
    this.expendituresGroup.add(this.totalFixedCostsText)
    //////////////////////////////

    this.maintenanceText = this.add.text(25, 425, 'Maintenance Costs', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })
    this.expendituresGroup.add(this.maintenanceText)
    /*  var totalCost = getTotalMaintenanceCost() */
    var totalCostsLabel = this.add.bitmapText(575, 1435, 'topaz', 'Expenditures:  ', 35).setOrigin(1, .5).setTint(0xC0D7E2)
    //this.expendituresGroup.add(totalCostsLabel)
    this.totalCostsText = this.add.bitmapText(625, 1435, 'topaz', '--', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    //this.expendituresGroup.add(this.totalCostsText)
    this.expendituresGroup.setAlpha(0)
    ////////////////////////////
    this.fundsLabelText = this.add.text(25, 1350, 'Funds', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })

    var totalLabel = this.add.bitmapText(575, 1375, 'topaz', 'Income:  ', 35).setOrigin(1, .5).setTint(0xC0D7E2)
    // this.incomeGroup.add(totalLabel)
    this.incomeTotalText = this.add.bitmapText(625, 1375, 'topaz', '--', 35).setOrigin(0, .5).setTint(0xC0D7E2)
    //this.incomeGroup.add(this.incomeTotalText)

    var balanceLabel = this.add.bitmapText(575, 1495, 'topaz', 'Balance:  ', 35).setOrigin(1, .5).setTint(0xC0D7E2)
    this.balanceText = this.add.bitmapText(625, 1495, 'topaz', '--', 35).setOrigin(0, .5).setTint(0xC0D7E2)

    this.plusminus = this.add.image(625, 1565, 'arrows', 0).setOrigin(1, .5).setScale(1.5)
    var newFundsLabel = this.add.bitmapText(575, 1565, 'topaz', 'Projected Funds:  ', 40).setOrigin(1, .5).setTint(0xC0D7E2)
    this.newFundsText = this.add.bitmapText(625, 1565, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xC0D7E2)

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
    powersSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    policeSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    fireSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    healthSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    educationSlider.on('valuechange', function (newValue, oldValue, slider) {
      this.updateTotals()
    }, this);
    parksSlider.on('valuechange', function (newValue, oldValue, slider) {
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
    this.totalFlexibleCostsText.setText(formatter.format(getTotalFlexibleMaintenanceCost()))
    this.totalFixedCostsText.setText(formatter.format(getTotalFixedMaintenanceCost()))
    var totalI = getResTaxIncome() + getComTaxIncome() + getIndTaxIncome()
    this.incomeTotalText.setText(formatter.format(totalI))
    var totalCost = getTotalMaintenanceCost()
    this.totalCostsText.setText(formatter.format(totalCost))

    this.balanceText.setText()
    var balance = totalI - totalCost
    if (Math.sign(balance) == 1) {
      this.plusminus.setFrame(0)
    } else {
      this.plusminus.setFrame(1)
    }
    this.balanceText.setText(formatter.format(balance))
    var newfunds = sim.gameData.funds + balance
    this.newFundsText.setText(formatter.format(newfunds))

  }
}


//console.log(formatter.format(2500)); /* $2,500.00 */