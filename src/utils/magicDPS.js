import { potion_effect } from '../utils/calc'
import { gear_bonus, void_bonus, totalAtkCalc, totalStrCalc } from '../utils/sharedDPS'

//Only used if attacking with staff skill
function mageCombatBonus(attackStyle){
  if(attackStyle === "accurate"){
    return 3
  }
  else if(attackStyle === "longrange"){
    return 1
  }
  else{
    return 0
  }
}

//Max hit of Staff attack
function staffMaxHit(state, equipment){
  const { stats } = state
  const visibleMageLvl = potion_effect(stats.magic.level, stats.magic.potion)
  if(equipment.weapon.name === "Trident of the swamp"){
    return 23 + Math.floor((visibleMageLvl - 75)/3)
  }
  else if(equipment.weapon.name === "Trident of the seas"){
    return 20 + Math.floor((visibleMageLvl - 75)/3)
  }
  else if(equipment.weapon.name === "Sanguinesti staff"){
    return 24 + Math.floor((visibleMageLvl - 75)/3)
  }
  else if(equipment.weapon.name === "Black salamander" && equipment.attack_style.combat_style === "blaze"){
    return Math.floor(0.5 + visibleMageLvl * 156 / 640)
  }
  else if(equipment.weapon.name === "Slayer's staff (e)" && equipment.spell.name === "magic_dart"){
    return 13 + Math.floor(visibleMageLvl / 6)
  }
  else if(equipment.spell.name === "magic_dart"){
    return 10 + Math.floor(visibleMageLvl / 10)
  } else if(equipment.weapon.name.includes("Tumeken")) {
    return 1 + Math.floor(visibleMageLvl/3)
  }
  else{
    return null
  }
}


function magicBonus(state, equipment){
  const { calcs, enemy } = state
  const { spell }  = equipment
  let accMultiplier = 0
  let dmgMultiplier = 0

  if(calcs.mark_darkness && spell.element === "demonbane" && enemy.attributes.includes("demon")){
    accMultiplier += 0.25
    dmgMultiplier += 0.25
  }

  if((equipment.weapon.name === "Smoke battlestaff" || equipment.weapon.name === "Mystic smoke staff") && spell.spellbook === "standard"){
    accMultiplier += 0.1
    dmgMultiplier += 0.1
  }
  if(enemy.name === "Ice demon" && equipment.attack_style.combat_style.includes("spell") && (equipment.spell.element === "fire" || equipment.spell.name === "flames_of_zamorak")){
      dmgMultiplier += 0.5
  }
  if(equipment.head.name === "Ahrim's hood" &&
     equipment.body.name === "Ahrim's robetop" &&
     equipment.legs.name === "Ahrim's robeskirt" &&
     equipment.weapon.name === "Ahrim's staff" &&
     equipment.neck.name === "Amulet of the damned"){
       dmgMultiplier = dmgMultiplier * 1.075
  }
  if(equipment.weapon.name === "Thammaron's sceptre" && calcs.wilderness){
    accMultiplier += 1
    dmgMultiplier += 0.25
  }
  if(state.calcs.double_cast === true){
    accMultiplier += 1.25
  }
  if(equipment.shield.name === "Tome of water" && equipment.spell.element === "water" && !(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange")){
    accMultiplier += 0.2
  }
  return {'accMultiplier': accMultiplier, 'dmgMultiplier': dmgMultiplier}
}


function mageBonusDamage(spellDamage, state, equipment){
  const { enemy, calcs } = state
    let updatedDamage = spellDamage
    if(equipment.neck.name === "Salve amulet(i)" && enemy.attributes.includes("undead")){
      updatedDamage = Math.floor(updatedDamage * 1.15)
    }
    else if(equipment.neck.name === "Salve amulet(ei)" && enemy.attributes.includes("undead")){
      updatedDamage = Math.floor(updatedDamage * 1.20)
    }
    else if((equipment.head.name === "Black mask (i)" || equipment.head.name === "Slayer helmet (i)") && calcs.slayer_task){
      updatedDamage = Math.floor(updatedDamage * 1.15)
    }

    if(equipment.shield.name === "Tome of fire" && equipment.spell.element === "fire" && !(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange")){
      updatedDamage = Math.floor(updatedDamage * 1.5)
    }
    else if(equipment.shield.name === "Tome of water" && equipment.spell.element === "water" && !(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange")){
      updatedDamage = Math.floor(updatedDamage * 1.2)
    }

    return updatedDamage
}

function spellDamage(spellDamage, state, equipment){
  let magicDamageBase = spellDamage
  const enemy = state.enemy
  const spell = equipment.spell

  if(spell.name.includes("bolt") && equipment.hands.name === "Chaos gauntlets"){
    magicDamageBase += 3
  }

  if(spell.element === "demonbane" && !enemy.attributes.includes("demon")){
    magicDamageBase = 0
  }

  return magicDamageBase
}


/*
    ###########################################################################################
                                  Damage Calculations
    ###########################################################################################
*/
export function mageMaxHit(state, equipment){
  const spell = equipment.spell
  let magicDamageBase = spellDamage(spell.damage, state, equipment)

  if(staffMaxHit(state, equipment) && (equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange" || equipment.attack_style.combat_style === "blaze")){
    magicDamageBase = staffMaxHit(state, equipment)
  }

  let wepName = equipment.weapon.name
  if(wepName.includes("Tumeken") && wepName.includes("Inside")) {
    magicDamageBase = Math.floor(magicDamageBase * Math.min(2, (1 + totalStrCalc(equipment) * 4 / 100)))

  } else if(wepName.includes("Tumeken") && wepName.includes("Outside")) {
    //3x magic str and atk bonus max at 100% increase
    magicDamageBase = Math.floor(magicDamageBase * Math.min(2, (1 + totalStrCalc(equipment) * 3 / 100)))

  } else {
    magicDamageBase = Math.floor(magicDamageBase * (1 + totalStrCalc(equipment)/100 + magicBonus(state, equipment).dmgMultiplier))

  }


  return mageBonusDamage(magicDamageBase, state, equipment)
}


export function mageAtkRoll(state, equipment){
  const { stats } = state

  let wepName = equipment.weapon.name
  let baseAtkRoll
  if(wepName.includes("Tumeken") && wepName.includes("Inside")) {
    baseAtkRoll = (stats.magic.effective_level + 8 + mageCombatBonus(equipment.attack_style.combat_style)) * (totalAtkCalc(equipment) * 4 + 64)

  } else if(wepName.includes("Tumeken") && wepName.includes("Outside")) {
    //3x magic str and atk bonus max at 100% increase
    baseAtkRoll = (stats.magic.effective_level + 8 + mageCombatBonus(equipment.attack_style.combat_style)) * (totalAtkCalc(equipment) * 3 + 64)

  } else {
    baseAtkRoll = (stats.magic.effective_level + 8 + mageCombatBonus(equipment.attack_style.combat_style)) * (totalAtkCalc(equipment) + 64)

  }
  return Math.floor(baseAtkRoll * (1 + magicBonus(state, equipment).accMultiplier) * (void_bonus(equipment, "magic")[1] + gear_bonus(state, equipment, "magic")[1] - 1))
}
