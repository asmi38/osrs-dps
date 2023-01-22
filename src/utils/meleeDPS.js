import { gear_bonus, void_bonus, totalAtkCalc, totalStrCalc } from './sharedDPS'

//attack_boolean is true if it is attack bonus, false for strength bonus
function melee_bonus(style, attack_boolean){
  if(style === "aggressive"){
    return (attack_boolean ? 0 : 3)
  }
  else if(style === "controlled"){
    return (attack_boolean ? 1 : 1)
  }
  else if(style === "accurate"){
    return (attack_boolean ? 3 : 0)
  }
  else{
    return 0
  }
}

function meleeGearBonus(state, equipment){
  const { enemy, calcs } = state
  if(equipment.weapon.name === "Dragon hunter lance" && enemy.attributes.includes("dragon")){
    return {'accMultiplier': 1.2, 'dmgMultiplier': 1.2}
  }
  if(equipment.weapon.name === "Viggora's chainmace" && calcs.wilderness){
    return {'accMultiplier': 1.5, 'dmgMultiplier': 1.5}
  }
  if(equipment.head.name === "Obsidian helmet" && equipment.body.name === "Obsidian platebody" && equipment.legs.name === "Obsidian platelegs" && equipment.weapon.name.includes("Obsidian")){
    if(equipment.neck.name === "Berserker necklace"){
      return {'accMultiplier': 1.1, 'dmgMultiplier': 1.32}
    }
    else {
      return {'accMultiplier': 1.1, 'dmgMultiplier': 1.1}
    }
  }
  if(equipment.neck.name === "Berserker necklace" && equipment.weapon.name.includes("Obsidian")){
    return {'accMultiplier': 1, 'dmgMultiplier': 1.2}
  }

  if(equipment.weapon.name === "Arclight" && enemy.attributes.includes("demon")){
    return {'accMultiplier': 1.7, 'dmgMultiplier': 1.7}
  }
  if(equipment.weapon.name === "Darklight" && (enemy.attributes.includes("demon") || enemy.attributes.includes("vampyre"))){
    return {'accMultiplier': 1.6, 'dmgMultiplier': 1.6}
  }
  if(equipment.weapon.name === "Keris partisan of breaching" && enemy.attributes.includes("kalphite")){
    return {'accMultiplier': 1.33, 'dmgMultiplier': 1.33 * 5300/5100}
  }
  if(equipment.weapon.name === "Keris partisan of the sun" && enemy.attributes.includes("kalphite")){
    return {'accMultiplier': 1.0625, 'dmgMultiplier': 1.33 * 5300/5100}
  }
  if(equipment.weapon.name.includes("Keris") && enemy.attributes.includes("kalphite")){
    return {'accMultiplier': 1, 'dmgMultiplier': 1.33 * 5300/5100}
  }
  if(equipment.weapon.name === "Leaf-bladed battleaxe" && enemy.attributes.includes("leafy")){
    return {'accMultiplier': 1.175, 'dmgMultiplier': 1.175}
  }

  const inquisitorItems = []
  if(equipment.body.name === "Inquisitor's hauberk"){
    inquisitorItems.push("Inquisitor's hauberk")
  }
  if(equipment.head.name === "Inquisitor's great helm"){
    inquisitorItems.push("Inquisitor's great helm")
  }
  if(equipment.legs.name === "Inquisitor's plateskirt"){
    inquisitorItems.push("Inquisitor's plateskirt")
  }

  if(equipment.attack_style.attack_type === "crush" && inquisitorItems.length > 0){
    if(inquisitorItems.length === 3){
      return {'accMultiplier': 1.025, 'dmgMultiplier': 1.025}
    }
    else {
      const accMultiplier = 1 + 0.005 * inquisitorItems.length
      const dmgMultiplier = 1 + 0.005 * inquisitorItems.length
      return {'accMultiplier': accMultiplier, 'dmgMultiplier': dmgMultiplier}
    }
  }
  return {'accMultiplier': 1, 'dmgMultiplier': 1}
}

function dharokBonus(state, equipment){
  const { stats, calcs } = state
  if(equipment.head.name === "Dharok's helm" &&
     equipment.body.name === "Dharok's platebody" &&
     equipment.legs.name === "Dharok's platelegs" &&
     equipment.weapon.name === "Dharok's greataxe"){
       return 1 + (stats.hitpoints.level - calcs.remaining_hp) / 100 * (stats.hitpoints.level / 100)
  }
  return 1
}

/*
    ###########################################################################################
                                  Damage Calculations
    ###########################################################################################
*/

function scytheMaxHit(state, equipment, maxHit){
  if(equipment.weapon.name === "Scythe of vitur" || equipment.weapon.name === "Scythe of vitur (uncharged)"){
    let maxHitSecond = Math.floor(maxHit * 0.5)
    let maxHitThird = Math.floor(maxHit * 0.25)
    if(state.enemy.size === 2){
      maxHit = maxHit + maxHitSecond
    }
    else if(state.enemy.size >= 3){
      maxHit = maxHit + maxHitSecond + maxHitThird
    }
  }
  return maxHit
}

export function meleeMaxHit(state, equipment){
  const { stats } = state

  const effectiveMeleeStr = (stats.strength.effective_level + melee_bonus(equipment.attack_style.attack_style, false) + 8) * void_bonus(equipment, "melee")[0]
  const effMeleeAndNumeric = Math.floor( ((effectiveMeleeStr * (totalStrCalc(equipment) + 64)) + 320) / 640 )
  const addGearBonus = Math.floor(effMeleeAndNumeric * gear_bonus(state, equipment, "melee")[0])
  var maxHit = Math.floor(addGearBonus * dharokBonus(state, equipment) * meleeGearBonus(state, equipment).dmgMultiplier)
  if(equipment.weapon.name === "Scythe of vitur" || equipment.weapon.name === "Scythe of vitur (uncharged)"){
    maxHit = scytheMaxHit(state, equipment, maxHit)
  }
  return maxHit
}

export function meleeAtkRoll(state, equipment){
  const { stats } = state

  const effectiveAtkLvl = (stats.attack.effective_level + melee_bonus(equipment.attack_style.attack_style, true) + 8) * void_bonus(equipment, "melee")[1]
  const maxAtkRoll = (effectiveAtkLvl * (totalAtkCalc(equipment) + 64)) * gear_bonus(state, equipment, "melee")[1]
  return Math.floor(maxAtkRoll * meleeGearBonus(state, equipment).accMultiplier)
}
