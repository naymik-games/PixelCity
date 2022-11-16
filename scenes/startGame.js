class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

  }
  create() {

    /* gameDataSaved = JSON.parse(localStorage.getItem('PixelCityData'));
    if (gameDataSaved === null || gameDataSaved.length <= 0) {
      localStorage.setItem('PixelCityData', JSON.stringify(gameStats));
      gameDataSaved = gameStats
    } */




    /* localforage.getItem('PixelCityData1').then(function (value) {
      // This code runs once the value has been loaded
      // from the offline store.
      //gameDataSaved = value
      console.log(value)
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    }); */





    this.cameras.main.setBackgroundColor(0x091D48);


    var tablebg_top = this.add.image(game.config.width / 2, 0, 'modal_top').setOrigin(.5, 0);
    var tablebg_mid = this.add.image(game.config.width / 2, 75, 'modal_mid').setOrigin(.5, 0);
    tablebg_mid.displayHeight = 1490
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);

    this.nameText = this.add.text(100, 7, 'PixelCity ', { fontFamily: 'PixelFont', fontSize: '32px', color: '#c76210', align: 'left', backgroundColor: '#A6CAF0' })




    //var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCity', 150).setOrigin(.5).setTint(0xc76210);
    //var title = this.add.text(game.config.width / 2, 100, 'PixelCity', { fontFamily: 'PixelFont', fontSize: '75px', color: '#c76210', align: 'center' }).setOrigin(.5);



    mapConfig = mapConfigs[1]

    //////////////////////////////////////////////////////////////////
    // MAP SIZE
    //////////////////////////////////////////////////////////////////


    this.sizeRadioContainer = this.add.container(0, 150)
    this.sizeRadios = []

    var sizeRadioLabel = this.add.text(100, 0, 'City Size', { fontFamily: 'PixelFont', fontSize: '30px', fontStyle: 'bold', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.sizeRadioContainer.add(sizeRadioLabel)
    var radio1 = this.add.image(100, 75, 'radio', 3)
    this.sizeRadioContainer.add(radio1)
    this.sizeRadios.push(radio1)
    var radio1Text = this.add.text(radio1.x + 50, 75, 'Micro', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.sizeRadioContainer.add(radio1Text)
    radio1Text.on('pointerdown', function () {
      this.sizeHandler(0)
    }, this);

    var radio2 = this.add.image(500, 75, 'radio', 2)
    this.sizeRadioContainer.add(radio2)
    this.sizeRadios.push(radio2)
    var radio2Text = this.add.text(radio2.x + 50, 75, 'small', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.sizeRadioContainer.add(radio2Text)
    radio2Text.on('pointerdown', function () {
      this.sizeHandler(1)
    }, this);

    var radio3 = this.add.image(100, 150, 'radio', 3)
    this.sizeRadios.push(radio3)
    this.sizeRadioContainer.add(radio3)
    var radio3Text = this.add.text(radio3.x + 50, 150, 'Medium', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.sizeRadioContainer.add(radio3Text)
    radio3Text.on('pointerdown', function () {
      this.sizeHandler(2)
    }, this);

    var radio4 = this.add.image(500, 150, 'radio', 3)
    this.sizeRadios.push(radio4)
    this.sizeRadioContainer.add(radio4)
    var radio4Text = this.add.text(radio4.x + 50, 150, 'large', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.sizeRadioContainer.add(radio4Text)
    radio4Text.on('pointerdown', function () {
      this.sizeHandler(3)
    }, this);







    //////////////////////////////////////////////////////////////////
    // WATER AMOUNT
    //////////////////////////////////////////////////////////////////

    this.water = 1


    this.waterRadioContainer = this.add.container(0, 400)
    this.waterRadios = []

    var waterRadioLabel = this.add.text(100, 0, 'Water Amount', { fontFamily: 'PixelFont', fontSize: '30px', fontStyle: 'bold', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.waterRadioContainer.add(waterRadioLabel)
    var radio1 = this.add.image(100, 75, 'radio', 3)
    this.waterRadioContainer.add(radio1)
    this.waterRadios.push(radio1)
    var wradio1Text = this.add.text(radio1.x + 50, 75, 'Very Dry', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.waterRadioContainer.add(wradio1Text)
    wradio1Text.on('pointerdown', function () {
      this.waterHandler(0)
    }, this);

    var radio2 = this.add.image(500, 75, 'radio', 2)
    this.waterRadioContainer.add(radio2)
    this.waterRadios.push(radio2)
    var wradio2Text = this.add.text(radio2.x + 50, 75, 'Normal', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.waterRadioContainer.add(wradio2Text)
    wradio2Text.on('pointerdown', function () {
      this.waterHandler(1)
    }, this);

    var radio3 = this.add.image(100, 150, 'radio', 3)
    this.waterRadios.push(radio3)
    this.waterRadioContainer.add(radio3)
    var wradio3Text = this.add.text(radio3.x + 50, 150, 'Even', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.waterRadioContainer.add(wradio3Text)
    wradio3Text.on('pointerdown', function () {
      this.waterHandler(2)
    }, this);

    var radio4 = this.add.image(500, 150, 'radio', 3)
    this.waterRadios.push(radio4)
    this.waterRadioContainer.add(radio4)
    var wradio4Text = this.add.text(radio4.x + 50, 150, 'Very Wet', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.waterRadioContainer.add(wradio4Text)
    wradio4Text.on('pointerdown', function () {
      this.waterHandler(3)
    }, this);


    //////////////////////////////////////////////////////////////////
    // SEED
    //////////////////////////////////////////////////////////////////
    this.seed = 3990765355
    this.terrainRadios = []
    this.seedContainer = this.add.container(0, 650)
    var seedLabel = this.add.text(100, 0, 'Terrain Seed', { fontFamily: 'PixelFont', fontSize: '30px', fontStyle: 'bold', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.seedContainer.add(seedLabel)

    var radioC = this.add.image(100, seedLabel.y + 85, 'radio', 3)
    this.terrainRadios.push(radioC)
    this.seedContainer.add(radioC)
    this.inputText = this.add.rexInputText(400, seedLabel.y + 85, 500, 65, {
      type: 'text',
      text: '',
      fontFamily: 'PixelFont',
      placeholder: 'custom seed',
      fontSize: '30px',
      border: 8,
      borderColor: '#091D48',
      paddingLeft: 15,
      paddingRight: 5,
      paddingTop: 3,
      paddingBottom: 3
    })
    this.seedContainer.add(this.inputText)
    this.inputText.on('focus', function (inputText, e) {
      this.seedHandler(0)
    }, this)


    var radioR = this.add.image(100, this.inputText.y + 75, 'radio', 2)
    this.terrainRadios.push(radioR)
    this.seedContainer.add(radioR)
    var radioRText = this.add.text(radioR.x + 50, radioR.y, 'default', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.seedContainer.add(radioRText)
    radioRText.on('pointerdown', function () {
      this.seedHandler(1)
    }, this);


    var radioD = this.add.image(500, this.inputText.y + 75, 'radio', 3)
    this.terrainRadios.push(radioD)
    this.seedContainer.add(radioD)
    var radioDText = this.add.text(radioD.x + 50, radioD.y, 'radnom', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    this.seedContainer.add(radioDText)
    radioDText.on('pointerdown', function () {
      this.seedHandler(2)
    }, this);

    //////////////////////////////////////////////////////////////////
    // NEW GAME
    //////////////////////////////////////////////////////////////////

    var newGameButton = this.add.image(game.config.width / 2, 925, 'start_buttons', 0).setScale(1.5)
    //var newGameButton = this.add.text(game.config.width / 2, 1025, 'New Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    newGameButton.setInteractive();
    newGameButton.on('pointerdown', this.clickHandler, this);

    ////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    // LOAD GAME
    //////////////////////////////////////////////////////////////////

    var loadGameButton = this.add.image(game.config.width / 2, 1375, 'start_buttons', 1).setScale(1.5)
    //var loadGameButton = this.add.text(game.config.width / 2, 1375, 'Continue Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    var trash = this.add.image(game.config.width / 2, 1550, 'trash').setScale(2.25)


    gameDataSaved = JSON.parse(localStorage.getItem('PixelCityData'));
    if (gameDataSaved === null || gameDataSaved.length <= 0) {
      trash.disableInteractive()
      gameDataSaved = gameStats
      loadGameButton.setTint(0xcccccc).setAlpha(.5)
      trash.setTint(0xcccccc).setAlpha(.5)
      var d = 'N/A'
      var f = '--'
      var p = 'N/A'
    } else {
      loadGameButton.setInteractive();
      trash.setInteractive();
      var d = gameDataSaved.day
      var f = gameDataSaved.funds
      var p = gameDataSaved.population


    }
    loadGameButton.on('pointerdown', this.clickHandler2, this);

    var day = this.add.bitmapText(50, 1450, 'topaz', 'Day: ' + d, 50).setOrigin(0, .5).setTint(0xF0B060);
    var funds = this.add.bitmapText(450, 1450, 'topaz', formatter.format(f), 50).setOrigin(.5, .5).setTint(0xF0B060);
    var pop = this.add.bitmapText(850, 1450, 'topaz', 'Pop: ' + p, 50).setOrigin(1, .5).setTint(0xF0B060);



    trash.on('pointerdown', function () {
      localStorage.removeItem('PixelCityData');
      localforage.removeItem('PixelCityGrid1').then(function () {
        // Run this code once the key has been removed.
        console.log('Key is cleared!');
      }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
      loadGameButton.disableInteractive();
      trash.disableInteractive()
      day.setText('Day: N/A')
      funds.setText('$ --')
      pop.setText('Pop: N/A')
      loadGameButton.setTint(0xcccccc).setAlpha(.5)
      trash.setTint(0xcccccc).setAlpha(.5)
    }, this)


  }
  sizeHandler(radio) {
    for (var i = 0; i < this.sizeRadios.length; i++) {
      this.sizeRadios[i].setFrame(3)
    }
    this.sizeRadios[radio].setFrame(2)
    mapConfig = mapConfigs[radio]
  }
  waterHandler(radio) {
    for (var i = 0; i < this.waterRadios.length; i++) {
      this.waterRadios[i].setFrame(3)
    }
    this.waterRadios[radio].setFrame(2)
    this.water = radio
  }
  seedHandler(radio) {
    for (var i = 0; i < this.terrainRadios.length; i++) {
      this.terrainRadios[i].setFrame(3)
    }
    if (radio != 0) {
      this.inputText.setBlur();
    }
    this.terrainRadios[radio].setFrame(2)

    if (radio == 0) {
      this.seed = this.inputText.text
    } else if (radio == 1) {
      this.seed = 3990765355
    } else if (radio == 2) {
      this.seed = Math.floor(Math.random() * 899999 + 100000)
    }
    //this.water = radio
  }
  clickHandler() {
    mapLoad = 'new'
    mapConfig.water = this.water
    mapConfig.seed = this.seed
    this.scene.start('playGame');
    this.scene.launch('Menu');
  }
  clickHandler2() {
    mapLoad = 'load'
    this.scene.start('playGame');
    this.scene.launch('Menu');
  }
}