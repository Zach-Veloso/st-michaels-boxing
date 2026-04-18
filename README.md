# St. Michael's Boxing

A self-contained browser prototype for a two-player school-themed boxing game.

## Run it

Open [index.html](/Users/Zach/Documents/New project/St Michael's Project/index.html) in a browser.

If your browser blocks local file access for some features, run a tiny local server instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Current prototype features

- Intro splash with the public St Michael's Prep School logo and school photo backgrounds
- Character select for two local players
- Four named St Michael's sports staff fighters with different stats and special abilities
- Two-player local controls, health bars, blocking, stun, KO, rematch flow, a 3-minute draw rule, and win tracking
- School-photo arena backdrop with a softer, less pixel-heavy visual style

## Controls

- Player 1: Move `A/D`, Jump `W`, Jab `F`, Hook `G`, Block `S`, Special `H`
- Player 2: Move `J/L` or arrow keys, Jump `I` or `Arrow Up`, Jab `N`, Hook `M`, Block `K` or `Arrow Down`, Special `U`

## Swapping in teacher photos later

- The current roster names and public role titles are already wired into the `CHARACTERS` array in [game.js](/Users/Zach/Documents/New project/St Michael's Project/game.js).
- If you get approved teacher photos, we can add proper portraits and character intro cards next, and tune the fighter art to match them more closely.

## Asset note

The current badge and school-ground photos were pulled from St Michael's public website for this prototype. If you want to distribute the game more widely, it's worth getting the school's permission for the final asset set.
