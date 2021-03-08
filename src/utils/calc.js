export function combatTypeCalc(attack_style){
  if(attack_style.combat_style === "accurate" || attack_style.combat_style === "rapid" || attack_style.combat_style === "longrange"){
    return "ranged"
  }
  else if(attack_style.experience === "magic"){
    return "magic"
  }
  else{
    return "melee"
  }
}

export function attack_style_name(attack_style){
  if(attack_style.experience === "magic"){
    return "attack_magic"
  }
  else if(attack_style.combat_style === "accurate" || attack_style.combat_style === "rapid" || attack_style.combat_style === "longrange"){
    return "attack_ranged"
  }
  else{
    return "attack_" + attack_style.attack_type
  }
}

export function strength_style_name(attack_style){
  if(attack_style.experience === "magic"){
    return "magic_damage"
  }
  else if(attack_style.combat_style === "accurate" || attack_style.combat_style === "rapid" || attack_style.combat_style === "longrange"){
    return "ranged_strength"
  }
  else{
    return "melee_strength"
  }
}

export function defTypeName(attack_style){
  if(attack_style.combat_style === "accurate" || attack_style.combat_style === "rapid" || attack_style.combat_style === "longrange"){
    return "defence_ranged"
  }
  else if(attack_style.experience === "magic"){
    return "defence_magic"
  }
  else{
    return "defence_" + attack_style.attack_type
  }
}


function potion_effect(stat, potion) {
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
    if(type === "Attack"){
      prayer_effect = 0.2 * stat
    }
    else if(type === "Strength"){
      prayer_effect = 0.23 * stat
    }
    else if(type === "Defence"){
      prayer_effect = 0.25 * stat
    }
  }
  else if(prayer === "Chivalry"){
    if(type === "Attack"){
      prayer_effect = 0.15 * stat
    }
    else if(type === "Strength"){
      prayer_effect = 0.18 * stat
    }
    else if(type === "Defence"){
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
