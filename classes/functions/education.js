
////////////////////////////////////////////////////////////////////////////////////////
// EDUCATION
////////////////////////////////////////////////////////////////////////////////////////
function addSchool(capacity) {
  sim.gameData.schoolCapacity += capacity
}
function removeSchool(capacity) {
  sim.gameData.schoolCapacity -= capacity
}
function addCollege(capacity) {
  sim.gameData.collegeCapacity += capacity
}
function removeCollege(capacity) {
  sim.gameData.collegeCapacity -= capacity
}
function getEq() {

  var wfEqTotal = 0
  var pEqTotal = 0
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4 && i < 13) {
      wfEqTotal += sim.gameData.generations[i].EQ
    }
    pEqTotal += sim.gameData.generations[i].EQ
  }
  return { pEQ: Math.round(pEqTotal / sim.gameData.generations.length), wfEQ: Math.round(wfEqTotal / 8) }
}
function eqDecay() {
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4) {
      sim.gameData.generations[i].EQ -= sim.gameData.generations[i].EQ * .0191
    }

  }
}
function getNumSchoolChildren() {
  var numOf10 = Math.ceil(sim.gameData.population * (sim.gameData.generations[1].count / 100))
  var numOf15 = Math.ceil(sim.gameData.population * (sim.gameData.generations[2].count / 100))
  var numOf20 = Math.ceil(sim.gameData.population * (sim.gameData.generations[3].count / 100))
  return numOf10 + numOf15 + numOf20
}
function parentalEducation() {

  var eq = getEq()

  sim.gameData.generations[1].EQ += eq.wfEQ / 50
  sim.gameData.generations[2].EQ += eq.wfEQ / 50

  var numOf10 = Math.ceil(sim.gameData.population * (sim.gameData.generations[1].count / 100))
  var numOf15 = Math.ceil(sim.gameData.population * (sim.gameData.generations[2].count / 100))
  var numOf20 = Math.ceil(sim.gameData.population * (sim.gameData.generations[3].count / 100))
  var numOf25 = Math.ceil(sim.gameData.population * (sim.gameData.generations[4].count / 100))

  var numInSchool = numOf10 + numOf15 + numOf20
  if (sim.gameData.schoolCapacity == 0) {
    var eqAdd = 0
  }
  else if (numInSchool <= sim.gameData.schoolCapacity) {
    sim.gameData.generations[1].EQ += .125 - getEduSub(sim.gameData.maintenanceCostsPer[16])
    sim.gameData.generations[2].EQ += .125 - getEduSub(sim.gameData.maintenanceCostsPer[16])
    sim.gameData.generations[3].EQ += .125 - getEduSub(sim.gameData.maintenanceCostsPer[16])
  } else {
    var per = sim.gameData.schoolCapacity / numInSchool
    sim.gameData.generations[1].EQ += (.125 - getEduSub(sim.gameData.maintenanceCostsPer[16])) * per
    sim.gameData.generations[2].EQ += (.125 - getEduSub(sim.gameData.maintenanceCostsPer[16])) * per
    sim.gameData.generations[3].EQ += (.125 - getEduSub(sim.gameData.maintenanceCostsPer[16])) * per
  }

  if (sim.gameData.collegeCapacity == 0) {
    var eqAdd = 0
  }
  else if (numOf25 <= sim.gameData.collegeCapacity) {
    sim.gameData.generations[4].EQ += 1.5 - getEduSub(sim.gameData.maintenanceCostsPer[16])
  } else {
    var per = sim.gameData.collegeCapacity / numOf25
    sim.gameData.generations[4].EQ += 1.5 - getEduSub(sim.gameData.maintenanceCostsPer[16]) * per
  }
  //console.log('count up to 10 ' + numOf10 + 'count up to 15 ' + numOf15)


}
function getEduSub(per) {
  var sub = 0
  if (per > 110) {
    sub = -.05
  } else if (per > 100) {
    sub = -.025
  } else if (per == 100) {
    sub = 0
  } else if (per < 60) {
    sub = .025
  } else if (per < 70) {
    sub = .05
  } else if (per < 80) {
    sub = .075
  } else if (per < 90) {
    sub = .1
  } else if (per < 100) {
    sub = .125
  }
  return sub
}
