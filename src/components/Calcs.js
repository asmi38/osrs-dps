import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { attack_style_name, strength_style_name, defTypeName, combatTypeCalc } from '../utils/calc'



class Calcs extends Component {
  render(){
    const { calcs, equipment, stats, enemy } = this.props
    const { slayer_task } = calcs
    const { spell } = equipment

    //determine combat_type ranged/magic/melee
    const combatType = combatTypeCalc(equipment.attack_style)

    //GEAR AND SET BONUSES
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

    //attack_boolean is true if it is attack bonus, false for strength bonus
    function range_bonus(style, attack_boolean){
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

    function magic_bonus(equipment, spell){
      var bonus = 1
      if(equipment.hands.name === "Tormented bracelet"){
        bonus = bonus + 0.05
      }
      if(equipment.weapon.name === "Staff of the dead" ||
         equipment.weapon.name === "Toxic staff of the dead" ||
         equipment.weapon.name === "Staff of light" ||
         equipment.weapon.name === "Staff of balance"){
           bonus = bonus + 0.15
      }
      if(equipment.head.name === "Ancestral hat"){
        bonus = bonus + 0.02
      }
      if(equipment.body.name === "Ancestral robe top"){
        bonus = bonus + 0.02
      }
      if(equipment.legs.name === "Ancestral robe bottom"){
        bonus = bonus + 0.02
      }
      if(equipment.neck.name === "Occult necklace"){
        bonus = bonus + 0.1
      }
      if(equipment.weapon.name === "Smoke battlestaff" && spell.spellbook === "standard"){
        bonus = bonus + 0.1
      }
      if(equipment.weapon.name === "Kodai wand"){
        bonus = bonus + 0.15
      }
      if(equipment.weapon.name === "Ahrim's staff"){
        bonus = bonus + 0.05
      }
      if(equipment.legs.name === "Elite void top" && equipment.legs.name === "Elite void robe" && equipment.head.name === "Void knight helm"){
        bonus = bonus + 0.025
      }
      if(equipment.cape.name === "Imbued god cape"){
        bonus = bonus + 0.02
      }
      if(equipment.weapon.name === "Nightmare staff" || equipment.weapon.name.includes("nightmare staff")){
        bonus = bonus + 0.15
      }
      if(equipment.head.name === "Ahrim's hood" &&
         equipment.body.name === "Ahrim's robetop" &&
         equipment.legs.name === "Ahrim's robeskirt" &&
         equipment.weapon.name === "Ahrim's staff" &&
         equipment.neck.name === "Amulet of the damned"){
           bonus = bonus * 1.075
      }
      return bonus
    }

    function dharokBonus(){
      if(equipment.head.name === "Dharok's helm" &&
         equipment.body.name === "Dharok's platebody" &&
         equipment.legs.name === "Dharok's platelegs" &&
         equipment.weapon.name === "Dharok's greataxe"){
           return 1 + (stats.Hitpoints.level - calcs.remaining_hp) / 100 * (stats.Hitpoints.level / 100)
      }
      return 1
    }

    function mageBonusDamage(spellDamage, equipment, enemy, calcs){
        var updatedDamage = spellDamage
        if(equipment.neck.name === "Salve amulet(i)" && enemy.attributes.includes("undead")){
          updatedDamage = Math.floor(updatedDamage * 1.15)
        }
        else if(equipment.neck.name === "Salve amulet(ei)" && enemy.attributes.includes("undead")){
          updatedDamage = Math.floor(updatedDamage * 1.20)
        }
        else if((equipment.head.name === "Black mask (i)" || equipment.head.name === "Slayer helmet (i)") && calcs.slayer_task){
          updatedDamage = Math.floor(updatedDamage * 1.15)
        }

        if(equipment.shield.name === "Tome of fire" && equipment.spell.element === "fire"){
          updatedDamage = Math.floor(updatedDamage * 1.5)
        }

        return updatedDamage
    }

    //Returns array, first value is damage bonus, second value is accuracy bonus
    function gear_bonus(type){
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
      else if((equipment.head.name === "Slayer helmet (i)" || equipment.head.name === "Black mask (i)") && slayer_task){
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
    function void_bonus(type){
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

    function totalAtkCalc(equipment){
      const style = attack_style_name(equipment.attack_style)
      const keys = Object.keys(equipment).filter(word => word !== "attack_style").filter(word => word !== "spell")
      const values = (keys.map(equip_name =>
        equipment[equip_name].stats[style]))

      return values.reduce((a, b) => a + b, 0)
    }

    function totalStrCalc(equipment){
      const keys = Object.keys(equipment).filter(word => word !== "attack_style").filter(word => word !== "spell")
      const values = (keys.map(equip_name =>
        equipment[equip_name].stats[strength_style_name(equipment.attack_style)]))

      return values.reduce((a, b) => a + b, 0)
    }

    //DAMAGE CALCS

    //STRENGTH && MAX HIT CALCS
    //
    //1.025 is the rigour bonus for str being 23%
    function rangeMaxHit(){
      const rigourBonus = Math.floor(stats.Ranged.effective_level * (stats.Ranged.prayer === "Rigour" ? 1.025 : 1))
      const effectiveRangeStr = Math.floor((rigourBonus + range_bonus(equipment.attack_style.combat_style, false) + 8) * void_bonus(combatType)[0])
      return Math.floor(Math.floor((effectiveRangeStr * (totalStrCalc(equipment) + 64) +  320) / 640) * gear_bonus("range")[0])
    }

    function meleeMaxHit(){
      const effectiveMeleeStr = (stats.Strength.effective_level + melee_bonus(equipment.attack_style.attack_style, false) + 8) * void_bonus("melee")[0]
      const effMeleeAndNumeric = Math.floor( ((effectiveMeleeStr * (totalStrCalc(equipment) + 64)) + 320) / 640 )
      const addGearBonus = Math.floor(effMeleeAndNumeric * gear_bonus("melee")[0])
      const maxHit = Math.floor(addGearBonus * dharokBonus())
      return maxHit
    }

    function mageMaxHit(){
      var spellDamageBase = spell.damage
      if(spell.name.includes("bolt") && equipment.hands === "Chaos gauntlets"){
        spellDamageBase += 3
      }
      spellDamageBase = Math.floor(spellDamageBase * magic_bonus(equipment, spell))
      return mageBonusDamage(spellDamageBase, equipment, enemy, calcs)
    }

    //
    //
    //
    //Attack Roll calculations
    //
    //
    //

    function rangeAtkRoll(){
      const effRangedAtk = Math.floor((stats.Ranged.effective_level + range_bonus(equipment.attack_style.attack_style, true) + 8) * void_bonus("range")[0])
      return Math.floor(effRangedAtk * (totalAtkCalc(equipment) + 64) * gear_bonus("range")[0])
    }

    function mageAtkRoll(){
      //need to include atk style bonus to lvl
      const baseAtkRoll = (stats.Magic.effective_level + 8) * (totalAtkCalc(equipment) + 64)
      return Math.floor(baseAtkRoll * (void_bonus("magic")[1] + gear_bonus("magic")[1] - 1))
    }


    function meleeAtkRoll(){
      const effectiveAtkLvl = (stats.Attack.effective_level + melee_bonus(equipment.attack_style.attack_style, true) + 8) * void_bonus("melee")[1]
      const maxAtkRoll = (effectiveAtkLvl * (totalAtkCalc(equipment) + 64)) * gear_bonus("melee")[1]
      return Math.floor(maxAtkRoll)
    }

    function eMaxDefRoll(){
      const style = defTypeName(equipment.attack_style)
      if(style === "defence_magic"){
        return ((enemy.magic_level + 9) * (enemy.stats[style] + 64))
      }
      else{
        return ((enemy.defence_level + 9) * (enemy.stats[style] + 64))
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

    function hitChance(){
      if(combatType === "ranged"){
        return calcHitChance(rangeAtkRoll(), eMaxDefRoll())
      }
      else if(combatType === "magic"){
        return calcHitChance(mageAtkRoll(), eMaxDefRoll())
      }
      else{
        return calcHitChance(meleeAtkRoll(), eMaxDefRoll())
      }
    }

    function maxHitCalc(){
      if(combatType === "ranged"){
        return rangeMaxHit()
      }
      else if(combatType === "magic"){
        return mageMaxHit()
      }
      else{
        return meleeMaxHit()
      }
    }

    function calcDps(){
      const maxHit = maxHitCalc()
      if(combatType === "magic"){
        return hitChance() * ((maxHit / 2) / (0.6 * equipment.spell.attack_speed))
      }
      else if(combatType === "ranged" && equipment.attack_style.combat_style == "rapid"){
        return hitChance() * ((maxHit / 2) / (0.6 * (equipment.weapon.attack_speed - 1)))
      }
      else{
        return hitChance() * ((maxHit / 2) / (0.6 * equipment.weapon.attack_speed))
      }
    }

    //Extra

    function expected_hits(){
      const monsterHp = enemy.hitpoints
      const maxHit = maxHitCalc()
      const accuracy = hitChance() * (1 - 1 / (maxHit + 1));
      var expectation = [0.0];
      var runningSum = 0.0;
      for (var i=1; i < monsterHp + 1; i++){
        if (i - maxHit - 1 >= 0){
            runningSum -= expectation[i - maxHit - 1];
        }
        runningSum += expectation[i - 1];
        expectation.push(1 / accuracy + runningSum / maxHit);
      }
      return(expectation[expectation.length - 1])
    }

    function expected_ttk(){
      const attackSpeed = combatType === "magic" ? equipment.spell.attack_speed : equipment.weapon.attack_speed
      return (attackSpeed * 0.6) * expected_hits(enemy.hitpoints, maxHitCalc(), hitChance())
    }

    function overkill_dps(){
      return enemy.hitpoints / expected_ttk()
    }

    return(
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Set 1</th>
              <th> </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Maximum hit: </td>
              <td> {rangeMaxHit()} </td>
            </tr>
              <td> Mage max hit : {mageMaxHit()}</td>
            <tr>
              <td> Max Attack Roll: </td>
              <td> {rangeAtkRoll() + combatType + eMaxDefRoll()}</td>
            </tr>
            <tr>
              <td> Accuracy: </td>
              <td>{hitChance(combatType)}</td>
            </tr>
            <tr>
              <td> DPS: </td>
              <td>{calcDps()} </td>
            </tr>
            <tr>
              <td> Time to kill: </td>
              <td>{expected_ttk()} </td>
            </tr>
            <tr>
              <td> Overkill DPS: </td>
              <td>{overkill_dps()} </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


function mapStateToProps({ calcs, equipment, stats, enemy  }) {
  return {
    calcs,
    equipment,
    stats,
    enemy,
  }
}

export default connect(mapStateToProps)(Calcs);
