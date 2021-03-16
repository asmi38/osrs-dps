import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { attack_style_name, strength_style_name, defTypeName, combatTypeCalc, potion_effect } from '../utils/calc'



class Calcs extends Component {
  render(){
    const { calcs, equipment, stats, enemy } = this.props
    const { slayer_task } = calcs
    const { spell } = equipment

    //determine combat_type ranged/magic/melee
    const combatType = combatTypeCalc(equipment.attack_style)

    //GEAR AND SET BONUSES
    //assuming 100% accuracy on bolt proc
    function boltDPS(maxHit){
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
        const boltDPS = hitChance() * procChance * (0.5 * maxHit + extraDmg)
        return {'dps': boltDPS, 'procChance': procChance}
      }
      else if((equipment.ammo.name === "Onyx bolts (e)" || equipment.ammo.name === "Onyx dragon bolts (e)") && !enemy.attributes.includes("undead")){
        const procChance = (calcs.kandarin_hard ? 0.11 : 0.121)
        const extraDmg = 1.2 * maxHit
        const boltDPS = hitChance() * procChance * 0.5 * extraDmg
        return {'dps': boltDPS, 'procChance': procChance}
      }
      return {'dps': 0, 'procChance': 0}
    }

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

    function mageCombatBonus(style){
      if(style === "accurate"){
        return 3
      }
      else if(style === "longrange"){
        return 1
      }
      else{
        return 0
      }
    }

    function staffMaxHit(){
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
      else if(equipment.weapon.name === "Salyer's staff (e)" && equipment.spell.name === "magic_dart"){
        return 13 + Math.floor(visibleMageLvl / 6)
      }
      else if(equipment.spell.name === "magic_dart"){
        return 10 + Math.floor(visibleMageLvl / 10)
      }
      else{
        return null
      }
    }

    function rangeGearBonus(){
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

    function meleeGearBonus(){
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

    function magicBonus(equipment, spell){
      var accMultiplier = 0
      var dmgMultiplier = 0
      if((equipment.weapon.name === "Smoke battlestaff" || equipment.weapon.name === "Mystic smoke staff") && spell.spellbook === "standard"){
        accMultiplier += 0.1
        dmgMultiplier += 0.1
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
      return {'accMultiplier': accMultiplier, 'dmgMultiplier': dmgMultiplier}
    }

    function dharokBonus(){
      if(equipment.head.name === "Dharok's helm" &&
         equipment.body.name === "Dharok's platebody" &&
         equipment.legs.name === "Dharok's platelegs" &&
         equipment.weapon.name === "Dharok's greataxe"){
           return 1 + (stats.hitpoints.level - calcs.remaining_hp) / 100 * (stats.hitpoints.level / 100)
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

        if(equipment.shield.name === "Tome of fire" && equipment.spell.element === "fire" && !(equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange")){
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
      else if(equipment.head.name === "Slayer helmet (i)" && slayer_task){
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
    //1.025 is the rigour bonus for str being 23%
    function rangeMaxHit(rangeGearBonus){
      const rigourBonus = Math.floor(stats.ranged.effective_level * (stats.ranged.prayer === "Rigour" ? 1.025 : 1))
      const effectiveRangeStr = Math.floor((rigourBonus + range_bonus(equipment.attack_style.combat_style, false) + 8) * void_bonus(combatType)[0])
      return Math.floor(Math.floor((effectiveRangeStr * (totalStrCalc(equipment) + 64) +  320) / 640) * gear_bonus("range")[0] * rangeGearBonus.dmgMultiplier)
    }

    function meleeMaxHit(meleeGearBonus){
      const effectiveMeleeStr = (stats.strength.effective_level + melee_bonus(equipment.attack_style.attack_style, false) + 8) * void_bonus("melee")[0]
      const effMeleeAndNumeric = Math.floor( ((effectiveMeleeStr * (totalStrCalc(equipment) + 64)) + 320) / 640 )
      const addGearBonus = Math.floor(effMeleeAndNumeric * gear_bonus("melee")[0])
      const maxHit = Math.floor(addGearBonus * dharokBonus() * meleeGearBonus.dmgMultiplier)
      return maxHit
    }

    function mageMaxHit(){
      var magicDamageBase = spell.damage
      if(spell.name.includes("bolt") && equipment.hands === "Chaos gauntlets"){
        magicDamageBase += 3
      }
      if(staffMaxHit() && (equipment.attack_style.combat_style === "accurate" || equipment.attack_style.combat_style === "longrange" || equipment.attack_style.combat_style === "blaze")){
        magicDamageBase = staffMaxHit()
      }
      magicDamageBase = Math.floor(magicDamageBase * (1 + totalStrCalc(equipment)/100 + magicBonus(equipment, spell).dmgMultiplier))
      return mageBonusDamage(magicDamageBase, equipment, enemy, calcs)
    }

    //
    //
    //
    //Attack Roll calculations
    //
    //
    //

    function rangeAtkRoll(rangeGearBonus){
      const effRangedAtk = Math.floor((stats.ranged.effective_level + range_bonus(equipment.attack_style.attack_style, true) + 8) * void_bonus("range")[0])
      return Math.floor(effRangedAtk * (totalAtkCalc(equipment) + 64) * gear_bonus("range")[0] * rangeGearBonus.accMultiplier)
    }

    function mageAtkRoll(){
      const baseAtkRoll = (stats.magic.effective_level + 8 + mageCombatBonus(equipment.attack_style.combat_style)) * (totalAtkCalc(equipment) + 64)
      return Math.floor(baseAtkRoll * (1 + magicBonus(equipment, spell).accMultiplier) * (void_bonus("magic")[1] + gear_bonus("magic")[1] - 1))
    }


    function meleeAtkRoll(meleeGearBonus){
      const effectiveAtkLvl = (stats.attack.effective_level + melee_bonus(equipment.attack_style.attack_style, true) + 8) * void_bonus("melee")[1]
      const maxAtkRoll = (effectiveAtkLvl * (totalAtkCalc(equipment) + 64)) * gear_bonus("melee")[1]
      return Math.floor(maxAtkRoll * meleeGearBonus.accMultiplier)
    }

    function eMaxDefRoll(){
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
        return calcHitChance(rangeAtkRoll(rangeGearBonus()), eMaxDefRoll())
      }
      else if(combatType === "magic"){
        return calcHitChance(mageAtkRoll(), eMaxDefRoll())
      }
      else{
        return calcHitChance(meleeAtkRoll(meleeGearBonus()), eMaxDefRoll())
      }
    }

    function maxHitCalc(){
      if(combatType === "ranged"){
        return rangeMaxHit(rangeGearBonus())
      }
      else if(combatType === "magic"){
        return mageMaxHit()
      }
      else{
        return meleeMaxHit(meleeGearBonus())
      }
    }

    function magicAtkSpeed(){
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

    function calcDps(){
      const maxHit = maxHitCalc()
      if(combatType === "magic"){
        return hitChance() * ((maxHit / 2) / (0.6 * magicAtkSpeed()))
      }
      else if(combatType === "ranged"){
        var attackSpeed = equipment.weapon.attack_speed
        if(equipment.attack_style.combat_style === "rapid" || equipment.attack_style.combat_style === "flare"){
          attackSpeed -= 1
        }

        if(equipment.ammo.name.includes("bolt")){
          const boltProc = boltDPS(maxHit)
          return (boltProc.dps + (1 - boltProc.procChance) * hitChance() * maxHit / 2) / (0.6 * attackSpeed)
        }
        else{
          return hitChance() * ((maxHit / 2) / (0.6 * attackSpeed))
        }
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
              <td> {maxHitCalc()} </td>
            </tr>
            <tr>
              <td> Max Attack Roll: </td>
              <td> {mageAtkRoll() + combatType + eMaxDefRoll()}</td>
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
