const CONCRETE = 0
const DIRT = 1
const WATER = 2
const GRASS = 3


var myrng = new Math.seedrandom('66745');
//console.log(myrng());
//console.log(myrng.quick())
//console.log(Math.random())
class Map {
  constructor(config) {
    this.dwidth = config.width;
    this.dheight = config.height;
    this.eastCost = config.eastCost;
    this.westCost = config.westCost;
    this.northCost = config.northCost;
    this.southCost = config.southCost;
    this.eWRiver = config.eWRiver;
    this.nSRiver = config.nSRiver;
    this.numLakes = config.numLakes;
    this.map = []
  }
  generateMap() {
    //filled map with all grass tiles
    for (let y = 0; y < this.dheight; y++) {
      let row = Array(this.dwidth);
      for (let x = 0; x < this.dwidth; x++) {

        row[x] = GRASS;


      }
      this.map[y] = row;
    }
    //east cost
    if (this.eastCost) {
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          var max = this.randomNumber(2, 7)
          if (x > this.dwidth - this.randomNumber(1, max) && x < this.dwidth) {
            this.map[y][x] = WATER
          }
        }
      }
    }
    //west cost
    if (this.westCost) {
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          var max = this.randomNumber(2, 7)
          if (x >= 0 && x < this.randomNumber(1, max)) {
            this.map[y][x] = WATER
          }
        }
      }
    }
    //north cost
    if (this.northCost) {
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          var max = this.randomNumber(2, 5)
          if (y >= 0 && y < this.randomNumber(1, max)) {
            this.map[y][x] = WATER
          }
        }
      }
    }
    //south cost
    if (this.southCost) {
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          var max = this.randomNumber(2, 5)
          if (y > this.dheight - this.randomNumber(1, max) && y < this.dheight) {
            this.map[y][x] = WATER
          }
        }
      }
    }
    //north south river 
    if (this.nSRiver) {
      var mid = Math.floor(this.dwidth / 2)
      var minLeft = this.randomNumber(mid - 15, mid + 15)
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          if (x > this.randomNumber(minLeft, minLeft + 1) && x < this.randomNumber(minLeft + 3, minLeft + 4)) {
            this.map[y][x] = WATER
          }
        }
      }
    }

    //east west river 
    if (this.eWRiver) {
      var mid = Math.floor(this.dheight / 2)
      var minTop = this.randomNumber(mid - 15, mid + 15)
      for (let y = 0; y < this.dheight; y++) {
        for (let x = 0; x < this.dwidth; x++) {
          if (y > this.randomNumber(minTop, minTop + 1) && y < this.randomNumber(minTop + 3, minTop + 4)) {
            this.map[y][x] = WATER
          }
        }
      }
    }
    //lake
    //this.map[10][10] = 0;
    for (var j = 0; j < this.numLakes; j++) {
      var y = this.randomNumber(10, this.dheight - 10);
      var x = this.randomNumber(10, this.dwidth - 10);
      for (var i = 0; i < 30; i++) {
        //left right or up down
        if (myrng.quick() < .5) {
          if (myrng.quick() < .5) {
            //y = 10;
            x -= 1
          } else {
            x += 1
          }
        } else {
          if (myrng.quick() < .5) {
            y -= 1
          } else {
            y += 1
          }
        }
        this.map[y][x] = WATER
      }
    }
    //lake
    console.log(this.randomNumber(0, this.dwidth - 1))
  }
  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(myrng.quick() * (max - min + 1)) + min;
  }
  getMap() {
    return this.map
  }
}
