import json
import monster_names as m

def monster_list_maker():
    inputfile = 'monsters-complete.json'
    outputfile = '../data/monster-list.json'

    with open(inputfile) as f:
        data = json.load(f)

    output = {}
    name_temp = []
    for x in data:
        result = {}
        new_name = data[x]['name'] + ' (' + str(data[x]['combat_level']) + ')'
        if new_name not in name_temp:
            result["id"] = data[x]["id"]
            result["name"] = new_name
            result["size"] = data[x]["size"]
            result["hitpoints"] = data[x]["hitpoints"]
            result["max_hit"] = data[x]["max_hit"]
            result["immune_poison"] = data[x]["immune_poison"]
            result["immune_venom"] = data[x]["immune_venom"]
            result["attributes"] = data[x]["attributes"]
            result["category"] = data[x]["category"]
            result["slayer_monster"] = data[x]["slayer_monster"]
            result["wiki_name"] = data[x]["wiki_name"]
            result["wiki_url"] = data[x]["wiki_url"]
            result["defence_level"] = data[x]["defence_level"]
            result["magic_level"] = data[x]["magic_level"]
            result["stats"] = {
                "defence_stab": data[x]["defence_stab"],
                "defence_slash": data[x]["defence_slash"],
                "defence_crush": data[x]["defence_crush"],
                "defence_magic": data[x]["defence_magic"],
                "defence_ranged": data[x]["defence_ranged"],
                "attack_magic": data[x]["attack_magic"]
            }
            name_temp.append(new_name)
            output[data[x]["id"]] = result

    with open(outputfile, "w") as w:
        json.dump(output, w, indent=4)

monster_list_maker()