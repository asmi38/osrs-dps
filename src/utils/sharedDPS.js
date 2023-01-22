import { attack_style_name, strength_style_name, defTypeName, combatTypeCalc } from './calc'
import { meleeMaxHit, meleeAtkRoll } from './meleeDPS'
import { mageMaxHit, mageAtkRoll } from './magicDPS'
import { boltDPS, rangeMaxHit, rangeAtkRoll } from './rangedDPS'

const specialMons = ["Verzik Vitur (Throne)", "Zulrah (crimson)", "Zulrah (turqoise)", "Zulrah (green)", "Ice demon", "Corporeal Beast"]

//Returns array, first value is damage bonus, second value is accuracy bonus
export function gear_bonus(state, equipment, type){
  const { enemy, calcs } = state
  let bonus = [1, 1]
  if(equipment.neck.name === "Salve amulet(ei)" && enemy.attributes.includes("undead")){
    bonus = [1.2, 1.2]
  }
  else if(equipment.neck.name === "Salve amulet(i)" && enemy.attributes.includes("undead")){
    if(type === "melee"){
      bonus = [1.1667, 1.1667]
    }
    else if(type === "ranged"){
      bonus = [1.1667, 1.1667]
    }
    else if(type === "magic"){
      bonus = [1.15, 1.15]
    }
  }
  else if(equipment.head.name === "Slayer helmet (i)" && calcs.slayer_task){
    if(type === "melee"){
      bonus = [1.1667, 1.1667]
    }
    else if(type === "ranged"){
      bonus = [1.15, 1.15]
    }
    else if(type === "magic"){
      bonus = [1.15, 1.15]
    }
  }

  if(state.calcs.quick_shot === true && type === "ranged"){
    bonus = [bonus[0] + 0.1, bonus[1] + 1]
  }
  else if(state.calcs.fluid_strikes === true && type === "melee"){
    bonus = [bonus[0], bonus[1] + 0.25]
  }

  if(state.calcs.tier6 === true){
    bonus = [bonus[0]+0.1, bonus[1]+0.1]
  }

  if(state.calcs.konars_blessing === true){
    bonus[0] += state.calcs.slayer_task ? 0.3 : 0.1
    bonus[1] += state.calcs.slayer_task ? 0.3 : 0.1
  }
  return bonus
}

//Returns array, first value is damage bonus, second value is accuracy bonus
export function void_bonus(equipment, type){
  if(equipment.body.name === "Void knight top" && equipment.legs.name === "Void knight robe" && equipment.head.name === "Void knight helm"){
    if(type === "melee"){
      return [1.1, 1.1]
    }
    else if(type === "ranged"){
      return [1.1, 1.1]
    }
    else if(type === "magic"){
      return [1.0, 1.45]
    }
  }
  if(equipment.body.name === "Elite void top" && equipment.legs.name === "Elite void robe" && equipment.head.name === "Void knight helm"){
    if(type === "melee"){
      return [1.1, 1.1]
    }
    else if(type === "ranged"){
      return [1.125, 1.1]
    }
    else if(type === "magic"){
      return [1.025, 1.45]
    }
  }
  return [1, 1]
}


export function totalAtkCalc(equipment){
  const style = attack_style_name(equipment.attack_style)
  const keys = Object.keys(equipment).filter(word => word !== "attack_style").filter(word => word !== "spell")
  const values = (keys.map(equip_name =>
    equipment[equip_name].stats[style]))

  return values.reduce((a, b) => a + b, 0)
}


export function totalStrCalc(equipment){
  const keys = Object.keys(equipment).filter(word => word !== "attack_style").filter(word => word !== "spell")
  const values = (keys.map(equip_name =>
    equipment[equip_name].stats[strength_style_name(equipment.attack_style)]))

  return values.reduce((a, b) => a + b, 0)
}


function eStatReduction(state){
  const { calcs, enemy } = state
  let defenceLevel = enemy.defence_level
  let strLevel = enemy.strength_level
  let magicLevel = enemy.magic_level

  //vulnerability
  if(calcs.vulnerability === true){
    defenceLevel = Math.ceil(defenceLevel * 0.9)
  }

  //dwh specials
  for(let i = 0; i < calcs.dwh_specials; i++){
    defenceLevel = Math.ceil(defenceLevel * 0.7)
  }

  //arclight specials
  if(enemy.attributes.includes("demon") && calcs.arclight_specials > 0){
    defenceLevel = Math.ceil(defenceLevel * (1 - 0.1 * calcs.arclight_specials))
    strLevel = Math.ceil(strLevel * (1 - 0.1 * calcs.arclight_specials))
  }
  else if(calcs.arclight_specials > 0){
    defenceLevel = Math.ceil(defenceLevel * (1 - 0.05 * calcs.arclight_specials))
    strLevel = Math.ceil(strLevel * (1 - 0.05 * calcs.arclight_specials))
  }

  //bgs reduction order Def > Str > mage > atk > ranged
  const buffer = strLevel + defenceLevel
  if(calcs.bgs_dmg > 0){
    defenceLevel = Math.max(0, defenceLevel - calcs.bgs_dmg)
  }
  if(calcs.bgs_dmg > buffer){
    magicLevel = Math.max(0, magicLevel - (calcs.bgs_dmg - buffer))
  }
  return {'magicLevel': magicLevel, 'defenceLevel': defenceLevel}
}


export function eMaxDefRoll(state, equipment){
  const { enemy } = state
  const style = defTypeName(equipment.attack_style)
  if(style === "defence_magic"){
    if(equipment.ring.name === "Brimstone ring"){
      const defRoll = (eStatReduction(state).magicLevel + 9) * (enemy.stats[style] + 64)
      return Math.floor(0.75 * defRoll + 0.25 * (0.9 * defRoll))
    }
    else {
      return ((eStatReduction(state).magicLevel + 9) * (enemy.stats[style] + 64))
    }
  }
  else{
    return ((eStatReduction(state).defenceLevel + 9) * (enemy.stats[style] + 64))
  }
}

function calcHitChance(atkRoll, defRoll){
  if(atkRoll > defRoll){
    return 1 - (defRoll + 2) / (2 * (atkRoll + 1))
  }
  else{
    return atkRoll / (2 * defRoll + 1)
  }
}

// Special hit chance calculation for fang inside of raids
// https://imgur.com/a/QMDp28g
function fangInsideHitChance(atkRoll, defRoll){
  if (atkRoll > defRoll){
    return 1 - (defRoll / (2 * atkRoll)) * (defRoll / (2 * atkRoll))
  }
  else {
    return (atkRoll / (2 * defRoll)) * ( 2 - atkRoll / (2 * defRoll))
  }
}


// Special hit chance calculation for fang outside of raids
// https://imgur.com/a/QMDp28g
function fangOutsideHitChance(atkRoll, defRoll){
    if(atkRoll > defRoll){
    return 1 - (defRoll * defRoll / (3 * (atkRoll * atkRoll)))
  }
  else{
    return 2 * atkRoll / (3 * defRoll)
  }
}

export function hitChance(state, equipment){
  const combatType = combatTypeCalc(equipment.attack_style)
  if(combatType === "ranged"){
    return calcHitChance(rangeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
  else if(combatType === "magic"){
    return calcHitChance(mageAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
  else if(combatType === "melee" && equipment.weapon.name === "Osmumten's fang (Outside ToA)"){
    return fangOutsideHitChance(meleeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
  else if(combatType === "melee" && equipment.weapon.name === "Osmumten's fang (Inside ToA)"){
    return fangInsideHitChance(meleeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
  else {
    return calcHitChance(meleeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
}

function thrallDPS(state){
  const { thrall } = state.calcs

  if(thrall.includes("Greater")){
    return 2 / 2.4
  }
  else if(thrall.includes("Superior")){
    return 1.5 / 2.4
  }
  else if(thrall.includes("Lesser")){
    return 1 / 2.4
  }
  else{
    return 0
  }
}

export function maxHitCalc(state, equipment){
  const combatType = combatTypeCalc(equipment.attack_style)
  if(combatType === "ranged"){
    return rangeMaxHit(state, equipment)
  }
  else if(combatType === "magic"){
    return mageMaxHit(state, equipment)
  }
  else{
    return meleeMaxHit(state, equipment)
  }
}

function magicAtkSpeed(state, equipment){
  let spell = equipment.spell
  const isRelicActive = (state.calcs.double_cast || state.calcs.xerics_focus) ? true : false
  if(equipment.weapon.name === "Harmonised nightmare staff" && spell.spellbook === "standard"){
    return isRelicActive ? 2 : 4
  }
  else if(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange"){
    return isRelicActive ? Math.ceil(equipment.weapon.attack_speed / 2) : equipment.weapon.attack_speed
  }
  else{
    return isRelicActive ? Math.ceil(equipment.spell.attack_speed / 2) : equipment.spell.attack_speed
  }
}


function verzikDps(state, equipment){
  const maxHit = maxHitCalc(state, equipment)
  const combatType = combatTypeCalc(equipment.attack_style)
  let averageHit = maxHit / 2
  if(combatType === "melee"){
    const chanceAbove = (maxHit - 10) / maxHit
    averageHit = chanceAbove * 5 + (1 - chanceAbove) * 2.5
  }
  else if(combatType === "ranged" || combatType === "magic"){
    const chanceAbove = (maxHit - 3) / maxHit
    averageHit = chanceAbove * 1.5 + (1 - chanceAbove) * 0.75
  }
  return averageHitDps(state, equipment, averageHit)
}

function iceDemonDps(state, equipment){
  const maxHit = maxHitCalc(state, equipment)
  const combatType = combatTypeCalc(equipment.attack_style)
  let averageHit = maxHit / 2
  if(combatType === "melee" || combatType === "ranged"){
    averageHit = averageHit / 3
  }
  return averageHitDps(state, equipment, averageHit)
}

function corpDps(state, equipment){
  const maxHit = maxHitCalc(state, equipment)
  const combatType = combatTypeCalc(equipment.attack_style)
  let averageHit = maxHit / 2
  if((equipment.weapon.name.includes("halbred") || equipment.weapon.name.includes("spear")) && equipment.attack_style.attack_type === "stab"){
  }
  else if(combatType === "magic"){
  }
  else{
    averageHit = averageHit / 2
  }
  return averageHitDps(state, equipment, averageHit)
}

function zulrahDps(state, equipment){
  const maxHit = maxHitCalc(state, equipment)
  let averageHit = maxHit / 2
  if(maxHit > 50){
    const dmgCapChance = (maxHit - 50) / (maxHit + 1)
    averageHit = dmgCapChance * 47.5 + (1 - dmgCapChance) * 25
  }
  return averageHitDps(state, equipment, averageHit)
}

function specialDps(state, equipment){
  const zulrahNames = ["Zulrah (crimson)", "Zulrah (turqoise)", "Zulrah (green)"]
  if(zulrahNames.includes(state.enemy.name)){
    return zulrahDps(state, equipment)
  }
  else if(state.enemy.name === "Verzik Vitur (Throne)"){
    return verzikDps(state, equipment)
  }
  else if(state.enemy.name === "Ice demon"){
    return iceDemonDps(state, equipment)
  }
  else if(state.enemy.name === "Corporeal Beast"){
    return corpDps(state, equipment)
  }
  else{
    return 0
  }
}

// Calc dps function but with averageHit passed in - this is used for special dps calculations
function averageHitDps(state, equipment, averageHit){
  const combatType = combatTypeCalc(equipment.attack_style)
  const maxHit = maxHitCalc(state, equipment)

  if(combatType === "magic"){
    return hitChance(state, equipment) * (averageHit / (0.6 * magicAtkSpeed(state, equipment)))
  }
  else if(combatType === "ranged"){
    let attackSpeed = equipment.weapon.attack_speed
    if(state.calcs.quick_shot === true || state.calcs.xerics_focus === true){
      attackSpeed = Math.ceil(attackSpeed / 2)
    }
    if(equipment.attack_style.combat_style === "rapid" || equipment.attack_style.combat_style === "flare"){
      attackSpeed -= 1
    }

    if(equipment.ammo.name.includes("bolt")){
      const boltProc = boltDPS(Math.min(50, maxHit), hitChance(state, equipment), state, equipment)
      return (boltProc.dps + (1 - boltProc.procChance) * hitChance(state, equipment) * averageHit) / (0.6 * attackSpeed)
    }
    else{
      return hitChance(state, equipment) * (averageHit / (0.6 * attackSpeed))
    }
  }
  else{
    let attackSpeed = equipment.weapon.attack_speed
    if(state.calcs.fluid_strikes === true || state.calcs.xerics_focus === true){
      attackSpeed = Math.ceil(attackSpeed / 2)
    }
    return hitChance(state, equipment) * ((averageHit) / (0.6 * attackSpeed))
  }
}

export function calcDps(state, equipment){
  if(specialMons.includes(state.enemy.name)){
    return specialDps(state, equipment) + thrallDPS(state)
  }

  const combatType = combatTypeCalc(equipment.attack_style)
  const maxHit = maxHitCalc(state, equipment)
  if(combatType === "magic"){
    return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * magicAtkSpeed(state, equipment))) + thrallDPS(state)
  }
  else if(combatType === "ranged"){
    let attackSpeed = equipment.weapon.attack_speed
    if(state.calcs.quick_shot === true || state.calcs.xerics_focus === true){
      attackSpeed = Math.ceil(attackSpeed / 2)
    }
    if(equipment.attack_style.combat_style === "rapid" || equipment.attack_style.combat_style === "flare"){
      attackSpeed -= 1
    }

    if(equipment.ammo.name.includes("bolt")){
      const boltProc = boltDPS(maxHit, hitChance(state, equipment), state, equipment)
      return (boltProc.dps + (1 - boltProc.procChance) * hitChance(state, equipment) * maxHit / 2) / (0.6 * attackSpeed) + thrallDPS(state)
    }
    else{
      return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * attackSpeed)) + thrallDPS(state)
    }
  }
  else{
    let attackSpeed = equipment.weapon.attack_speed
    if(state.calcs.fluid_strikes === true || state.calcs.xerics_focus === true){
      attackSpeed = Math.ceil(attackSpeed / 2)
    }
    return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * attackSpeed)) + thrallDPS(state)
  }
}

//Extra

function expected_hits(state, equipment){
  const { enemy } = state

  const monsterHp = enemy.hitpoints
  const maxHit = maxHitCalc(state, equipment)
  const accuracy = hitChance(state, equipment) * (1 - 1 / (maxHit + 1));
  let expectation = [0.0];
  let runningSum = 0.0;
  for (let i=1; i < monsterHp + 1; i++){
    if (i - maxHit - 1 >= 0){
        runningSum -= expectation[i - maxHit - 1];
    }
    runningSum += expectation[i - 1];
    expectation.push(1 / accuracy + runningSum / maxHit);
  }
  return(expectation[expectation.length - 1])
}

export function expected_ttk(state, equipment){
  const combatType = combatTypeCalc(equipment.attack_style)
  let attackSpeed = combatType === "magic" ? magicAtkSpeed(state, equipment) : equipment.weapon.attack_speed
  if((state.calcs.quick_shot === true && combatType === "ranged") || (state.calcs.fluid_strikes === true && combatType === "melee")){
    attackSpeed = Math.ceil(attackSpeed / 2)
  }
  if(state.calcs.xerics_focus === true){
    attackSpeed = Math.ceil(attackSpeed / 2)
  }
  if(equipment.attack_style.combat_style === "rapid" || equipment.attack_style.combat_style === "flare"){
    attackSpeed -= 1
  }
  return (attackSpeed * 0.6) * expected_hits(state, equipment)
}

export function overkill_dps(state, equipment){
  return state.enemy.hitpoints / expected_ttk(state, equipment)
}
