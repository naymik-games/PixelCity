//////////////////////////////////////////////////////////////////////////////
// FINANCE
///////////////////////////////////////////////////////////////////////////////
function getResTaxIncome() {
  // TR x pop x LV x Modifier x months
  if (sim.gameData.averageLV < 1) {
    var lv = 1
  } else {
    var lv = sim.gameData.averageLV
  }
  return Math.round(sim.gameData.taxRates[0] * sim.gameData.population * lv * 0.0035)
}
function getComTaxIncome() {
  var comCapacity = sim.gameData.zoneCounts[3] * 2 + sim.gameData.zoneCounts[4] * 3 + sim.gameData.zoneCounts[5] * 6
  return Math.round(sim.gameData.taxRates[1] * comCapacity * 22 * 0.0045)
}
function getIndTaxIncome() {
  var indCapacity = sim.gameData.zoneCounts[6] * 2 + sim.gameData.zoneCounts[7] * 3 + sim.gameData.zoneCounts[8] * 6
  return Math.round(sim.gameData.taxRates[2] * indCapacity * 22 * 0.005)
}
function getTotalMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    total += sim.gameData.maintenanceCostsSpending[i]
  }
  return total
}
function getTotalFlexibleMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    if (i == 9 || i == 13 || i == 14 || i == 15 || i == 16 || i == 18 || i == 23) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getTotalFixedMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    if (i == 10 || i == 11 || i == 12 || i == 17 || i == 19 || i == 20 || i == 21 || i == 22) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getPowerMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[9]
  return total
}
function getPoliceMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[14]
  return total
}
function getFireMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[15]
  return total
}
function getHealthMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[13]
  return total
}
function getEducationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[16]
  return total
}
function getParksMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[18]
  return total
}
function getTransportationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[23]
  return total
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const formatterNum = new Intl.NumberFormat('en-US');