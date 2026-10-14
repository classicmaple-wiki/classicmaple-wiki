# 0011: Brand logo and skill icons

Status: built 2026-10-15. From the owner: "should we use that our main logo on the web too? And we're still missing the skills images for each class."

## What changed

- **Logo:** the owner's painted icon (`src/assets/brand/icon.webp`) is the site logo in the header, and stands next to the wordmark on the home page. It is already the favicon (pull request 16).
- **Skill icons:** each class skill can have an `icon`, a 32 pixel game icon from maplestory.io, fetched by `scripts/fetch-skill-icons.ts` from the skill books. It reads the first and second job books, then the third and fourth, because Classic World moved some skills earlier, such as Rush and Holy Symbol. Two renamed skills are matched by their old names: Max HP Increase and Max MP Increase, which the old books call Improved MaxHP Increase and Improved MaxMP Increase. 74 of 76 skills have an icon. Four are new in Classic World: Amazon's Judgement, Precise Strikes, Critical Recovery, and Nimble Recovery. They keep a placeholder rather than borrow another skill's icon, until a player sends a screenshot.
- **Branches:** each skill has `branches`, the job paths it belongs to, taken from Nexon's official class pages, not from the old skill books, since Classic World moved some skills. Power Knockback is an Archer skill, for example, and Rush belongs to Fighter, Page, and Spearman.
- **Class pages:** Skills by job is now a grid of icons grouped by branch. The skills table shows each icon next to its name.
- **Image rules:** skill icons are added to the images policy. The validator checks them like sprites.

## Checks

- `npm run validate` and `npm run build` pass.
