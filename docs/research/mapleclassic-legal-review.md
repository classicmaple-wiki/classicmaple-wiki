# Legal review: importing from MapleClassic Wiki

Written 2026-10-13 for spec 0005, option 2. Research agents checked the license texts, the source site's own pages, US and EU law on facts and databases, and privacy law against the primary texts, and a second agent tried to refute each finding. This is research to help the owner decide. It is not legal advice.

## Verdict

Option 2 can probably be done at low legal risk, but not yet. Do not run the real import until MapleClassic Wiki's maintainers say in writing which license covers their Cargo data. Their footer says CC BY-NC-SA, their About page says CC BY-SA 4.0, and those two licenses cannot be mixed. Nobody can promise "no law issues" without a lawyer. The bare facts you plan to import are mostly unprotected in US law, so the bigger exposures are the license conflict, the near-identical site names, and Nexon's interest in data that came from a closed beta client.

## Must do

### Importer

1. **The importer refuses a live run until the license answer is on file.** A live run fails unless a config value points to a saved written reply from the MapleClassic Wiki maintainers. The About page says "coordinate with maintainers first" for bulk imports. Ask them:
   - which license covers the Cargo data;
   - which license covers drop reports sent through MapleWiki:Report_an_item_drop;
   - whether the credit format below is fine;
   - whether the Sirux footer credit and a hosting-only donation link are fine;
   - whether they accept a bulk read at one request per second, with the User-Agent you plan to use.
2. **Only api.php.** The importer calls only `https://mapleclassic.wiki/api.php`. Test: grep the importer for `index.php` and `/wiki/Special:` and get zero hits. robots.txt disallows both paths. Use the same rule for any research scripts. `action=raw` goes through `/index.php?`.
3. **Polite request rate.**
   - At most one request per second.
   - The User-Agent names classicmaple.wiki and gives a contact URL.
   - The importer stops on HTTP 403 or 429, and stops if the maintainers ask.
4. **License check on every run.** Each run reads siteinfo `rightsinfo` and aborts if the license URL differs from the one the maintainers confirmed. Today it is `https://creativecommons.org/licenses/by-nc-sa/4.0/`.
5. **Explicit field list.** Every `cargoquery` call names an explicit `fields=` allowlist and never uses a wildcard.
   - The request must never contain: `observed_by`, `description_en/ko/zh/ja`, `npcs.summary`, `npcs.role`, `npcs.image`, `shop_items.price`, `quests.exp_reward`, `meso_reward`, or any other stat, price or reward field.
   - Test: a unit test asserts that each request URL holds only allowlisted fields.
6. **Only player-observed drop rates.**
   - Query the real table name, `monster_drops`. A test query against `drops` returned an MWException error.
   - Import a drop row only if `sample_kills` is present.
   - Skip any "confirmed" or official rate. Its origin is unknown and may be the game client.
7. **Page-level notices.** The footer says "unless otherwise noted". The importer flags for manual review, or skips, any source page that carries its own license or credit notice.
8. **Provenance on every record.** Each record stores the source page URL, the revision id (oldid), the fetch date, and the license URL seen at fetch time.
9. **One-command removal.** One command removes all imported records, or all records from one source page. Use it to answer a removal request or a license change.
10. **Upstream deletions (recommended, not required by law).** On each rerun, drop local rows that no longer exist at the source.

### Data

11. **Build check.** `scripts/validate.ts` fails the build if any imported record is missing `source_url`, `rev_id`, `fetched_at` or `license_url`.
12. **Drop rates are estimates.**
   - Show each rate as a community estimate in the "~1/N" form, with the sample size and observation date.
   - Never label one "official".
   - The source wiki does the same: "Community estimates are written as "~1/N" and styled differently from confirmed rates, so a reader can always tell an estimate from an official figure."
13. **Nothing that points to a person.** Store observation dates as plain dates with no time of day. Store nothing that could tie a row to a player: no usernames, in-game names, guilds, servers or Discord handles.
14. **Your own structure.** Use your own schema, page layout and categories. Do not mirror the source's tables, category scheme or curated lists. US copyright in a compilation covers only its selection and arrangement.
15. **Disclose pooling.** If you ever pool several observations into one figure, say so in the change note. Pooling is a modification.

### Site pages

16. **Credit block on every page.** Every page that shows imported data renders a credit block generated from the stored fields, with one credit per source page. A monster page that draws on many item pages lists each one. Each credit holds:
   - the source page title, linked to the page;
   - "MapleClassic Wiki contributors", linked to that page's history;
   - "CC BY-NC-SA 4.0", linked to the license;
   - a specific change note, such as "Facts extracted and reformatted. Text, stats, prices, rewards, images and observer names left out.";
   - any change note the source page already carries.

   Section 3(a)(2) allows meeting the credit rules by "providing a URI or hyperlink to a resource that includes the required information".
17. **Credit the drop observers by link.** Drop sections also link to the per-page Cargo data view (`/index.php?title=<Page>&action=pagevalues`), which lists `observed_by`. First check by hand in a browser that this view works; it returned 403 to automated fetches. Do not rely on Special:CargoTables/monster_drops alone. It shows only the first page of 158 rows.
18. **One Credits and License page.** It:
   - links to MapleClassic Wiki's General disclaimer;
   - says imported data is provided as is, with no warranty;
   - says drop observations come from MapleClassic Wiki players and editors, whose names are kept there, without listing names;
   - gives a contact route (email or GitHub issue) for removal and attribution requests.

   Act on removal requests within days. Section 3(a)(3) requires removing credit information when the licensor asks.
19. **Two non-affiliation notices.**
   - Next to every source credit and on the About page: "Classic Maple Wiki is independent of MapleClassic Wiki and is not endorsed by it or its editors."
   - Site-wide: the site is not affiliated with Nexon, and MapleStory is a trademark of Nexon Korea.

   The names are the same two words swapped, so the first notice matters.
20. **Stay non-commercial.** No ads, paywall, paid features, affiliate links or sponsored placement. Any donation link is optional, says it covers hosting costs only, and unlocks nothing.
21. **Keep the Sirux credit small.** Use a plain line such as "Built by Sirux" in the footer. No sales pitch on pages with imported data. Do not use imported pages or data in Sirux marketing, pitches or paid client work.
22. **Free downloads.** Keep a free public download of the imported data, carrying the same license notice and credits.
23. **No reuse limits.** Add no terms of use, scraping ban, API key or DRM that limits copying or reuse of imported material. This follows Sections 2(a)(5)(C) and 3(b)(3).
24. **A short privacy page.** Say what Vercel logs and any analytics collect, and what the contact route collects.

### License files

25. **Decision record 0008, written after the maintainers answer.**
   - If they say BY-NC-SA, choose between relicensing the whole site to BY-NC-SA, or keeping your own writing under BY-SA and marking only imported data and the pages built from it as BY-NC-SA. A lawyer should help pick.
   - If they say BY-SA, keep CC BY-SA 4.0 and skip the NC switch.
26. **Fix every place that offers the data under CC BY-SA or MIT.** Do this once the license is settled:
   - `LICENSE-CONTENT.md` line 4, which names CC BY-SA 4.0;
   - `CONTRIBUTING.md` line 174: "Code is MIT. Data and guides are CC BY-SA 4.0. By contributing, you agree to release your work under these licenses.";
   - `src/content/docs/contributing.mdx` line 30: "All data is free to reuse under CC BY-SA 4.0.";
   - the site footer.

   Copies already released under BY-SA stay BY-SA. git log shows only the owner's identities, so relicensing the existing content is in the owner's hands.
27. **A notice inside the data.** Add a NOTICE or README to the `data/` folder and to each JSON download that states the imported data's license and credits, separate from the MIT `LICENSE` on the code.
28. **Update the sourcing policy.** `docs/data-research.md` line 21 says other wikis' "text and data are not ours to copy". Record the MapleClassic Wiki exception in the decision record and edit that line.
29. **Fix mistakes within 30 days.** Fix any credit or license mistake within 30 days of finding it. That restores the license under Section 6(b)(1). Past liability can survive: "you may still be liable for damages for copyright infringement for the period where you were not in compliance with the license."

## Must not do

- **No live run early.** Do not run the real import before the written license answer is on file.
- **No images or files.** No sprites, icons, music or other files. The source says these "are property of Nexon", and its file pages carry no license tag.
- **No text.** No descriptions, dialogue, summaries, prose or strategy text. That keeps out Nexon's writing and the editor content the About page puts under BY-SA.
- **No client values.** No stats, prices or rewards.
- **No observer names.** Do not import observer usernames. Do not rebuild them from Special:DropReports or from page history.
- **No crawling.** Do not crawl `/index.php?` or `/wiki/Special:` URLs.
- **No wildcard queries.** Never use a wildcard `fields=` list.
- **No datamining.** Do not datamine or decompile the MapleStory client, and do not run bots against Nexon services yourself. Nexon's terms forbid "use of a data mining utility program to intercept, collect, read or mine information generated by the Services".
- **No official labels.** Do not present any drop rate as official.
- **No Nexon branding.** No Nexon logos or styling that looks official.
- **No implied endorsement.** Do not imply endorsement by MapleClassic Wiki, its editors, or Nexon.
- **No commercial use.** No ads, paywalls, paid tiers or sponsorships on the site. No perks for donors.
- **No reuse limits.** No DRM, API keys or terms that limit reuse of imported material.
- **Two bad arguments.**
  - Do not reason that "the stricter license is safe". BY-SA and BY-NC-SA do not work together in either direction.
  - Do not treat a maintainer's permission as covering every editor. On a wiki, each editor licenses their own edits.

## Residual risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Source license conflict.** The footer says "Content is available under Creative Commons Attribution-NonCommercial-ShareAlike unless otherwise noted." The About page says "Original wiki content (page prose, strategy notes, calculators, tooling) is contributed by editors under the Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license." MapleWiki:Copyrights, the page the edit notice points to, does not exist (HTTP 404). If BY-SA governs, relabeling the data as BY-NC-SA breaks BY-SA, because "a person may not remix BY-SA content (such as Wikipedia content) with BY-NC content." | High until answered, low after | Use the gate in item 1. Import no prose. The About page's BY-SA list names prose, not Cargo data. The edit notice is MediaWiki's stock message with a `$2` placeholder; it probably fills in the site license, but nobody has seen the rendered edit form. If the answer is BY-SA, stay BY-SA. |
| **A maintainer's answer does not bind every editor.** Maintainers can license only their own edits and any database rights they hold. | Medium | Still get the answer, since it shows good faith. Import facts only, which may need no license at all. Ask a lawyer. |
| **Drop reporters may not all be credited.** Drop data is pooled from many reporters through a logged-in form. Their names are not shown publicly, and `observed_by` may name only the person who pooled the reports. | Low to medium | Link the page history and the per-page Cargo data. Ask the maintainers how they want reporters credited. |
| **Name confusion.** "Classic Maple Wiki" and "MapleClassic Wiki" are the same two words swapped. That invites reader confusion, a false endorsement or unfair competition complaint, and makes an objection from the maintainers more likely. | Low to medium | Non-affiliation line next to every credit. Contact the maintainers before launch. See a lawyer if they complain. |
| **Nexon objects to closed beta, client-derived data.** Only drop rates come from players: "The client carries no drop table, so every rate on this wiki is built from reported kills." Names, locations, quest links and shop lists are probably datamined from a closed beta client. So the plan's line between "facts" and "client-derived values" does not hold for those fields. | Low to medium | The importer reads a fan wiki, not Nexon's services. Facts are not Nexon's copyright. Never datamine yourself. Honor any Nexon takedown quickly. |
| **NonCommercial breach.** The Sirux credit, a portfolio use, or donations could be read as commercial. The test is "not primarily intended for or directed towards commercial advantage or monetary compensation", and "CC cannot advise you on what is and is not commercial use." | Low | Small credit, no imported data in Sirux marketing, donations for hosting only, no perks. Ask the maintainers. |
| **NC lock-in.** Relicensing the whole site ties the owner's own writing to NC. Future ads or paid features would then breach. | Medium | Consider the split option in item 25. Write the trade-off down in Decision 0008. |
| **EU database right.** Article 11 gives the right only to makers who "are nationals of a Member State or who have their habitual residence in the territory of the Community", or to EU companies. MapleClassic Wiki's maker and location are unknown. Section 4(b) applies only to "a database in which You have Sui Generis Database Rights", and a US owner likely holds none. | Low if the license is followed | Follow the license, including its NC term. The license covers database rights, so compliance covers you if the right exists. |
| **A missing credit ends the license.** Under Section 6(a), the license "terminate[s] automatically". | Low | Generate credits in the build (item 16). Fail the build on missing fields (item 11). Use the 30-day cure. |
| **Unseen rules.** No terms of use or bot policy turned up on the pages checked. Rules may still exist on Discord, which was not checked. | Low | Ask in the outreach message. Keep the rate limit and the honest User-Agent. |
| **Source blocks the importer, or the community objects.** The source's privacy policy says its access logs are used to "defend against abuse". | Low | Outreach first, rate limit, incremental reruns. |
| **Privacy law.** A dated kill count can describe one player's activity. GDPR likely does not apply because of Article 3(2), not because the data is public. CCPA's revenue and data-volume thresholds are far above this site. | Low | No usernames, plain dates only, a short privacy page. Check again before adding accounts, donations with stored payer data, or tracking analytics. |
| **Source changes its license or asks for removal.** | Low | Licenses already granted stay valid for copies made under them. Use the removal command (item 9). |

## Needs a lawyer

- **Is a facts-only import protected at all?** Do the selected fields (names, locations, quest order, shop lists, observed drop rates) carry copyright or database rights under US law, and under EU law for EU readers? Section 2(a)(2) says that where exceptions apply, "this Public License does not apply". Feist says "That there can be no valid copyright in facts is universally understood."
- **Which license governs the source data?** The footer says BY-NC-SA and the About page says BY-SA 4.0. Who counts as the licensor? How far can a maintainer's written answer bind other editors?
- **Is the use commercial?** Does the Sirux footer credit, use as a Sirux portfolio piece, or a hosting-only donation link make the use commercial under the NonCommercial definition?
- **Can the licenses be split?** Can the owner's own writing stay CC BY-SA while only imported material is BY-NC-SA, or do mixed pages force the whole page to BY-NC-SA?
- **Nexon's rights.** How do Nexon's EULA, Terms of Service and any closed beta terms bear on republishing data that was probably datamined during a closed beta? How far do Nexon's trademark rights reach over game names on a fan site, and what is the exact nominative fair use test? The primary case did not load.
- **The site name.** Name similarity with MapleClassic Wiki: risk of a false endorsement, unfair competition or domain complaint.
- **Crediting reporters.** Does linking to the page history and Cargo data, instead of copying `observed_by`, satisfy Section 3(a)(1)(A)(i), given that pooled reporters may not be named anywhere public?
- **Reuse restrictions.** Would rate limiting, Vercel bot protection or any future terms of use count as extra restrictions under Sections 2(a)(5)(C) and 3(b)(3)?
- **Privacy notice.** Does California's CalOPPA require a privacy policy for a no-ads fan site?
- **Any letter or takedown** from Nexon or from the MapleClassic Wiki operators.
- **EU court rulings.** The CJEU database rulings (British Horseracing, Football Dataco) were read only through blog write-ups. Check them against the official judgments.

## Sources

**License and attribution guidance**
- https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en
- https://creativecommons.org/licenses/by-nc-sa/4.0/
- https://creativecommons.org/licenses/by-sa/4.0/legalcode.en
- https://creativecommons.org/faq/
- https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses/
- https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution
- https://wiki.creativecommons.org/wiki/NonCommercial_interpretation
- https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content

**MapleClassic Wiki**
- https://mapleclassic.wiki/
- https://mapleclassic.wiki/api.php?action=query&meta=siteinfo&siprop=general|rightsinfo&format=json
- https://mapleclassic.wiki/api.php?action=query&meta=allmessages&ammessages=Copyrightwarning&format=json
- https://mapleclassic.wiki/wiki/MapleWiki:About
- https://mapleclassic.wiki/wiki/MapleWiki:General_disclaimer
- https://mapleclassic.wiki/wiki/MapleWiki:Privacy_policy
- https://mapleclassic.wiki/wiki/MapleWiki:Style_guide
- https://mapleclassic.wiki/wiki/MapleWiki:How_to_edit
- https://mapleclassic.wiki/wiki/MapleWiki:Community_portal
- https://mapleclassic.wiki/wiki/MapleWiki:Report_an_item_drop
- https://mapleclassic.wiki/wiki/Special:CargoTables/monster_drops
- https://mapleclassic.wiki/wiki/Template:Drop
- https://mapleclassic.wiki/wiki/Green_Mushroom
- https://mapleclassic.wiki/wiki/Green_Mushroom?action=history
- https://mapleclassic.wiki/api.php?action=query&titles=File:Snail.png&prop=imageinfo|revisions
- https://mapleclassic.wiki/robots.txt

**US copyright law**
- https://www.law.cornell.edu/supremecourt/text/499/340
- https://www.law.cornell.edu/uscode/text/17/102
- https://www.law.cornell.edu/uscode/text/17/103
- https://www.copyright.gov/circs/circ14.pdf
- https://www.copyright.gov/circs/circ33.pdf

**EU database right**
- https://www.legislation.gov.uk/eudr/1996/9/article/7/adopted
- https://www.legislation.gov.uk/eudr/1996/9/article/11/adopted
- https://ipkitten.blogspot.com/2004/11/bhb-fixtures-marketing-in-english-at.html
- https://legalblogs.wolterskluwer.com/copyright-blog/football-dataco-ii-re-utilisation-must-be-interpreted-broadly/

**Nexon**
- https://m.nexon.com/terms/304

**Privacy law**
- https://gdpr-info.eu/art-2-gdpr/
- https://gdpr-info.eu/art-3-gdpr/
- https://gdpr-info.eu/art-4-gdpr/
- https://gdpr-info.eu/art-14-gdpr/
- https://gdpr-info.eu/recitals/no-26/
- https://codes.findlaw.com/ca/civil-code/civ-sect-1798-140/
- https://codes.findlaw.com/ca/business-and-professions-code/bpc-sect-22575/

**Did not load or gave no usable text**
- MapleWiki:Copyrights returns HTTP 404. The page does not exist.
- Justia's copies of Feist and New Kids on the Block return HTTP 403.
- EUR-Lex returned an empty body.
- The curia.europa.eu judgment pages showed no judgment text.
- The California leginfo and Justia statute pages did not load.
- The CPPA statute PDF loaded, but no text could be extracted from it.
