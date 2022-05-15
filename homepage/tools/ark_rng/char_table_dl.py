import urllib.request as request
import json

CHAR_TABLE_URL = "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/json/gamedata/zh_CN/gamedata/excel/character_table.json"

ATTR_KEEP = [
    "name", "nationId", "groupId", "teamId", "tagList","rarity",
    "appellation", "position", "profession", "subProfessionId"]

SAVE_PATH = "src/ark_rng/data/char_table.json"

def filter(entity):
  return {k: entity[k] for k in ATTR_KEEP}

with request.urlopen(CHAR_TABLE_URL) as f:
    resp = f.read().decode('utf-8')
    with open(SAVE_PATH, 'w') as f:
        json_resp = json.loads(resp)
        filtered_json = {}
        for k in json_resp:
            entry = json_resp[k]
            is_char = entry["subProfessionId"] not in ["notchar1", "notchar2"]
            playable_char = entry["isNotObtainable"] == False
            if is_char and playable_char:
                filtered_json[k] =  filter(json_resp[k])
        json.dump(filtered_json, f)