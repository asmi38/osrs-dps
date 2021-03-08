import HeadData from '../data/head'
import AmmoData from '../data/ammo'
import BodyData from '../data/body'
import CapeData from '../data/cape'
import FeetData from '../data/feet'
import HandsData from '../data/hands'
import LegsData from '../data/legs'
import NeckData from '../data/neck'
import RingData from '../data/ring'
import ShieldData from '../data/shield'
import WeaponData from '../data/weapon'
import SpellData from '../data/spells'

export const default_equipment = {
  "attack_style": WeaponData["4151"]["stances"][0],
  "spell": SpellData["none"],
  "head": HeadData["24271"],
  "ammo": AmmoData["0"],
  "body": BodyData["11832"],
  "cape": CapeData["6570"],
  "feet": FeetData["13239"],
  "hands": HandsData["7462"],
  "legs": LegsData["11834"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["12954"],
  "weapon": WeaponData["4151"],
}

export const dharok = {
  "attack_style": WeaponData["4718"]["stances"][0],
  "head": HeadData["4716"],
  "ammo": AmmoData["0"],
  "body": BodyData["4720"],
  "cape": CapeData["21295"],
  "feet": FeetData["13239"],
  "hands": HandsData["7462"],
  "legs": LegsData["4722"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["4718"],
}

export const max_melee_base = {
  "attack_style": WeaponData["0"]["stances"][0],
  "head": HeadData["0"],
  "ammo": AmmoData["0"],
  "body": BodyData["11832"],
  "cape": CapeData["21295"],
  "feet": FeetData["13239"],
  "hands": HandsData["22981"],
  "legs": LegsData["11834"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["0"],
}

export const max_melee_scythe = {
  "attack_style": WeaponData["22325"]["stances"][0],
  "head": HeadData["24271"],
  "ammo": AmmoData["0"],
  "body": BodyData["11832"],
  "cape": CapeData["21295"],
  "feet": FeetData["13239"],
  "hands": HandsData["22981"],
  "legs": LegsData["11834"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["22325"],
}

export const none = {
  "attack_style": WeaponData["0"]["stances"][0],
  "head": HeadData["0"],
  "ammo": AmmoData["0"],
  "body": BodyData["0"],
  "cape": CapeData["0"],
  "feet": FeetData["0"],
  "hands": HandsData["0"],
  "legs": LegsData["0"],
  "neck": NeckData["0"],
  "ring": RingData["0"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["0"],
}

export const void_set = {
  "attack_style": WeaponData["0"]["stances"][0],
  "head": HeadData["11665"],
  "ammo": AmmoData["0"],
  "body": BodyData["13072"],
  "cape": CapeData["0"],
  "feet": FeetData["0"],
  "hands": HandsData["8842"],
  "legs": LegsData["13073"],
  "neck": NeckData["0"],
  "ring": RingData["0"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["0"],
}

export const verac = {
  "attack_style": WeaponData["4755"]["stances"][0],
  "head": HeadData["4753"],
  "ammo": AmmoData["0"],
  "body": BodyData["4757"],
  "cape": CapeData["0"],
  "feet": FeetData["0"],
  "hands": HandsData["7462"],
  "legs": LegsData["4759"],
  "neck": NeckData["0"],
  "ring": RingData["0"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["4755"],
}

export const pros_slay_whip = {
  "attack_style": WeaponData["4151"]["stances"][0],
  "head": HeadData["11865"],
  "ammo": AmmoData["0"],
  "body": BodyData["9674"],
  "cape": CapeData["6570"],
  "feet": FeetData["13239"],
  "hands": HandsData["7462"],
  "legs": LegsData["9676"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["12954"],
  "weapon": WeaponData["4151"],
}

export const max_crush = {
  "attack_style": WeaponData["13576"]["stances"][0],
  "head": HeadData["24419"],
  "ammo": AmmoData["0"],
  "body": BodyData["9674"],
  "cape": CapeData["21295"],
  "feet": FeetData["13239"],
  "hands": HandsData["22981"],
  "legs": LegsData["24421"],
  "neck": NeckData["19553"],
  "ring": RingData["11773"],
  "shield": ShieldData["22322"],
  "weapon": WeaponData["13576"],
}

export const max_mage = {
  "attack_style": WeaponData["24422"]["stances"][4],
  "head": HeadData["21018"],
  "ammo": AmmoData["0"],
  "body": BodyData["21021"],
  "cape": CapeData["21295"],
  "feet": FeetData["13235"],
  "hands": HandsData["19544"],
  "legs": LegsData["21024"],
  "neck": NeckData["12002"],
  "ring": RingData["11770"],
  "shield": ShieldData["12825"],
  "weapon": WeaponData["24422"],
}

export const max_range = {
  "attack_style": WeaponData["20997"]["stances"][1],
  "head": HeadData["11826"],
  "ammo": AmmoData["11212"],
  "body": BodyData["11828"],
  "cape": CapeData["22109"],
  "feet": FeetData["13237"],
  "hands": HandsData["7462"],
  "legs": LegsData["11830"],
  "neck": NeckData["19547"],
  "ring": RingData["11771"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["20997"],
}

export const equipment_presets = {
  "default_equipment": default_equipment,
  "dharok": dharok,
  "max_melee_base": max_melee_base,
  "max_melee_scythe": max_melee_scythe,
  "none": none,
  "void_set": void_set,
  "verac": verac,
  "pros_slay_whip": pros_slay_whip,
  "max_crush": max_crush,
  "max_mage": max_mage,
  "max_range": max_range,
}
