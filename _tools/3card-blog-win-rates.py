"""Render bilingual charts from the complete, matched baseline evaluation.

python _tools/3card-blog-win-rates.py --data-dir /path/to/3card-royale/docs/experiments/complete-baseline
Requires matplotlib; --cjk-font selects a Chinese-capable font. SVGs embed glyphs.
"""
import argparse
import json
import os
from pathlib import Path

os.environ.setdefault('MPLCONFIGDIR', '/tmp/3card-blog-matplotlib')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--data-dir', type=Path, required=True)
parser.add_argument('--cjk-font', type=Path, default=Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'))
args = parser.parse_args()
if not args.cjk_font.exists():
    parser.error('Supply --cjk-font with a Chinese-capable font file')
report = json.loads((args.data_dir / 'summary.json').read_text())
assert report['totalGames'] == report['completed'] == 19000
assert report['invalidActions'] == report['truncated'] == 0
ids = ['random-v1', 'easy-v2', 'nn-64', 'nn-128', 'nn-256-v1', 'nn-256x512', 'nn-512-v1', 'nn-structured-v2']
opponents = ['code-table-v1', 'sdk-code-v1']
rates = {}
for opponent in opponents:
    rates[opponent] = []
    for policy in ids:
        match = next(m for m in report['matches'] if m['subject'] == policy and m['opponent'] == opponent)
        result = next(r for r in match['results'] if r['id'] == policy)
        assert result['games'] == 1000
        rates[opponent].append(result['winRate'] * 100)
out = Path(__file__).resolve().parents[1] / 'img/blog/3card-royale'
plt.rcParams.update({
    'font.family': 'DejaVu Sans', 'font.size': 12, 'svg.hashsalt': '3card-matched-baselines',
    'figure.facecolor': '#F7FBF8', 'axes.facecolor': '#F7FBF8',
    'text.color': '#10231B', 'axes.labelcolor': '#4F665A',
    'xtick.color': '#4F665A', 'ytick.color': '#4F665A', 'axes.edgecolor': '#C3D4C9',
})
for lang in ('zh', 'en'):
    zh = lang == 'zh'
    font = FontProperties(fname=str(args.cjk_font), size=12) if zh else FontProperties(size=12)
    labels = ['随机策略' if zh else 'Random', 'Easy · 64'] + [
        ('整手评分 · ' if zh else 'Scoring · ') + shape
        for shape in ['64 → 32', '128 → 64', '256 → 128', '256 → 512', '512 → 256']
    ] + [('自回归' if zh else 'Autoregressive') + ' · 256 → 128']
    fig, ax = plt.subplots(figsize=(12, 8))
    for j, (opponent, color, legend) in enumerate(zip(opponents, ['#16765F', '#C5416B'], ['vs Code AI', 'vs SDK Code AI'])):
        ypos = [i + (j - .5) * .32 for i in range(len(ids))]
        bars = ax.barh(ypos, rates[opponent], height=.27, color=color, label=legend)
        for bar, rate in zip(bars, rates[opponent]):
            ax.text(rate + 1.2, bar.get_y() + bar.get_height()/2, f'{rate:.1f}%', va='center', fontsize=11)
    ax.set_yticks(range(len(labels)), labels)
    ax.invert_yaxis()
    for label in ax.get_yticklabels():
        label.set_fontproperties(font)
    ax.axvline(50, linestyle='--', color='#A17C35', alpha=.65)
    ax.set_xlim(0, 100)
    ax.set_xticks([0, 25, 50, 75, 100], ['0%', '25%', '50%', '75%', '100%'])
    ax.set_xlabel('胜率 · 每组 1,000 小局' if zh else 'Win rate · 1,000 games per matchup', fontproperties=font, labelpad=12)
    ax.set_axisbelow(True)
    ax.grid(axis='x', alpha=.16)
    ax.spines[['right', 'top', 'left']].set_visible(False)
    ax.tick_params(axis='y', length=0, pad=12)
    ax.set_title('同一批发牌，两种对手。' if zh else 'Same deals. Two opponents.', loc='left', pad=50, fontproperties=font, fontsize=18)
    ax.legend(loc='lower left', bbox_to_anchor=(0, 1.01), frameon=False, ncol=2)
    fig.subplots_adjust(left=.29, right=.97, top=.82, bottom=.12)
    filename = 'win-rates.svg' if zh else 'win-rates-en.svg'
    fig.savefig(out / filename, metadata={'Date': None, 'Description': 'Eight public-information policies; 1,000 games per opponent, 500 paired seeds, level-2 starts. Source: complete-baseline/summary.json.'})
    svg = out / filename
    svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines()) + '\n')
    plt.close(fig)
    print(filename)
