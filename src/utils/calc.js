export function combatLvlCalc(stats){
  const { defence, hitpoints, prayer, attack, strength, ranged, magic } = stats
  const base = (defence.level + hitpoints.level + Math.floor(prayer.level/2))/4
  const melee = 0.325 * (attack.level + strength.level)
  const range = 0.325 * (Math.floor(ranged.level)/2 + ranged.level)
  const mage = 0.325 * (Math.floor(magic.level)/2 + magic.level)
  const combat_level = base + Math.max(melee, range, mage)
  return Math.floor(combat_level)
}

export function capitalise([firstLetter, ...restOfWord]){
  return firstLetter.toUpperCase() + restOfWord.join('')
}

export function combatTypeCalc(attack_style){
  if(attack_style.experience === "ranged" || attack_style.experience === "ranged and defence"){
    return "ranged"
  }
  else if(attack_style.experience === "magic" || attack_style.experience === "magic and defence"){
    return "magic"
  }
  else{
    return "melee"
  }
}

export function attack_style_name(attack_style){
  if(attack_style.experience === "magic" || attack_style.experience === "magic and defence"){
    return "attack_magic"
  }
  else if(attack_style.experience === "ranged" || attack_style.experience === "ranged and defence"){
    return "attack_ranged"
  }
  else{
    return "attack_" + attack_style.attack_type
  }
}

export function strength_style_name(attack_style){
  if(attack_style.experience === "magic" || attack_style.experience === "magic and defence"){
    return "magic_damage"
  }
  else if(attack_style.experience === "ranged" || attack_style.experience === "ranged and defence"){
    return "ranged_strength"
  }
  else{
    return "melee_strength"
  }
}

export function defTypeName(attack_style){
  if(attack_style.experience === "ranged" || attack_style.experience === "ranged and defence"){
    return "defence_ranged"
  }
  else if(attack_style.experience === "magic" || attack_style.experience === "magic and defence"){
    return "defence_magic"
  }
  else{
    return "defence_" + attack_style.attack_type
  }
}


export function potion_effect(statLvl, potion) {
  var potion_effect = 0
  if(potion === 'None'){
    potion_effect = 0
  }
  else if(potion.includes("Super")){
    potion_effect = 0.15 * statLvl + 5
  }
  else if(potion === "Overload (+)"){
    potion_effect = 0.16 * statLvl + 6
  }
  else if(potion === "Overload"){
    potion_effect = 0.15 * statLvl + 5
  }
  else if(potion === "Zamorak Brew"){
    potion_effect = 0.2 * statLvl + 2
  }
  else if(potion === "Saradomin Brew"){
    potion_effect = 0.2 * statLvl + 2
  }
  else if(potion === "Magic"){
    potion_effect = 4
  }
  else if(potion === "Imbued heart"){
    potion_effect = 0.1 * statLvl + 1
  }
  else if(potion ===  "Ranging"){
    potion_effect = 0.1 * statLvl + 4
  }
  else{
    potion_effect = 0.10 * statLvl + 3
  }
  return parseInt(statLvl) + parseInt(Math.floor(potion_effect))
}

function prayer_effect(statName, statValue, prayer) {
  var prayer_effect = 0
  if(prayer === "None"){
    prayer_effect = 0
  }
  else if(prayer === "5%"){
    prayer_effect = 0.05 * statValue
  }
  else if(prayer === "10%"){
    prayer_effect = 0.1 * statValue
  }
  else if(prayer === "15%"){
    prayer_effect = 0.15 * statValue
  }
  else if(prayer === "Piety"){
    if(statName === "attack"){
      prayer_effect = 0.2 * statValue
    }
    else if(statName === "strength"){
      prayer_effect = 0.23 * statValue
    }
    else if(statName === "defence"){
      prayer_effect = 0.25 * statValue
    }
  }
  else if(prayer === "Chivalry"){
    if(statName === "attack"){
      prayer_effect = 0.15 * statValue
    }
    else if(statName === "strength"){
      prayer_effect = 0.18 * statValue
    }
    else if(statName === "defence"){
      prayer_effect = 0.2 * statValue
    }
  }
  else if(prayer ==="Augury"){
    prayer_effect = 0.25 * statValue
  }
  else if(prayer === "Rigour"){
    prayer_effect = 0.2 * statValue
  }
  return parseInt(statValue) + Math.floor(prayer_effect)
}


export function elvlCalc(statName, baseStat, changedVar, changeType){
  let { level, potion, prayer } = baseStat
  if(changeType === "prayer"){
    prayer = changedVar
  }
  else if(changeType === "potion"){
    potion = changedVar
  }
  else if(changeType === "level"){
    level = changedVar
  }

  const potionLvl = potion_effect(level, potion)
  const effectiveLevel = prayer_effect(statName, potionLvl, prayer)
  return effectiveLevel
}

export function elvl_calc(stat_name, stat){
  const { level, potion, prayer } = stat
  const potionLvl = parseInt(potion_effect(parseInt(level), potion))
  const total_elvl = prayer_effect(stat_name, potionLvl, prayer)

  return {
    "level": level,
    "potion": potion,
    "prayer": prayer,
    "effective_level": total_elvl,
  }
}
