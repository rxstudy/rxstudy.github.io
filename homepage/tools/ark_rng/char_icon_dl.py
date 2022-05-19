import json
import concurrent.futures

import requests

CHAR_DATA_PATH = "src/ark_rng/data/char_table.json"
AVATAR_SAVE_PATH = "src/ark_rng/assets/avatars"
DL_WORKER_COUNT = 5

def get_avatar_url(cid):
    return f"https://aceship.github.io/AN-EN-Tags/img/avatars/{cid}.png"

def get_avatar_save_path(cid):
    return f"public/ark_rng/assets/avatars/{cid}.png"

def dl_image(cid):
    req_url = get_avatar_url(cid)
    resp = requests.get(req_url)
    assert resp.status_code == 200, f"req failed for {req_url}"
    with open(get_avatar_save_path(cid), "wb") as handle:
        handle.write(resp.content)
        print(f"[OK] Fetched {req_url}")
    return req_url

with open(CHAR_DATA_PATH, 'r', encoding="utf-8") as f:
    char_data = json.load(f)
    cids = [cid for cid in char_data]
    # use a with statement to ensure threads are cleaned up
    with concurrent.futures.ThreadPoolExecutor(max_workers=DL_WORKER_COUNT) as executor:
        # Start the load operations and mark each future with its URL
        future_to_url = {executor.submit(dl_image, cid): cid for cid in cids}
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                cid = future_to_url[future]
            except Exception as e:
                pass
            try:
                data = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (cid, exc))