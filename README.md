# Zella Studios: homepage

A ready-to-run homepage for Zella Studios. It's a static site, so there's nothing to install.

## Open it
- **Quickest:** double-click `index.html` to open it in your browser.
- **Local server** (recommended), run from this folder:
  - `npx serve .`
  - or `python3 -m http.server 8000`, then visit http://localhost:8000

## Using it in Antigravity
1. Open this folder as a workspace in Antigravity. If you already have the earlier version open, replace its files with these.
2. The agent brief is in **`AGENTS.md`**. It covers the positioning, brand colours, sections and the to-do list.
3. Paste the prompt from `START-HERE-PROMPT.md` into the agent to kick things off.

## Files
| File | What it is |
|---|---|
| `index.html` | Page content and structure |
| `styles.css` | All styling. Colours are variables at the top (Midnight Premium palette) |
| `main.js` | The interactive parts and their content: hats picker, "What we do" tabs, lead simulator, calculator, comparison table, FAQ, form |
| `assets/` | Logo (dark and white versions) and Jen's photo |
| `AGENTS.md` | Brief for the AI coding agent |

## Before going live
- Connect the form to your CRM or booking tool. At the moment it only shows a thank-you message.
- Replace everything in `[square brackets]`.
- Add analytics, a cookie banner, and privacy and terms pages.
