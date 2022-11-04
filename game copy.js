let game;


window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    /*   render: {
        antialiasGL: false,
        pixelArt: true,
      }, */
    scene: [preloadGame, startGame, playGame, UI]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {

    super('playGame');


  }
  create() {

    this.cameras.main.setBackgroundColor(0xbbbbbb);
    //this.widthHalf = 35
    // this.heightHalf = 20
    //// this.xOffset = 0
    // this.yOffset = 0

    this.tile_map = [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    ]



    this.graphics = this.add.graphics(),
      this.graphics.lineStyle(5, 0x262B44, 2);
    this.graphics.fillStyle(0x00ff00, 1)

    this.tileColumnOffset = 34, // pixels tile width
      this.tileRowOffset = 17, // pixels tile height




      this.Xtiles = 10, //x number of tiles
      this.Ytiles = 10, //y number of tiles
      this.originX = 0, // offset from left
      this.originY = 0, // offset from top
      this.originX = game.config.width / 2 - this.Xtiles * this.tileColumnOffset / 2;
    this.originY = game.config.height / 2;

    this.redrawTiles()
    var offX = 4 * this.tileColumnOffset / 2 + 3 * this.tileColumnOffset / 2 + this.originX;
    var offY = 3 * this.tileRowOffset / 2 - 4 * this.tileRowOffset / 2 + this.originY;
    // var tile = this.add.image(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, 'tiles', 1).setOrigin(.5, 1)

    this.input.on("pointerdown", this.tileSelect, this);

    this.cameras.main.setZoom(4)
    this.coordText = this.add.bitmapText(game.config.width / 2, 150, 'topaz', '--', 50).setOrigin(.5).setTint(0x000000);
    /*  this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {

  }
  tileSelect(p) {
    /* var coo = this.screenToMap(p.x - this.xOffset, p.y - this.yOffset)
    console.log(coo) */
    var pageX = p.x - this.tileColumnOffset / 2 - this.originX;
    var pageY = p.y - this.tileRowOffset / 2 - this.originY;
    var tileX = Math.round(pageX / this.tileColumnOffset - pageY / this.tileRowOffset);
    var tileY = Math.round(pageX / this.tileColumnOffset + pageY / this.tileRowOffset);
    if (tileX < 0 || tileX > this.Xtiles - 1 || tileY < 0 || tileY > this.Ytiles - 1) { return }
    console.log(tileX + ', ' + tileY)
    this.coordText.setText(tileX + ', ' + tileY)
    //self.selectedTileX = tileX;
    //self.selectedTileY = tileY;
  }
  mapToScreen(x, y) {
    var screenx = (x - y) * this.widthHalf;
    var screeny = (x + y) * this.heightHalf;
    /*  screenx -= this.widthHalf
     screeny -= 40 */
    return { x: screenx, y: screeny }
  }
  screenToMap(x, y) {
    var map = {}
    map.x = Math.floor((x / this.widthHalf + y / this.heightHalf) / 2);
    map.y = Math.floor((y / this.heightHalf - (x / this.widthHalf)) / 2);
    return map
  }
  addScore() {
    this.events.emit('score');
  }



  redrawTiles() {
    // for (var Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
    //   for (var Yi = 0; Yi < this.Ytiles; Yi++) {
    for (var Xi = 0; Xi < this.Xtiles; Xi++) {
      for (var Yi = 0; Yi < this.Ytiles; Yi++) {
        //offX left corner
        var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
        var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;

        // Draw tile outline
        this.graphics.lineStyle(5, 0x262B44, 2);
        this.graphics.fillStyle(0x00ff00, 1)


        this.graphics.beginPath();

        this.graphics.moveTo(offX, offY + this.tileRowOffset / 2);
        this.graphics.lineTo(offX + this.tileColumnOffset / 2, offY);
        this.graphics.lineTo(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2);
        this.graphics.lineTo(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset);

        this.graphics.closePath();
        this.graphics.fillPath()
        this.graphics.strokePath();

        this.graphics.fillStyle(0xff0000, 1)
        var point = new Phaser.Geom.Point(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset / 2);
        this.graphics.fillPointShape(point, 10);


        var tile = this.add.image(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, 'tiles', this.tile_map[Xi][Yi]).setOrigin(.5, 1)
        /*      var color = '#999';
        
             this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color);
             this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color);
             this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color);
             this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color); */
      }
    }
  }

  drawLine(x1, y1, x2, y2, color) {
    this.graphics.lineBetween(x1, y1, x2, y2);
    /*  color = typeof color !== 'undefined' ? color : 'white';
     this.context.strokeStyle = color;
     this.context.beginPath();
     this.context.lineWidth = 1;
     this.context.moveTo(x1, y1);
     this.context.lineTo(x2, y2);
     this.context.stroke(); */
  }





}
function cartesianToIsometric(cartPt) {
  var tempPt = new Phaser.Geom.Point();
  console.log(tempPt)
  tempPt.x = cartPt.x - cartPt.y;
  tempPt.y = (cartPt.x + cartPt.y) / 2;
  return (tempPt);
}
function isometricToCartesian(isoPt) {
  var tempPt = new Phaser.Point();
  tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
  tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
  return (tempPt);
}