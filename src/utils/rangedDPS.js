import { potion_effect } from './calc'
import { gear_bonus, void_bonus, totalAtkCalc, totalStrCalc } from './sharedDPS'

function rangeStyleBonus(style, attack_boolean){
  if(style === "accurate"){
    return (attack_boolean ? 3 : 3)
  }
  else if(style === "rapid"){
    return (attack_boolean ? 0 : 0)
  }
  else if(style === "longrange"){
    return (attack_boolean ? 1 : 1)
  }
  else{
    return 0
  }
}


export function boltDPS(maxHit, hitChance, state, equipment){
  const { stats, enemy, calcs } = state
  const visibleRangedLvl = potion_effect(stats.ranged.level, stats.ranged.potion)

  if(equipment.ammo.name === "Opal bolts (e)" || equipment.ammo.name === "Opal dragon bolts (e)"){
    //Deals visible ranged level * 10%
    const procChance = (calcs.kandarin_hard ? 0.055 : 0.05)
    const extraDmg = Math.floor(visibleRangedLvl * 0.1)
    const boltDPS = procChance * (0.5 * maxHit + extraDmg)
    return {'dps': boltDPS, 'procChance': procChance}
  }
  else if(equipment.ammo.name === "Pearl bolts (e)" || equipment.ammo.name === "Pearl dragon bolts (e)"){
    const procChance = (calcs.kandarin_hard ? 0.066 : 0.06)
    const extraDmg = (enemy.attributes.includes("fiery") ? visibleRangedLvl / 15 : visibleRangedLvl / 20 )
    const boltDPS = procChance * (0.5 * maxHit + extraDmg)
    return {'dps': boltDPS, 'procChance': procChance}
  }
  //this ruby bolt(e) calculation assumes full health, halving extra damage would get the average over the fight
  else if(equipment.ammo.name === "Ruby bolts (e)" || equipment.ammo.name === "Ruby dragon bolts (e)"){
    const procChance = (calcs.kandarin_hard ? 0.066 : 0.06)
    const extraDmg = Math.min(Math.floor(enemy.hitpoints * 0.2), 100)
    const boltDPS = procChance * extraDmg
    return {'dps': boltDPS, 'procChance': procChance}
  }
  else if(equipment.ammo.name === "Diamond bolts (e)" || equipment.ammo.name === "Diamond dragon bolts (e)"){
    const procChance = (calcs.kandarin_hard ? 0.11 : 0.1)
    const extraDmg = maxHit * 1.15 * 0.5
    const boltDPS = procChance * extraDmg
    return {'dps': boltDPS, 'procChance': procChance}
  }
  else if((equipment.ammo.name === "Dragonstone bolts (e)" || equipment.ammo.name === "Dragonstone dragon bolts (e)") &&
     (!enemy.attributes.includes("dragon") || !enemy.attributes.includes("fiery"))){
    const procChance = (calcs.kandarin_hard ? 0.066 : 0.06)
    const extraDmg = Math.floor(visibleRangedLvl * 0.2)
    const boltDPS = hitChance * procChance * (0.5 * maxHit + extraDmg)
    return {'dps': boltDPS, 'procChance': procChance}
  }
  else if((equipment.ammo.name === "Onyx bolts (e)" || equipment.ammo.name === "Onyx dragon bolts (e)") && !enemy.attributes.includes("undead")){
    const procChance = (calcs.kandarin_hard ? 0.11 : 0.121)
    const extraDmg = 1.2 * maxHit
    const boltDPS = hitChance * procChance * 0.5 * extraDmg
    return {'dps': boltDPS, 'procChance': procChance}
  }
  return {'dps': 0, 'procChance': 0}
}


function rangeGearBonus(state, equipment){
  const { enemy, calcs } = state
  if(equipment.weapon.name === "Dark bow"){
    return {'accMultiplier': 1, 'dmgMultiplier': 2}
  }

  if(equipment.weapon.name === "Dragon hunter crossbow" && enemy.attributes.includes("dragon")){
    return {'accMultiplier': 1.3, 'dmgMultiplier': 1.3}
  }

  if(equipment.weapon.name === "Craw's bow" && calcs.wilderness){
    return {'accMultiplier': 1.5, 'dmgMultiplier': 1.5}
  }

  if(equipment.weapon.name === "Twisted bow"){
    const magicValue = Math.max(enemy.magic_level, enemy.stats.attack_magic)
    const isXerician = enemy.attributes.includes("xerician")
    const enemyMagic = (isXerician ? Math.min(magicValue, 350) : Math.min(magicValue, 250))

    const accuracy = ( 140 + (30*enemyMagic/10 - 10)/100 - (((3*enemyMagic/10)-100) ** 2)/100 ) / 100
    const damage = ( 250 + (30*enemyMagic/10 - 14)/100 - (((3*enemyMagic/10)-140) ** 2)/100 ) / 100
    const accMultiplier = Math.max(accuracy, 0)
    const dmgMultiplier = Math.max(damage, 0)
    return {'accMultiplier': accMultiplier, 'dmgMultiplier': dmgMultiplier}
  }
  if(equipment.head.name === "Karil's coif" && equipment.body.name === "Karils leathertop" && equipment.legs.name === "Karil's leatherskirt" && equipment.weapon.name === "Karil's crossbow" && equipment.neck.name === "Amulet of the damned"){
    return {'accMultiplier': 1, 'dmgMultiplier': 1.125}
  }

  const isCrystalBow = equipment.weapon.name.includes("Crystal bow")
  const crystalItems = []
  if(equipment.body.name === "Crystal body"){
    crystalItems.push("Crystal body")
  }
  if(equipment.head.name === "Crystal helm"){
    crystalItems.push("Crystal helm")
  }
  if(equipment.legs.name === "Crystal legs"){
    crystalItems.push("Crystal legs")
  }

  if(isCrystalBow && crystalItems.length === 3){
    return {'accMultiplier': 1.3, 'dmgMultiplier': 1.15}
  }
  else if(isCrystalBow){
    const accMultiplier = 1 + 0.06 * crystalItems.length
    const dmgMultiplier = 1 + 0.03 * crystalItems.length
    return {'accMultiplier': accMultiplier, 'dmgMultiplier': dmgMultiplier}
  }

  return {'accMultiplier': 1, 'dmgMultiplier': 1}
}

//1.025 is the rigour bonus for str being 23%
export function rangeMaxHit(state, equipment){
  const rigourBonus = Math.floor(state.stats.ranged.effective_level * (state.stats.ranged.prayer === "Rigour" ? 1.025 : 1))
  const effectiveRangeStr = Math.floor((rigourBonus + rangeStyleBonus(equipment.attack_style.combat_style, false) + 8) * void_bonus(equipment, "ranged")[0])
  return Math.floor(Math.floor((effectiveRangeStr * (totalStrCalc(equipment) + 64) +  320) / 640) * gear_bonus(state, equipment, "ranged")[0] * rangeGearBonus(state, equipment).dmgMultiplier)
}

export function rangeAtkRoll(state, equipment){
  const { stats } = state
  const effRangedAtk = Math.floor((stats.ranged.effective_level + rangeStyleBonus(equipment.attack_style.attack_style, true) + 8) * void_bonus(equipment, "ranged")[0])
  return Math.floor(effRangedAtk * (totalAtkCalc(equipment) + 64) * gear_bonus(state, equipment, "ranged")[0] * rangeGearBonus(state, equipment).accMultiplier)
}
