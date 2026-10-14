# 0010: Corrections without GitHub, and a short footer

Status: built 2026-10-15. Waiting on one owner step: create the Tally form and paste its link into `site.config.mjs`.

## Problem

Contributing needed GitHub, which most players do not use. The footer was five lines of fine print on every page.

## Decision

The owner picked a Tally form for launch: free, no login for players, and screenshot uploads. After launch it can be replaced by our own form that feeds the Gemini screenshot pipeline (backlog P4d).

## What changed

- **Correction link:** every page ends with "Spotted something missing or wrong? Send a correction. No account needed." The link opens the Tally form with the page's address filled in. Until the form exists, it opens How to contribute.
- **Footer:** three items in one row: Play MapleStory Classic World, Legal and credits, and Built with love and care by Sirux.
- **Legal page:** `/legal/` holds the fine print: the fan site and trademark notice, who owns the pictures, the AI art note, the license, the credits, the submission license, no warranty, privacy, and removal requests. It adds no terms beyond the licenses, as CC BY-NC-SA requires. The sidebar shows Legal and credits in place of Credits and Privacy, which stay as pages.
- **How to contribute:** it now leads with the form. GitHub comes second, for people who use it.
- **Privacy:** the privacy page names Tally and what the form keeps.
- **Wording:** missing values read plainly ("Region unknown."), and guides point to the correction form.

## The Tally form, for the owner to create

Make a free account at tally.so, create a form named "Classic Maple Wiki correction", and add these blocks in order:

1. **Hidden field** named `page`. The site fills it with the page address.
2. **Long answer**, required: "What is wrong or missing?"
3. **Long answer**: "What should it say?"
4. **File upload**, optional, images, several allowed: "Screenshot from the game".
5. **Multiple choice**: "Which version of the game?" with Founder's Access, Grand Launch, and Not sure.
6. **Short answer**, optional: "Name for credit".
7. **Email**, optional: "Email, only if we may ask you about it".
8. **Checkbox**, required: "Any screenshots are my own, and my correction may be published on Classic Maple Wiki under CC BY-NC-SA 4.0."

In the form's settings, turn on email notifications to yourself, connect Google Sheets if you want a running list, and turn on spam protection if offered. Publish it, copy the share link, such as `https://tally.so/r/abc123`, and paste it as `correctionFormUrl` in `site.config.mjs`. That is the only change needed.

## Checks

- `npm run validate` and `npm run build` pass: 1,309 pages, no broken internal links.
