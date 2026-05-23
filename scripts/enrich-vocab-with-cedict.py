import json
import re
from pathlib import Path

ROOT = Path(r"E:\chinese learning program")
LEARNING = ROOT / "generated" / "learning.json"
CEDICT = ROOT / "generated" / "cedict_ts.u8"


def load_cedict():
    dictionary = {}
    pattern = re.compile(r"^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+/(.+)/$")
    for line in CEDICT.read_text(encoding="utf-8", errors="ignore").splitlines():
        if not line or line.startswith("#"):
            continue
        match = pattern.match(line)
        if not match:
            continue
        traditional, simplified, pinyin, defs = match.groups()
        meanings = [part for part in defs.split("/") if part]
        if not meanings:
            continue
        entry = {
            "pinyin": pinyin,
            "english": "; ".join(meanings[:4]),
        }
        dictionary.setdefault(simplified, entry)
        dictionary.setdefault(traditional, entry)
    return dictionary


def make_usage(word, english):
    return f"Usage: use “{word}” in short textbook-style sentences. Meaning: {english.split(';')[0]}."


data = json.loads(LEARNING.read_text(encoding="utf-8"))
user = next(iter(data.values()))
cedict = load_cedict()

updated = 0
missing = []
for word in user.get("words", []):
    hanzi = word.get("hanzi", "").strip()
    if not hanzi:
        continue
    is_placeholder = word.get("english") == "Boya Chinese Elementary II vocabulary index"
    if not is_placeholder and word.get("example"):
        continue
    entry = cedict.get(hanzi)
    if not entry:
        if is_placeholder:
            word["english"] = "Needs English note review"
            word["example"] = f"Usage: review this word from Boya Chinese Elementary II index."
            missing.append(hanzi)
        continue
    word["english"] = entry["english"]
    word["example"] = make_usage(hanzi, entry["english"])
    updated += 1

LEARNING.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Updated {updated} words with English notes and usage.")
print(f"Missing {len(missing)} dictionary matches.")
if missing:
    print("Missing sample:", "、".join(missing[:80]))
