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


export function potion_effect(stat, potion) {
  var potion_effect = 0
  if(potion === 'None'){
    potion_effect = 0
  }
  else if(potion.includes("Super")){
    potion_effect = 0.15 * stat + 5
  }
  else if(potion === "Overload (+)"){
    potion_effect = 0.16 * stat + 6
  }
  else if(potion === "Overload"){
    potion_effect = 0.15 * stat + 5
  }
  else if(potion === "Zamorak Brew"){
    potion_effect = 0.2 * stat + 2
  }
  else if(potion === "Saradomin Brew"){
    potion_effect = 0.2 * stat + 2
  }
  else if(potion === "Magic"){
    potion_effect = 4
  }
  else if(potion === "Imbued heart"){
    potion_effect = 0.1 * stat + 1
  }
  else if(potion ===  "Ranging"){
    potion_effect = 0.1 * stat + 4
  }
  else{
    potion_effect = 0.10 * stat + 3
  }
  return parseInt(stat) + parseInt(Math.floor(potion_effect))
}

function prayer_effect(type, stat, prayer) {
  var prayer_effect = 0
  if(prayer === "None"){
    prayer_effect = 0
  }
  else if(prayer === "5%"){
    prayer_effect = 0.05 * stat
  }
  else if(prayer === "10%"){
    prayer_effect = 0.1 * stat
  }
  else if(prayer === "15%"){
    prayer_effect = 0.15 * stat
  }
  else if(prayer === "Piety"){
    if(type === "attack"){
      prayer_effect = 0.2 * stat
    }
    else if(type === "strength"){
      prayer_effect = 0.23 * stat
    }
    else if(type === "defence"){
      prayer_effect = 0.25 * stat
    }
  }
  else if(prayer === "Chivalry"){
    if(type === "attack"){
      prayer_effect = 0.15 * stat
    }
    else if(type === "strength"){
      prayer_effect = 0.18 * stat
    }
    else if(type === "defence"){
      prayer_effect = 0.2 * stat
    }
  }
  else if(prayer ==="Augury"){
    prayer_effect = 0.25 * stat
  }
  else if(prayer === "Rigour"){
    prayer_effect = 0.2 * stat
  }
  return parseInt(stat) + Math.floor(prayer_effect)
}


export function elvl_calc(stat_name, stat){
  const { level, potion, prayer } = stat
  var prayer_elvl = parseInt(potion_effect(parseInt(level), potion))
  var total_elvl = prayer_effect(stat_name, prayer_elvl, prayer)

  return {
    "level": level,
    "potion": potion,
    "prayer": prayer,
    "effective_level": total_elvl,
  }
}
