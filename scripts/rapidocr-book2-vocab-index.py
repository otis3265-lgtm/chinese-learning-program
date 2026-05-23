import json
import re
from pathlib import Path

from rapidocr_onnxruntime import RapidOCR

ROOT = Path(r"E:\chinese learning program")
IMAGE_DIR = ROOT / "generated" / "book2-vocab-index"
OUT = IMAGE_DIR / "rapidocr-entries.json"

SKIP_WORDS = {"词语索引", "IndexofWords", "Index", "Words", "课本"}
HAN_RE = re.compile(r"[\u4e00-\u9fff]")
LATIN_RE = re.compile(r"[A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ]")


def center(box):
    return sum(p[0] for p in box) / 4, sum(p[1] for p in box) / 4


def clean_word(text):
    text = re.sub(r"^[\d\s.、，:：|]+", "", str(text or ""))
    text = text.replace("|", "").replace("●", "").replace("•", "")
    text = re.sub(r"[^\u4e00-\u9fffA-Za-z0-9，。！？、·…（）()]+", "", text)
    return text.strip()


def clean_pinyin(text):
    text = str(text or "").replace("|", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def cluster_rows(items, threshold=22):
    rows = []
    for item in sorted(items, key=lambda i: i["y"]):
        if not rows or abs(rows[-1]["y"] - item["y"]) > threshold:
            rows.append({"y": item["y"], "items": [item]})
        else:
            rows[-1]["items"].append(item)
            rows[-1]["y"] = sum(i["y"] for i in rows[-1]["items"]) / len(rows[-1]["items"])
    return rows


def parse_segment(items, printed_page):
    items = sorted(items, key=lambda i: i["x"])
    if not items:
        return None

    word_item = None
    for item in items:
        word = clean_word(item["text"])
        if HAN_RE.search(word) and word not in SKIP_WORDS and "索引" not in word:
            word_item = item
            break
    if not word_item:
        return None

    hanzi = clean_word(word_item["text"])
    pinyin = ""
    for item in items:
        if item["x"] <= word_item["x"]:
            continue
        text = clean_pinyin(item["text"])
        if LATIN_RE.search(text) and not HAN_RE.search(text):
            pinyin = text
            break

    if not hanzi or len(hanzi) > 20:
        return None
    return {
        "hanzi": hanzi,
        "pinyin": pinyin,
        "printedPage": printed_page,
    }


def extract_page(ocr, image_path):
    result, _ = ocr(str(image_path))
    items = []
    for box, text, score in result or []:
        x, y = center(box)
        items.append({"text": text, "score": float(score), "x": x, "y": y})

    rows = cluster_rows(items)
    entries = []
    # Physical PDF page 178 corresponds to printed textbook page 229.
    physical_page = int(re.search(r"pdf-(\d+)", image_path.stem).group(1))
    printed_page = physical_page + 51

    for row in rows:
        # Ignore title/header/footer areas.
        if row["y"] < 520 or row["y"] > 2350:
            continue
        left = [item for item in row["items"] if item["x"] < 930]
        right = [item for item in row["items"] if item["x"] >= 930]
        for segment in (left, right):
            entry = parse_segment(segment, printed_page)
            if entry:
                entries.append(entry)
    return entries


def main():
    ocr = RapidOCR()
    all_entries = []
    for image_path in sorted(IMAGE_DIR.glob("book2-pdf-*.png")):
        physical = int(re.search(r"pdf-(\d+)", image_path.stem).group(1))
        if 178 <= physical <= 190:
            all_entries.extend(extract_page(ocr, image_path))

    deduped = []
    seen = set()
    for entry in all_entries:
        key = entry["hanzi"]
        if key in seen:
            continue
        seen.add(key)
        deduped.append(entry)

    OUT.write_text(json.dumps(deduped, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted {len(deduped)} entries to {OUT}")


if __name__ == "__main__":
    main()
