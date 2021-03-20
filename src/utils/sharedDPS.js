import { attack_style_name, strength_style_name, defTypeName, combatTypeCalc, potion_effect } from './calc'
import { meleeMaxHit, meleeAtkRoll } from './meleeDPS'
import { mageMaxHit, mageAtkRoll } from './magicDPS'
import { boltDPS, rangeMaxHit, rangeAtkRoll } from './rangedDPS'

//Returns array, first value is damage bonus, second value is accuracy bonus
export function gear_bonus(state, equipment, type){
  const { enemy, calcs } = state
  if(equipment.neck.name === "Salve amulet(ei)" && enemy.attributes.includes("undead")){
    return [1.2, 1.2]
  }
  else if(equipment.neck.name === "Salve amulet(i)" && enemy.attributes.includes("undead")){
    if(type === "melee"){
      return [1.1667, 1.1667]
    }
    else if(type === "range"){
      return [1.1667, 1.1667]
    }
    else if(type === "magic"){
      return [1.15, 1.15]
    }
  }
  else if(equipment.head.name === "Slayer helmet (i)" && calcs.slayer_task){
    if(type === "melee"){
      return [1.1667, 1.1667]
    }
    else if(type === "range"){
      return [1.15, 1.15]
    }
    else if(type === "magic"){
      return [1.15, 1.15]
    }
  }

  return [1, 1]
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
  if(equipment.legs.name === "Elite void top" && equipment.legs.name === "Elite void robe" && equipment.head.name === "Void knight helm"){
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


function enemyStatReductions(defence, state){
  const { calcs, enemy } = state
  let defenceLevel = defence

  //dwh specials
  for(let i = 0; i < calcs.dwh_specials; i++){
    defenceLevel = Math.ceil(defenceLevel * 0.7)
  }

  //arclight specials
  if(enemy.attributes.includes("demon") && calcs.arclight_specials > 0){
    defenceLevel = Math.ceil(defenceLevel * (1 - 0.1 * calcs.arclight_specials))
  }
  else if(calcs.arclight_specials > 0){
    defenceLevel = Math.ceil(defenceLevel * (1 - 0.05 * calcs.arclight_specials))
  }

  //bgs reduction order Def > Str > mage > atk > ranged
  if(calcs.bgs_dmg > 0){
    defenceLevel = Math.max(0, defenceLevel - calcs.bgs_dmg)
  }

  return defenceLevel
}


export function eMaxDefRoll(state, equipment){
  const { calcs, enemy } = state
  const style = defTypeName(equipment.attack_style)
  if(style === "defence_magic"){
    if(equipment.ring.name === "Brimstone ring"){
      const defRoll = (enemy.magic_level + 9) * (enemy.stats[style] + 64)
      return Math.floor(0.75 * defRoll + 0.025 * defRoll)
    }
    else {
      return ((enemy.magic_level + 9) * (enemy.stats[style] + 64))
    }
  }
  else{
    return ((enemyStatReductions(enemy.defence_level, state) + 9) * (enemy.stats[style] + 64))
  }
}

function calcHitChance(atkRoll, defRoll){
  if(atkRoll > defRoll){
    return 1 - (defRoll + 2) / (2 * (atkRoll +1))
  }
  else{
    return atkRoll / (2 * defRoll + 1)
  }
}

export function hitChance(state, equipment){
  const { stats, enemy, calcs } = state
  const combatType = combatTypeCalc(equipment.attack_style)
  if(combatType === "ranged"){
    return calcHitChance(rangeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
  }
  else if(combatType === "magic"){
    return calcHitChance(mageAtkRoll(stats, equipment), eMaxDefRoll(state, equipment))
  }
  else{
    return calcHitChance(meleeAtkRoll(state, equipment), eMaxDefRoll(state, equipment))
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

function magicAtkSpeed(equipment){
  let spell = equipment.spell
  if(equipment.weapon.name === "Harmonished nightmare staff" && spell.spellbook === "standard"){
    return 4
  }
  else if(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange"){
    return equipment.weapon.attack_speed
  }
  else{
    return equipment.spell.attack_speed
  }
}

export function calcDps(state, equipment){
  const combatType = combatTypeCalc(equipment.attack_style)
  const maxHit = maxHitCalc(state, equipment)
  if(combatType === "magic"){
    return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * magicAtkSpeed(equipment)))
  }
  else if(combatType === "ranged"){
    let attackSpeed = equipment.weapon.attack_speed
    if(equipment.attack_style.combat_style === "rapid" || equipment.attack_style.combat_style === "flare"){
      attackSpeed -= 1
    }

    if(equipment.ammo.name.includes("bolt")){
      const boltProc = boltDPS(maxHit, hitChance(state, equipment), state, equipment)
      return (boltProc.dps + (1 - boltProc.procChance) * hitChance(state, equipment) * maxHit / 2) / (0.6 * attackSpeed)
    }
    else{
      return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * attackSpeed))
    }
  }
  else{
    return hitChance(state, equipment) * ((maxHit / 2) / (0.6 * equipment.weapon.attack_speed))
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
  const { enemy } = state
  const combatType = combatTypeCalc(equipment.attack_style)
  const attackSpeed = combatType === "magic" ? magicAtkSpeed(equipment) : equipment.weapon.attack_speed
  return (attackSpeed * 0.6) * expected_hits(enemy.hitpoints, maxHitCalc(state, equipment), hitChance(state, equipment))
}

export function overkill_dps(state, equipment){
  return state.enemy.hitpoints / expected_ttk(state, equipment)
}
