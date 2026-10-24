"""Regenerate bilingual win-rate charts from the game repository's saved reports.

python _tools/3card-blog-win-rates.py --data-dir ../3card-royale/docs/experiments/nn-policy-v1
Requires matplotlib 3.11.2. Pass --cjk-font for a CJK font on other systems.
SVGs embed glyph outlines; readers do not need the build machine's fonts.
"""
import argparse
import json
import os
from pathlib import Path

os.environ.setdefault("MPLCONFIGDIR", "/tmp/3card-blog-matplotlib")
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--data-dir", type=Path, required=True)
parser.add_argument("--cjk-font", type=Path,
                    default=Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"))
args = parser.parse_args()
if not args.cjk_font.exists():
    parser.error("Supply --cjk-font with a Chinese-capable font file")
rows = {r["model"]: r for r in json.loads((args.data_dir / "evaluation.json").read_text())}
baseline = json.loads((args.data_dir / "random-baseline.json").read_text())
ids = ["64", "128", "256", "256x512", "512"]
data = [baseline] + [rows[f"mlp-{i}.onnx"] for i in ids]
assert all(r["games"] == r["completed"] == 1000 for r in data)
rates = [r["win_rate"] * 100 for r in data]
out = Path(__file__).resolve().parents[1] / "img/blog/3card-royale"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 13, "svg.hashsalt": "3card-random-baseline-v1",
    "figure.facecolor": "#F7FBF8", "axes.facecolor": "#F7FBF8",
    "text.color": "#10231B", "axes.labelcolor": "#4F665A",
    "xtick.color": "#4F665A", "ytick.color": "#4F665A", "axes.edgecolor": "#C3D4C9",
})
for lang in ("zh", "en"):
    zh = lang == "zh"
    font = FontProperties(fname=str(args.cjk_font), size=13) if zh else FontProperties(size=13)
    labels = ["随机策略" if zh else "Random",
              "64 → 32", "128 → 64", "256 → 128 · 上线" if zh else "256 → 128 · live",
              "256 → 512", "512 → 256"]
    fig, ax = plt.subplots(figsize=(9.4, 5.3))
    bars = ax.barh(labels, rates, height=.55,
                   color=["#A17C35", "#91A89B", "#91A89B", "#C5416B", "#91A89B", "#91A89B"])
    ax.invert_yaxis()
    for label in ax.get_yticklabels():
        label.set_fontproperties(font)
    for bar, rate in zip(bars, rates):
        ax.text(58, bar.get_y()+bar.get_height()/2, f"{rate:.1f}%", va="center", weight="bold")
    ax.axvline(50, linestyle="--", color="#A17C35", alpha=.65)
    ax.set_xlim(0, 100)
    ax.set_xticks([0, 25, 50, 75, 100], ["0%", "25%", "50%", "75%", "100%"])
    ax.set_xlabel("对 Code AI 胜率" if zh else "Win rate vs Code AI", fontproperties=font, labelpad=10)
    ax.set_axisbelow(True)
    ax.grid(axis="x", alpha=.16)
    ax.spines[["right", "top", "left"]].set_visible(False)
    ax.tick_params(axis="y", length=0, pad=12)
    ax.set_title("同一对手，每种策略 1,000 局。" if zh else "Same opponent. 1,000 games per policy.",
                 loc="left", pad=22, fontproperties=font, fontsize=16)
    fig.tight_layout()
    filename = "win-rates.svg" if zh else "win-rates-en.svg"
    fig.savefig(out / filename, metadata={"Date": None, "Description": "Uniform random and five MLPs versus Code AI; 500 paired seeds, both seats, level-2 starts."})
    svg = out / filename
    svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
    plt.close(fig)
    print(filename)
