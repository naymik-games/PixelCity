

class Sim {
  constructor(scene, data) {
    this.scene = scene
    this.gameData = data
  }
  endDay() {
    console.log('end day')

    //RCI
    //residential capacity

    var totalRCapacity = this.getTotalResCapacity()
    var specialJobs = sim.gameData.specialJobs

    var workers = Math.floor(this.gameData.population * .50) //half the population works
    // this.popText = this.add.bitmapText(25, 910, 'topaz', 'Pop: ' + this.gameData.population + ' Workers: ' + workers, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();


    // this.resZoneText = this.add.bitmapText(25, 1010, 'topaz', 'LR: ' + this.gameData.zoneCounts[0] + ' MR: ' + this.gameData.zoneCounts[1] + ' DR: ' + this.gameData.zoneCounts[2] + ' Capacity: ' + totalRCapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();
    console.log('Res capacity: ' + totalRCapacity)
    var capacityRatio = this.gameData.population / totalRCapacity
    //commercial capacity

    var totalCCapacity = this.getTotalComCapacity()
    // this.comZoneText = this.add.bitmapText(25, 1110, 'topaz', 'LC: ' + this.gameData.zoneCounts[3] + ' MC: ' + this.gameData.zoneCounts[4] + ' DC: ' + this.gameData.zoneCounts[5] + ' Capacity: ' + totalCCapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var totalICapacity = this.getTotalIndCapacity()
    //this.indZoneText = this.add.bitmapText(25, 1210, 'topaz', 'LI: ' + this.gameData.zoneCounts[6] + ' DI: ' + this.gameData.zoneCounts[7] + ' Capacity: ' + totalICapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var employment = (totalCCapacity + totalICapacity + specialJobs) / workers //availble jobs to workers ratio
    var migration = Math.floor((workers * (employment - 1)) * 2) //works times ratio to project new jobs. times 2 for residents
    var births = this.gameData.population * 0.02 //new pop from births
    var newPop = migration + births
    var projectedPop = this.gameData.population + migration + births // projected population
    // var employmentText = this.add.bitmapText(25, 1310, 'topaz', 'Employment: ' + employment + ' Migration: ' + migration + ' \nBirths: ' + births + ' Projected pop: ' + projectedPop, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var prevLabor = totalCCapacity + totalICapacity + specialJobs//total jobs available
    var laborBase = 0
    if (prevLabor > 0) {

      laborBase = workers / prevLabor;
    }
    else {
      laborBase = 1;
    }
    var laborBase = workers / prevLabor;
    laborBase = clamp(laborBase, 0, 1.3);
    console.log('labor base: ' + laborBase)

    var internalMarket = (totalRCapacity + totalCCapacity + totalICapacity) / 3.7;
    console.log('internal market: ' + internalMarket)


    //how much commercial will be needed in the future
    var projectedComPop = internalMarket * laborBase;
    console.log('proj com: ' + projectedComPop)

    //1.2 for easy in original		
    var projectedIndPop = totalICapacity * laborBase * 1.2;

    //there's always projectedIndPopMin amount of industrial demand
    projectedIndPop = projectedIndPop > 5 ? projectedIndPop : 5;
    console.log('proj ind: ' + projectedIndPop)





    var resRatio = 1.3; //defaults to 1.3
    if (totalRCapacity > 0) {
      resRatio = projectedPop / this.gameData.population;
    }


    var comRatio = projectedComPop;
    if (totalCCapacity > 0) {
      comRatio = projectedComPop / totalCCapacity;
    }


    var indRatio = projectedIndPop;
    if (totalICapacity > 0) {
      indRatio = projectedIndPop / totalICapacity;
    }


    //limit ratio to 2
    resRatio = resRatio < 2 ? resRatio : 2;
    comRatio = comRatio < 2 ? comRatio : 2;
    indRatio = indRatio < 2 ? indRatio : 2;

    var taxModifier = 7;// 7 for no effect
    //Effect of each tax ratio on demand
    var taxRatioEffects = [200, 150, 120, 100, 80, 50, 30, 0, -10, -40, -100,
      -150, -200, -250, -300, -350, -400, -450, -500, -550, -600];

    //"counter weight" for tax effect
    var taxScale = 600;


    resRatio = (resRatio - 1) * taxScale + taxRatioEffects[taxModifier];
    comRatio = (comRatio - 1) * taxScale + taxRatioEffects[taxModifier];
    indRatio = (indRatio - 1) * taxScale + taxRatioEffects[taxModifier];

    //res capicity effect excess housing increases housing demand
    resRatio = resRatio * capacityRatio


    console.log('res ratio: ' + resRatio)
    console.log('com ratio: ' + comRatio)
    console.log('Ind ratio: ' + indRatio)


    console.log(clamp(0 + Math.round(resRatio), -2000, 2000))
    this.gameData.rci[0] = clamp(this.gameData.rci[0] + Math.round(resRatio), -2000, 2000)
    console.log('Res RCI' + this.gameData.rci[0])
    this.gameData.rci[1] = clamp(this.gameData.rci[1] + Math.round(comRatio), -1500, 1500)
    console.log('Com RCI' + this.gameData.rci[1])
    this.gameData.rci[2] = clamp(this.gameData.rci[2] + Math.round(indRatio), -1500, 1500)
    console.log('Ind RCI' + this.gameData.rci[2])

    //population adjustment
    // if (capacityRatio < 1) {
    console.log('new proj pop: ' + newPop)

    var availableHousing = totalRCapacity - this.gameData.population
    var r = clamp(newPop, -20, availableHousing)
    this.gameData.population += Math.ceil(r)
    //}


  }
  getTotalResCapacity() {
    var lrCapacity = this.gameData.zoneCounts[0] * 8 //8 residents per tile
    var mrCapacity = this.gameData.zoneCounts[1] * 40 //40 residents per tile
    var drCapacity = this.gameData.zoneCounts[2] * 120 //120 residents per tile
    return lrCapacity + mrCapacity + drCapacity
  }
  getTotalComCapacity() {
    var lcCapacity = this.gameData.zoneCounts[3] * 6 //6jobs per tile
    var mcCapacity = this.gameData.zoneCounts[4] * 35 //35 jobs per tile
    var dcCapacity = this.gameData.zoneCounts[5] * 100 //100 jobs per tile
    return lcCapacity + mcCapacity + dcCapacity
  }
  getTotalIndCapacity() {
    var liCapacity = this.gameData.zoneCounts[6] * 6 //six jobs per tile
    var diCapacity = this.gameData.zoneCounts[7] * 75 //75 jobs per tile
    return liCapacity + diCapacity
  }
}