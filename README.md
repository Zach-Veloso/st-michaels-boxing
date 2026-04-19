# St. Michael's Boxing

A self-contained browser prototype for a one-to-three-player school-themed boxing game.

## Play now

[Play St. Michael's Boxing](https://zach-veloso.github.io/st-michaels-boxing/)

## Run it

Open [index.html](/Users/Zach/Documents/New project/St Michael's Project/index.html) in a browser.

If your browser blocks local file access for some features, run a tiny local server instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Current prototype features

- Intro splash with the public St Michael's Prep School logo and school photo backgrounds
- A player-count screen with `1 player`, `2 players`, or `3 players`
- Character select that adapts for solo AI, local versus, or a three-way fight
- A round-by-round venue picker so each round can happen in a different place
- Three named St Michael's staff fighters with different stats and special abilities
- A solo AI opponent mode tuned to be more forgiving, two-player local controls, a three-player mode, health bars, blocking, stun, and one-to-five one-minute rounds with round scoring
- Six school-photo venue backdrops, including the sports pitch, indoor sports hall, pre-prep exterior, and the official grounds shots
- Animated splash/menu presentation with looping music tracks in `assets/audio`

## Controls

- Player 1: Move `A/D`, Jump `W`, Jab `F`, Hook `G`, Block `S`, Special `H`
- Player 2: Move `J/L` or arrow keys, Jump `I` or `Arrow Up`, Jab `N`, Hook `M`, Block `K` or `Arrow Down`, Special `U`
- Player 3: Move `C/B` or `4/6`, Jump `V` or `8`, Jab `Z` or `1`, Hook `R` or `2`, Block `X` or `5`, Special `T` or `3`

## Swapping in teacher photos later

- The current roster names and public role titles are already wired into the `CHARACTERS` array in [game.js](/Users/Zach/Documents/New project/St Michael's Project/game.js).
- Drop approved JPG photos into [assets/teachers/README.md](/Users/Zach/Documents/New%20project/St%20Michael's%20Project/assets/teachers/README.md) using the filenames `thomas.jpg`, `brightman.jpg`, and `pears.jpg`.
- Once those files are in place, the roster, character select, and in-match fighter heads will use the real teacher photos automatically.

## Asset note

The current badge and school-ground photos were pulled from St Michael's public website for this prototype. If you want to distribute the game more widely, it's worth getting the school's permission for the final asset set.
