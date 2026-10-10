# Our Forever

Static site: no build step, no keys. Open `index.html` or host it on GitHub Pages.

## Edit
Everything lives in the `CONFIG` object at the top of `script.js`: names, dates, captions, timeline, letter, cards, quiz (set `correct` to the index of the right option), secret messages, music, colors.
- Start date: `relationshipStartDate: "YYYY-MM-DD"` (uses the viewer's local time).
- Photos: replace `images/photo1.jpg … photo6.jpg` (JPG, ~1600px wide, under 500 KB). Placeholders show until then.
- Music: put your own licensed file at `music/our-song.mp3`. Add more in `CONFIG.tracks`. Music never autoplays.
- "Make it yours" (uploads, extra memories, a new letter) is temporary. Refresh clears it; edit `CONFIG` or the images folder to keep changes.

## GitHub Pages
1. Create a repo, upload everything in this folder (keep `images/` and `music/`).
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save.
3. Your link appears at `https://<username>.github.io/<repo>/` in a minute or two.
Repo public means anyone with the link can see your photos; keep it private-ish by not sharing the link.
