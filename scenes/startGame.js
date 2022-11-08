class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameDataSaved = JSON.parse(localStorage.getItem('PixelCityData'));
    if (gameDataSaved === null || gameDataSaved.length <= 0) {
      localStorage.setItem('PixelCityData', JSON.stringify(gameStats));
      gameDataSaved = gameStats
    }

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


    var newGameButton = this.add.text(game.config.width / 2, 1025, 'New Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    newGameButton.setInteractive();
    newGameButton.on('pointerdown', this.clickHandler, this);

    this.sizeRadios = []
    var radio1 = this.add.image(100, 200, 'radio', 3)
    this.sizeRadios.push(radio1)
    var radio1Text = this.add.text(radio1.x + 50, 200, 'Micro', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    radio1Text.on('pointerdown', function () {
      this.sizeHandler(0)
    }, this);

    var radio2 = this.add.image(500, 200, 'radio', 2)
    this.sizeRadios.push(radio2)
    var radio2Text = this.add.text(radio2.x + 50, 200, 'small', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    radio2Text.on('pointerdown', function () {
      this.sizeHandler(1)
    }, this);

    var radio3 = this.add.image(100, 275, 'radio', 3)
    this.sizeRadios.push(radio3)
    var radio3Text = this.add.text(radio3.x + 50, 275, 'Medium', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    radio3Text.on('pointerdown', function () {
      this.sizeHandler(2)
    }, this);

    var radio4 = this.add.image(500, 275, 'radio', 3)
    this.sizeRadios.push(radio4)
    var radio4Text = this.add.text(radio4.x + 50, 275, 'large', { fontFamily: 'PixelFont', fontSize: '30px', color: '#CAD4D8', align: 'left' }).setOrigin(0, .5).setInteractive();
    radio4Text.on('pointerdown', function () {
      this.sizeHandler(3)
    }, this);

    var loadGameButton = this.add.text(game.config.width / 2, 1375, 'Continue Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    loadGameButton.setInteractive();
    loadGameButton.on('pointerdown', this.clickHandler2, this);
    var day = this.add.bitmapText(50, 1450, 'topaz', 'Day: ' + gameDataSaved.day, 50).setOrigin(0, .5).setTint(0xF0B060);
    var funds = this.add.bitmapText(450, 1450, 'topaz', '$' + gameDataSaved.funds, 50).setOrigin(.5, .5).setTint(0xF0B060);
    var pop = this.add.bitmapText(850, 1450, 'topaz', 'Pop: ' + gameDataSaved.population, 50).setOrigin(1, .5).setTint(0xF0B060);
  }
  sizeHandler(radio) {
    for (var i = 0; i < this.sizeRadios.length; i++) {
      this.sizeRadios[i].setFrame(3)
    }
    this.sizeRadios[radio].setFrame(2)
    mapConfig = mapConfigs[radio]
  }
  clickHandler() {
    mapLoad = 'new'
    this.scene.start('playGame');

    this.scene.launch('Menu');
  }
  clickHandler2() {
    mapLoad = 'load'

    this.scene.start('playGame');

    this.scene.launch('Menu');
  }
}