import json


def item_delete():
    outputfile = 'items-complete.json'
    with open('items-complete.json') as f:
        data = json.load(f)

    for item in list(data):
        if data[item]["equipment"] is None:
            print("Deleting item", data[item])
            data.pop(item, None)
            print("Item deleted")

    with open(outputfile, "w") as w:
        json.dump(data, w, indent=4)


item_delete()