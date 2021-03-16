export async function fetchUser(username){
  if(username.includes(" ")){
    username.replace(" ", "#A0")
  }

  if(username.includes("#")){
    username.replace("#", "%23")
  }

  const response = await fetch("https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=" + username)
  const data = await response.text()
  const stats = csvToJson(data)

  return stats
}


//Convert CSV fetch result to JSON object
function csvToJson(csvData){
    var lines=csvData.split("\n")

    var result = {}

    const requiredIndex = [1, 2, 3, 4, 5, 6, 7, 15]
    const indexNames = {1: "attack", 2: "defence", 3: "strength", 4: "hitpoints", 5: "ranged", 6: "prayer", 7: "magic", 15:"mining"}

    //Add only rows data to result
    for (var i = 0; i < 16; i++){
      if(requiredIndex.includes(i)){
        var currentLine = lines[i].split(",")
        result[indexNames[i]] = parseInt(currentLine[1])
      }
    }

    return result
}
