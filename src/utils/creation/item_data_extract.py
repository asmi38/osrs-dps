import json
import item_names as names


def create_none(slot):
    none = {"id": 0,
            "name": "None",
            "short_name": "None",
            "icon": None,
            "wiki_url": None,
            "slot": slot,
            "requirements": None,
            "stats": {
                "attack_stab": 0,
                "attack_slash": 0,
                "attack_crush": 0,
                "attack_magic": 0,
                "attack_ranged": 0,
                "defence_stab": 0,
                "defence_slash": 0,
                "defence_crush": 0,
                "defence_magic": 0,
                "defence_ranged": 0,
                "melee_strength": 0,
                "ranged_strength": 0,
                "magic_damage": 0,
                "prayer": 0,
            }
            }

    if slot == 'weapon':
        attack_type_1 = {
            "combat_style": "kick",
            "attack_type": "crush",
            "attack_style": "aggressive",
            "experience": "strength",
            "boosts": None
        }
        attack_type_2 = {
            "combat_style": "punch",
            "attack_type": "crush",
            "attack_style": "accurate",
            "experience": "attack",
            "boosts": None
        }
        attack_type_3 = {
            "combat_style": "block",
            "attack_type": "crush",
            "attack_style": "defence",
            "experience": "attack",
            "boosts": None
        }
        none_attack_types = [attack_type_1, attack_type_2, attack_type_3]
        none["attack_speed"] = 6
        none["attack_types"] = none_attack_types

    return none


def item_list_creator(category, items_complete):
    outputfile = '../data/' + category + '.json'
    with open(items_complete) as f:
        data = json.load(f)

    output = {"0": create_none(category)}
    for item_name in names.item_names[category]:
        result = {}
        for item in data:
            if data[item]["name"] == item_name:
                result["id"] = data[item]["id"]
                result["name"] = data[item]["name"]
                result["short_name"] = data[item]["name"]
                result["icon"] = data[item]["icon"]
                result["wiki_url"] = data[item]["wiki_url"]
                result["slot"] = data[item]["equipment"]["slot"],
                result["requirements"] = data[item]["equipment"]["requirements"],
                result["stats"] = {
                    "attack_stab": data[item]["equipment"]["attack_stab"],
                    "attack_slash": data[item]["equipment"]["attack_slash"],
                    "attack_crush": data[item]["equipment"]["attack_crush"],
                    "attack_magic": data[item]["equipment"]["attack_magic"],
                    "attack_ranged": data[item]["equipment"]["attack_ranged"],
                    "defence_stab": data[item]["equipment"]["defence_stab"],
                    "defence_slash": data[item]["equipment"]["defence_slash"],
                    "defence_crush": data[item]["equipment"]["defence_crush"],
                    "defence_magic": data[item]["equipment"]["defence_magic"],
                    "defence_ranged": data[item]["equipment"]["defence_ranged"],
                    "melee_strength": data[item]["equipment"]["melee_strength"],
                    "ranged_strength": data[item]["equipment"]["ranged_strength"],
                    "magic_damage": data[item]["equipment"]["magic_damage"],
                    "prayer": data[item]["equipment"]["prayer"],
                }
                if data[item]["equipable_weapon"]:
                    result["attack_speed"] = data[item]["weapon"]["attack_speed"]
                    result["stances"] = data[item]["weapon"]["stances"]
                output[item] = result
                break
        else:
            print("Error - Category: " + category + " Item: " + item_name)

    with open(outputfile, "w") as w:
        json.dump(output, w, indent=4)


def complete_creator():
    for category in names.item_names["categories"]:
        item_list_creator(category, 'items-complete.json')

complete_creator()