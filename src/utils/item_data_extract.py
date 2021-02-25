import json
import item_names as names


def create_none(slot):
    none = {"id": 0,
            "name": "None",
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
                "slot": slot,
                "requirements": None
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
                result["stats"] = data[item]["equipment"]
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