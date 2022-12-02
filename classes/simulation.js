

class Sim {
  constructor(scene, data, config) {
    this.scene = scene
    this.gameData = data
    this.gameData.mapConfig = config
  }
  endDay(newYear, fiveYear) {
    console.log('end day')
    getAverageLV()
    this.updateRCI()
    this.updateFunds()
    driveTimes()
    this.updatePopulation(newYear, fiveYear)
    if (this.gameData.population > 500) {
      this.gameData.maxPlotSize = 2
    } else if (this.gameData.population > 1500) {
      this.gameData.maxPlotSize = 3
    } else if (this.gameData.population > 3000) {
      this.gameData.maxPlotSize = 4
    }
    setNoRoad()
  }
  updateFunds() {
    //income
    var rI = getResTaxIncome()
    var cI = getComTaxIncome()
    var iI = getIndTaxIncome()
    var tI = rI + cI + iI
    // console.log('Total Income: ' + tI)
    var tM = getTotalMaintenanceCost()
    //  console.log('Total Cost: ' + tM)
    var balance = tI - tM
    // console.log('Balance: ' + balance)
    this.gameData.funds += balance
  }
  updateRCI() {
    var resSupply = this.getTotalResCapacity()
    var comSupply = this.getTotalComCapacity()
    var indSupply = this.getTotalIndCapacity()

    var resCapRatio = sim.gameData.demandCaps[0] / resSupply
    var comCapRatio = sim.gameData.demandCaps[1] / comSupply
    var indCapRatio = sim.gameData.demandCaps[2] / indSupply

    //////////
    var resWorkers = this.getWorkers()

    var totalJobs = this.getTotalJobs()

    // console.log('total jobs ' + totalJobs)
    //////////////////
    var workerRatio = totalJobs / resWorkers
    //  console.log('worker ratio ' + workerRatio)

    var jobRatio = resWorkers / totalJobs
    // console.log('job ratio ' + jobRatio)

    var resDemand = resCapRatio * workerRatio
    //  console.log('res cap ratio ' + resDemand)
    var comDemand = comCapRatio * jobRatio
    //  console.log('com cap ratio ' + comDemand)
    var indDemand = indCapRatio * jobRatio
    //  console.log('ind cap ratio ' + indDemand)

    this.gameData.rci[0] = resDemand / 100
    this.gameData.rci[1] = comDemand / 100
    this.gameData.rci[2] = indDemand / 100
    //  console.log('res ' + this.gameData.rci[0] + ' com ' + this.gameData.rci[1] + ' ind ' + this.gameData.rci[2])

    //////////////////////////////////////////////////////////////////////////////////////////
    var rand = Phaser.Math.Between(0, birthRates.length - 1)
    var births = Math.round(this.gameData.population * birthRates[rand]) //new pop from births
    console.log('unbuildable ' + getBuildableCount())
    console.log('unbuildable ' + getResBuildableCount())
    console.log('unbuildable ' + getComBuildableCount())
    console.log('unbuildable ' + getIndBuildableCount())
    var availableHousing = resSupply - this.gameData.population
    var migration = resWorkers * (workerRatio - 1)
    var r = clamp(migration, -20, availableHousing + births)
    //  console.log('births: ' + births + ' migration: ' + migration + ' migration adj: ' + r)

    this.gameData.population += Math.ceil(r + births)
  }
  updateRCI_() {
    //RCI
    //residential capacity

    var totalRCapacity = this.getTotalResCapacity()
    var specialJobs = sim.gameData.specialJobs

    var workers = Math.floor(this.gameData.population * .50) //half the population works
    // this.popText = this.add.bitmapText(25, 910, 'topaz', 'Pop: ' + this.gameData.population + ' Workers: ' + workers, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();


    // this.resZoneText = this.add.bitmapText(25, 1010, 'topaz', 'LR: ' + this.gameData.zoneCounts[0] + ' MR: ' + this.gameData.zoneCounts[1] + ' DR: ' + this.gameData.zoneCounts[2] + ' Capacity: ' + totalRCapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();
    //console.log('Res capacity: ' + totalRCapacity)
    var capacityRatio = this.gameData.population / totalRCapacity
    //commercial capacity

    var totalCCapacity = this.getTotalComCapacity()
    // this.comZoneText = this.add.bitmapText(25, 1110, 'topaz', 'LC: ' + this.gameData.zoneCounts[3] + ' MC: ' + this.gameData.zoneCounts[4] + ' DC: ' + this.gameData.zoneCounts[5] + ' Capacity: ' + totalCCapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var totalICapacity = this.getTotalIndCapacity()
    //this.indZoneText = this.add.bitmapText(25, 1210, 'topaz', 'LI: ' + this.gameData.zoneCounts[6] + ' DI: ' + this.gameData.zoneCounts[7] + ' Capacity: ' + totalICapacity, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var employment = (totalCCapacity + totalICapacity + specialJobs) / workers //availble jobs to workers ratio
    var migration = Math.floor((workers * (employment - 1)) * 2) //works times ratio to project new jobs. times 2 for residents

    var rand = Phaser.Math.Between(0, birthRates.length - 1)
    var births = Math.round(this.gameData.population * birthRates[rand]) //new pop from births
    var newPop = migration + births
    // console.log('births: ' + births + ' migration: ' + migration)
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
    //  console.log('labor base: ' + laborBase)

    var internalMarket = (totalRCapacity + totalCCapacity + totalICapacity) / 3.7;
    //  console.log('internal market: ' + internalMarket)


    //how much commercial will be needed in the future
    var projectedComPop = internalMarket * laborBase;
    //  console.log('proj com: ' + projectedComPop)

    //1.2 for easy in original		
    var projectedIndPop = totalICapacity * laborBase * 1.2;

    //there's always projectedIndPopMin amount of industrial demand
    projectedIndPop = projectedIndPop > 5 ? projectedIndPop : 5;
    // console.log('proj ind: ' + projectedIndPop)





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


    resRatio = (resRatio - 1) * taxScale + taxRatioEffects[this.gameData.taxRates[0]];
    comRatio = (comRatio - 1) * taxScale + taxRatioEffects[this.gameData.taxRates[1]];
    indRatio = (indRatio - 1) * taxScale + taxRatioEffects[this.gameData.taxRates[2]];

    //res capicity effect excess housing increases housing demand
    resRatio = resRatio * capacityRatio


    //  console.log('res ratio: ' + resRatio)
    //  console.log('com ratio: ' + comRatio)
    //  console.log('Ind ratio: ' + indRatio)


    //console.log(clamp(0 + Math.round(resRatio), -2000, 2000))
    this.gameData.rci[0] = clamp(this.gameData.rci[0] + Math.round(resRatio), -2000, 2000)
    //console.log('Res RCI' + this.gameData.rci[0])
    this.gameData.rci[1] = clamp(this.gameData.rci[1] + Math.round(comRatio), -1500, 1500)
    //console.log('Com RCI' + this.gameData.rci[1])
    this.gameData.rci[2] = clamp(this.gameData.rci[2] + Math.round(indRatio), -1500, 1500)
    //console.log('Ind RCI' + this.gameData.rci[2])

    //population adjustment
    // if (capacityRatio < 1) {
    //console.log('new proj pop: ' + newPop)

    var availableHousing = totalRCapacity - this.gameData.population

    var r = clamp(migration, -20, availableHousing + births)
    console.log('births: ' + births + ' migration: ' + migration + ' migration adj: ' + r)

    this.gameData.population += Math.ceil(r + births)

    //}
  }
  getTotalResCapacity() {
    var resSupply = 0
    var resCount = 0
    var buildCounts = getBuildableCount()
    for (var i = 0; i < 9; i++) {

      resSupply += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciSupply[i]
    }

    console.log(resSupply)
    if (resSupply == 0) {
      resSupply = 1
    }
    return resSupply
  }
  getTotalComCapacity() {
    var comSupply = 0
    var comCount = 0
    var buildCounts = getBuildableCount()
    for (var i = 9; i < 18; i++) {

      comSupply += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciSupply[i]
    }

    if (comSupply == 0) {
      comSupply = 1
    }
    return comSupply
  }
  getTotalIndCapacity() {
    var indSupply = 0
    var indCount = 0
    var buildCounts = getBuildableCount()
    for (var i = 18; i < 24; i++) {
      indSupply += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciSupply[i]
    }

    if (indSupply == 0) {
      indSupply = 1
    }
    return indSupply
  }
  getWorkers() {
    var resWorkers = 0
    var buildCounts = getBuildableCount()
    for (var i = 0; i < 9; i++) {
      resWorkers += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciJobs[i]
    }

    if (Math.round(sim.gameData.population / 2) >= resWorkers) {
      resWorkers += gameRules.commuters
    } else {
      resWorkers = gameRules.commuters + Math.round(sim.gameData.population / 2)
    }
    return resWorkers
  }
  getTotalJobs() {
    return this.getComJobs() + this.getIndJobs() + sim.gameData.specialJobs
  }
  getComJobs() {
    var comJobs = 0
    var buildCounts = getBuildableCount()
    for (var i = 9; i < 18; i++) {
      comJobs += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciJobs[i]

    }
    return comJobs
  }
  getIndJobs() {
    var indJobs = 0
    var buildCounts = getBuildableCount()
    for (var i = 18; i < 24; i++) {
      indJobs += (sim.gameData.rciCounts[i] - buildCounts[i]) * rciJobs[i]

    }
    return indJobs
  }
  updatePopulation(newYear, fiveYear) {
    if (newYear) {
      var EQ = getEq()
      var wEQ = EQ.wfEQ
      this.gameData.generations.pop()
      var born = {
        added: this.gameData.year,
        count: 2,
        HQ: 80.10,
        EQ: wEQ / 5 < 10 ? 10 : wEQ / 5,
      }

      this.gameData.generations.unshift(born)
      eqDecay()
      hqDecay()
    }
    if (fiveYear) {

    }


    parentalEducation()
    healthUpdate()
  }
}