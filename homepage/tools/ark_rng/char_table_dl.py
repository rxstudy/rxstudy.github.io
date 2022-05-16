import urllib.request as request
import json

CHAR_TABLE_URL = "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/json/gamedata/zh_CN/gamedata/excel/character_table.json"
CHAR_PARSED_ATTR = "https://raw.githubusercontent.com/Aceship/AN-EN-Tags/HEAD/json/tl-akhr.json"

ATTR_KEEP = [
    "name", "nationId", "groupId", "teamId", "tagList","rarity",
    "appellation", "position", "profession", "subProfessionId"]

SAVE_PATH = "src/ark_rng/data/char_table.json"

def filter(entity):
  return {k: entity[k] for k in ATTR_KEEP}

filtered_json = {}
with request.urlopen(CHAR_TABLE_URL) as req:
    resp = req.read().decode('utf-8')
    json_resp = json.loads(resp)
    for k in json_resp:
        entry = json_resp[k]
        is_char = entry["subProfessionId"] not in ["notchar1", "notchar2"]
        playable_char = entry["isNotObtainable"] == False
        if is_char and playable_char:
            filtered_json[k] =  filter(json_resp[k])



with request.urlopen(CHAR_PARSED_ATTR) as f:
    resp = f.read().decode('utf-8')
    json_complement = json.loads(resp)
    for item in json_complement:
        id = item['id']
        if id in filtered_json:
            filtered_json[id]["name_jp"] = item["name_jp"]
            filtered_json[id]["name_kr"] = item["name_kr"]
            filtered_json[id]["name_en"] = item["name_en"]
            filtered_json[id]["sex"] = item["sex"]

with open(SAVE_PATH, 'w', encoding="utf-8") as f:
    json.dump(filtered_json, f, ensure_ascii=False, indent=2, sort_keys=True)