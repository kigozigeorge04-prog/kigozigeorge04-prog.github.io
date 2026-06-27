#!/usr/bin/env python3
"""
Run this from your EaseMed project folder:
  python3 integrate_detective.py

It reads easemed_pediatrics.html and produces easemed_pediatrics.html (updated in place).
Back up first!
"""
import os, shutil

SRC = "easemed_pediatrics.html"
BACKUP = "easemed_pediatrics_backup.html"

if not os.path.exists(SRC):
    print(f"ERROR: {SRC} not found. Run this from your EaseMed folder."); exit(1)

shutil.copy(SRC, BACKUP)
print(f"Backup saved: {BACKUP}")

with open(SRC, "r", encoding="utf-8") as f:
    html = f.read()

with open("detective_css.txt",  "r") as f: det_css  = f.read()
with open("detective_html.txt", "r") as f: det_html = f.read()
with open("detective_js.txt",   "r") as f: det_js   = f.read()

# ── 1. CSS: inject before the closing </style> tag ──────────────────
STYLE_CLOSE = "    </style>"
assert html.count(STYLE_CLOSE) == 1, "Expected exactly one </style>"
html = html.replace(STYLE_CLOSE, det_css + "\n" + STYLE_CLOSE)
print("✅ CSS injected")

# ── 2. HTML: inject detective panel after hint-other, before onset divider ──
# Find the divider that separates hint panels from onset/course radios
TARGET = '            <div class="divider"></div>\n\n            <div class="inline-row">\n                <div class="field-group">\n                    <label>Mode of Onset</label>'
assert TARGET in html, "Cannot find HTML insertion point (Mode of Onset divider)"
html = html.replace(TARGET, det_html + "\n\n" + TARGET, 1)
print("✅ Detective panel HTML injected")

# ── 3. JS: inject detective module before closing </script> ──────────
SCRIPT_CLOSE = "    </script>\n</body>"
assert html.count(SCRIPT_CLOSE) == 1, "Expected exactly one </script> before </body>"
html = html.replace(SCRIPT_CLOSE, det_js + "\n" + SCRIPT_CLOSE)
print("✅ Detective JS injected")

with open(SRC, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\n🎉 Done! {SRC} updated. ({len(html):,} bytes)")
print("Open in browser and test the 🕵️ Detective Mode button in Section 2.")
