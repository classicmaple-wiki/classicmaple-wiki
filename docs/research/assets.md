# Asset and policy inventory

Date: 2026-10-13. Phase 2, deliverable 2.

This document lists every asset type the wiki might use, who owns it, what its terms say, and what we do with it. It quotes what Nexon publishes about fan use, game images, and money, with a link to each source. It flags the one question that must be answered before the support page ships: whether donations are clearly allowed.

Standing rules:

- No bulk download of game art, sprites, or sounds.
- No extraction from the game client.
- No copying of images or data from other fan sites.
- Anything not clearly permitted is marked "needs owner decision" and is not downloaded.
- Decision 0003 adds: the wiki uses only art it owns, kept minimal. See `docs/decisions/0003-original-art-only.md`.

How this was made. Five research sweeps loaded the pages with a text fetch tool. Every quote below was then checked by a second pass that reloaded the page and confirmed the passage is there word for word. Quotes that failed that check, or whose check did not run, are not shown. The fetch tool cuts long passages at about 125 characters, so some quotes are exact fragments of longer sentences. Read the full page before relying on any of them. Most nexon.com pages render with JavaScript and returned only a title, so the Nexon terms were read from the mobile copy at m.nexon.com and from the Steam copy.

The short answer to "can we use the assets like private servers do": no. Private servers have no license either. Nexon's September 2026 notice calls them copyright infringement, and Nexon's 2024 takedown on GitHub named modified images and reverse engineered data as infringing. Taking files from a private server adds a second unauthorized copy and no permission.

## Inventory

| Asset | Source link | Owner | License or terms | Allowed use | Decision |
| --- | --- | --- | --- | --- | --- |
| Game sprites, maps, NPC and monster art, UI art extracted from the client | https://m.nexon.com/terms/304 | Nexon | Personal, non-commercial license. No copying, distribution, or derivative works granted. Nexon retains all rights. | Play only | do not use |
| Asset packs or sprite dumps from private servers (MapleLegends, MapleRoyals, others) | https://m.nexon.com/terms/304 | Nexon. Private servers hold no rights to grant. | Same ownership. Code of Conduct bars posting information on private servers. Nexon's Sep 2026 notice calls them infringement. | None | do not use |
| Private server client files, WZ dumps, data files | https://github.com/github/dmca/commit/9c54ccb7bfbfe32ad48ae63ee2e455fc3b11a35c | Nexon | Nexon Korea's 2024 takedown named reverse engineered data, modified images, and a modified client as infringing. | None | do not use |
| Links to or guides for private servers | https://m.nexon.com/terms/304 | Not applicable | Code of Conduct: posting information on private servers is prohibited conduct. | None | do not use |
| Official site images, key art, wallpapers from nexon.com | http://nxcache.nexon.net/nx/global/legal_info/legal.html | Nexon America and Nexon Korea | 2011 notice: no portion of the site may be used without express written permission. Current terms grant no license. | None without written permission | do not use |
| MapleStory, Classic World, and Nexon logos and wordmarks | https://m.nexon.com/terms/304 | Nexon | No right or license to trademarks, service marks, or logos without prior written consent. | Plain text naming only, with the not affiliated line | do not use |
| Steam store capsule art and screenshots | https://store.steampowered.com/app/5142560/MapleStory_Classic_World__Zakum_Package/ | Nexon Korea and Nexon America | All rights reserved. No reuse terms. | None stated | do not use |
| Official press kit or media kit | https://gamespress.com/Nexon | Nexon America via Games Press | Unknown. Games Press needs a press login. No public press kit page found. | Unknown | needs owner decision |
| Official fan kit | https://www.nexon.com/maplestory/news/general/45385/classic-world-frequently-asked-questions | Nexon America | None found. The official Classic World pages rendered only a title. | Unknown | needs owner decision |
| Owner's own in-game screenshots and clips | https://m.nexon.com/terms/304 | Nexon owns the depicted content. The capture is User Content the player is responsible for. | Terms treat clips and screenshots as User Content and give Nexon a broad license to them. They never say players may publish them on a third party site. | Common fan practice, never written permission | needs owner decision |
| Small sprite thumbnails to identify an entry | https://m.nexon.com/terms/304 | Nexon | Same no copying clauses. The strongest fair use case and still not permitted by any loaded page. | Not addressed | needs owner decision |
| Map backgrounds as page atmosphere | https://store.steampowered.com/news/posts/?feed=steam_community_announcements&appids=212160%2C216150%2C11610%2C212200%2C212180%2C212240%2C212171%2C212170%2C216152%2C216153%2C212210&appgroupname=Nexon+America+Inc.&enddate=1789455915 | Nexon | All rights reserved. A full page decorative use is a larger take than a small icon, so the fair use argument is weaker. | None | needs owner decision. Decision 0003 chooses original art instead. |
| Verbatim quest dialogue, NPC lines, item descriptions | https://m.nexon.com/terms/304 | Nexon | Copyrighted expression. Short quotes are a fair use question. Bulk dumps are copying. | Short quotes at most | needs owner decision |
| Game music and sound effects | https://jp.nexon.com/rule/copyright_maplestory.aspx | Nexon | Only the Japan guideline addresses it, and that is scoped to Japan. | None for a Global site | needs owner decision. Recommend none. |
| Game facts in our own words: names, levels, stats, locations, quest steps | https://m.nexon.com/terms/304 | Facts are not owned. Names identify game content. | The terms do not restrict describing the game. | Original guides and reference pages | use |
| Short quotes from Nexon notices and news posts | Steam announcement feed, link above | Nexon America | Copyrighted. Short attributed quotation for reporting. | Brief quotes with a link | use with attribution |
| An original mascot close to the Orange Mushroom | https://m.nexon.com/terms/304 | Nexon owns the character design | A close likeness is a derivative work. No fan art policy found for Global. | Not addressed | needs owner decision. A generic mushroom with its own design is safer. |
| Original pixel art, UI, wordmark, and motifs made for the wiki | https://m.nexon.com/terms/304 | Classic Maple Wiki and Sirux | Owner's own work. Style and mood are not protected. Specific characters and art are. | Full use. Never a pixel for pixel copy of a Nexon sprite or window. | use |
| Nexon Open API game data | https://openapi.nexon.com/support/terms/ | Nexon Korea | Non-commercial without written agreement. Must identify Nexon as the source. Not for advertising. | Non-commercial apps with attribution | needs owner decision. Unknown if it serves Classic World data. |
| Text from maplestorywiki.net written on or after 25 Feb 2024 | https://maplestorywiki.net/w/MapleStory_Wiki:Copyrights | MapleStory Wiki contributors | CC BY-NC-SA 3.0 | Credit, share alike, non-commercial only | needs owner decision. Recommend writing our own. |
| Text from maplestorywiki.net written before 25 Feb 2024 | https://maplestorywiki.net/w/MapleStory_Wiki:Copyrights | MapleStory Wiki contributors | CC BY-SA 3.0 | Credit and share alike | use with attribution, data tables only, and only if share alike on those pages is accepted |
| Images hosted on maplestorywiki.net | https://maplestorywiki.net/w/Template:Fairuse | Nexon | Marked copyrighted and fair use by that wiki. It grants no rights. | None | do not use |
| Text and images from the MapleStory Fandom wiki | https://www.fandom.com/licensing | Fandom contributors, Nexon for images | Unknown. Every Fandom page returned HTTP 402. | Unknown | needs owner decision |
| Short excerpts and facts from meowdb.com | https://meowdb.com/reuse | NiaMeowDB | Reuse policy allows excerpts and facts with credit and a link. Wholesale copying needs permission. Policy text not verified word for word. | Short passages with credit | use with attribution |
| meowdb.com community posts | https://meowdb.com/reuse | Their authors | CC BY-SA 4.0 per their policy. Not verified word for word. | Credit, link, share alike | use with attribution |
| Images and data from the MapleLegends library | https://maplelegends.com/lib | Nexon, and MapleLegends for custom content | Site never loaded. It is a private server. Its data may not match Classic World. | None | do not use |
| OSRS Wiki and Weird Gloop policy structure | https://meta.weirdgloop.org/w/Licensing | Weird Gloop | Ideas are not copyrightable. | Borrow the structure, write our own words | use |
| Press Start 2P, pixel display font | https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/OFL.txt | CodeMan38 | SIL OFL 1.1, Reserved Font Name | Embed, self host, commercial. Do not sell alone. Do not rename a modified version. | use |
| Silkscreen, pixel caption font | https://raw.githubusercontent.com/google/fonts/main/ofl/silkscreen/OFL.txt | Jason Kottke | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Pixelify Sans, variable pixel sans | https://raw.githubusercontent.com/google/fonts/main/ofl/pixelifysans/OFL.txt | Stefie Justprince | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| DotGothic16, dot matrix with Japanese glyphs | https://raw.githubusercontent.com/google/fonts/main/ofl/dotgothic16/OFL.txt | Fontworks Inc. | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| VT323, terminal monospace | https://raw.githubusercontent.com/google/fonts/main/ofl/vt323/OFL.txt | Peter Hull | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Jersey 10, narrow pixel display | https://raw.githubusercontent.com/google/fonts/main/ofl/jersey10/OFL.txt | Sarah Cadigan-Fried | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Tiny5, 5 pixel variable font | https://raw.githubusercontent.com/google/fonts/main/ofl/tiny5/OFL.txt | Stefan Schmidt | SIL OFL 1.1 | Embed, self host, modify, commercial. Decorative only. | use |
| Inter, modern sans | https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt | Rasmus Andersson | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Nunito, rounded sans | https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/OFL.txt | Vernon Adams | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Source Serif 4, modern serif | https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/OFL.txt | Adobe | SIL OFL 1.1 | Embed, self host, modify, commercial | use |
| Lora, warm serif | https://raw.githubusercontent.com/google/fonts/main/ofl/lora/OFL.txt | Cyreal | SIL OFL 1.1, Reserved Font Name | Embed, self host, commercial. Do not rename a modified version. | use |
| Upheaval TT, pixel font | https://www.fontspace.com/upheavtt-font-f22693 | Brian Kent | Conflicting. FontSpace says demo. DaFont says free. DaFont's own FAQ says its labels are only a hint. | Unknown | needs owner decision. Not worth it. |
| Lucide icons | https://lucide.dev/license | Lucide contributors | ISC | Any use. Keep the notice in the repo. | use with attribution |
| Tabler Icons | https://raw.githubusercontent.com/tabler/tabler-icons/main/LICENSE | Paweł Kuna | MIT | Any use. Keep the notice in the repo. | use with attribution |
| Phosphor Icons | https://github.com/phosphor-icons/homepage/blob/master/LICENSE | Phosphor Icons | MIT | Any use. Keep the notice in the repo. | use with attribution |
| Heroicons | https://raw.githubusercontent.com/tailwindlabs/heroicons/master/LICENSE | Tailwind Labs | MIT | Any use. Keep the notice in the repo. | use with attribution |
| Iconoir | https://raw.githubusercontent.com/iconoir-icons/iconoir/main/LICENSE | Luca Burgio | MIT | Any use. Keep the notice in the repo. | use with attribution |
| Pixelarticons, free set of 1036 | https://raw.githubusercontent.com/halfmage/pixelarticons/master/LICENSE | Gerrit Halfmann | MIT for the free npm package | Any use. Keep the notice in the repo. | use with attribution |
| Pixelarticons Pro, all 5570 | https://pixelarticons.com/ | Gerrit Halfmann | Paid one time purchase. Pro terms not loaded. | Unknown until bought | needs owner decision. Costs money. |
| Material Symbols | https://raw.githubusercontent.com/google/material-design-icons/master/LICENSE | Google | Apache 2.0 | Any use. Keep LICENSE and NOTICE in the repo. | use with attribution. Low priority, no identity. |
| Font Awesome Free | https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/LICENSE.txt | Fonticons | Icons CC BY 4.0, fonts OFL, code MIT | Commercial allowed. Credit required. Embedded file comments count if not stripped. | use with attribution. Not needed. |
| game-icons.net | https://game-icons.net/about.html | Lorc, Delapouite, and contributors | CC BY 3.0 | Commercial allowed. Visible credit required. | use with attribution |
| Kenney game assets | https://kenney.nl/support | Kenney | CC0 | Any use, modify freely, no credit needed | use |
| OpenGameArt uploads | https://opengameart.org/content/faq | Each artist | Varies per item: CC0, OGA-BY, CC-BY, CC-BY-SA, GPL | Depends on the item | needs owner decision, per file |
| itch.io free pixel packs | https://itch.io/docs/legal/terms | Each uploader | Set per pack. itch.io grants no reuse rights. | Unknown per pack | needs owner decision, per pack |
| Pixabay vectors | https://pixabay.com/service/license-summary/ | Pixabay and uploaders | Custom license with limits | Free on a site, no standalone resale | needs owner decision. Low value. |
| unDraw illustrations | https://undraw.co/license | unDraw | Custom license | Commercial, no credit, no repackaging | use. Flat modern style only. |

## What Nexon says

### Fan sites

No Nexon or Nexon America fan content policy, fan site policy, fan art policy, or streaming policy was found on any page that loaded. The words fan site, wiki, donation, and monetization do not appear in the Global terms. The one official fan content rule set found is Nexon Japan's, and it limits itself to individuals in Japan.

**Nexon Terms of Service and End User License Agreement.** Owner: Nexon, with Nexon America Inc. listed as a contracting entity. https://m.nexon.com/terms/304. The page states "Last updated: September 8, 2026" per the research fetch.

> They govern your access and use of the websites, games, mobile apps, and other interactive software products and services

> Subject to these Terms, you may access and use the Services running operating systems on which the Services were designed to operate for your personal, non-commercial, entertainment use only.

> misrepresenting that your statements or actions are endorsed by Nexon.

> Selling, advertising, or posting information on hacks, private servers (including sources thereof)

> Nexon is always pleased to hear from our players and fans

In plain words: the game is licensed for personal, non-commercial play. Nothing grants a fan site any right. Nothing forbids a wiki by name. Posting information on private servers is prohibited conduct, so the wiki does not link to or promote them. Nexon says it welcomes hearing from fans, which is the opening for a written request.

**MapleStory Copyrighted Works Usage Guideline, Nexon Japan, established 2023-11-29.** Owner: Nexon Co., Ltd. https://jp.nexon.com/rule/copyright_maplestory.aspx. Japanese text, quoted as published.

> なお、本ガイドラインの適用は、個人のお客様による日本国内での利用に限ります。

> UGCとは、本著作物に基づきお客様が制作した二次創作物で、動画(ゲームプレイ動画、ゲーム紹介動画等を含みます)、静止画、同人誌、マンガ、小説等を含みます。

> UGCを公開する際は、出所（当社名「NEXON」と本ゲームタイトル）を明記してください。

> 当社または本ゲームの公式や公認と誤認させるようなUGCを制作及び利用することはできません。

In plain words: this guideline applies only to individuals using it inside Japan. Within that scope it allows fan works such as videos, stills, doujinshi, manga, and novels. It requires a credit naming NEXON and the game title. It bans content that looks official or endorsed. It does not mention websites, wikis, or donations. It is the best signal of how Nexon thinks about fan content and it is not permission for a Global fan site.

### Game images

**Nexon Terms, Sections on ownership and user content.** https://m.nexon.com/terms/304.

> Nexon owns and shall retain all right, title, and interest, including without limitation all intellectual property rights, in and to the Services and any portions thereof.

> You are granted no right or license with respect to any of these trademarks, service marks, or logos without our prior written consent.

> You may not modify, copy (except for a single backup copy and transient copying required to operate the Services), distr

> You are and will remain solely responsible for all communications, images, videos, sounds, content or part of the content of databases, databases, content and any other materials or information that you upload or transmit through the Services, including without limitation any text, voice transmissions or recordings, or gameplay clips/screenshots ("User Content").

> You hereby grant Nexon a royalty-free, perpetual, irrevocable, fully transferable and sublicensable, non-exclusive, worldwide right and license to use your User Content in any and all media in any manner and for any purpose (including without limitation commercial, advertising, and promotional purposes) to the greatest extent permitted by applicable law, including without limitation the rights to reproduce, copy, modify, perform, display, publish, distribute, broadcast, transmit, or otherwise communicate to the public, or create derivative works from or adapt, use or otherwise exploit by any means whether now known or unknown and without any further notice or compensation to you of any kind.

In plain words: Nexon keeps every right in the game art, text, and sound. Users get no logo or trademark rights. Copying is barred except to run the game. Screenshots and clips are User Content that the player is responsible for, and Nexon gets a broad license to them. The terms never say a player may publish them on a third party site.

**Nexon Copyright and Legal Notice, 2011, static archive copy.** Owner: Nexon America Inc. and NEXON Corporation. http://nxcache.nexon.net/nx/global/legal_info/legal.html. This page may be superseded. No newer page says anything looser.

> NEXON America Inc. and NEXON Corporation (collective referred to as "NEXON") are the copyright and the trademark owners

> No portion of this site, including but not limited to the text, images, audio or video, may be used in any manner

In plain words: nothing from Nexon's own site may be used without express written permission.

**Nexon Open API Terms of Service, last updated 2025-04-21.** Owner: Nexon Korea Corporation. https://openapi.nexon.com/support/terms/. The only Nexon document found that openly licenses something to third parties. It covers game data, not images.

> Without Nexon's prior written agreement, use of the Nexon API Services for commercial purposes is not permitted

> You shall clearly and conspicuously identify Nexon in Your Application as the source of the Nexon Game Data,

> You may not display, distribute, or otherwise disclose the Nexon Game Data in any advertising or promotion

In plain words: non-commercial use with attribution is allowed for API data. Whether the API serves Classic World data is unknown.

### Monetization

**Nexon Terms, Code of Conduct.** https://m.nexon.com/terms/304.

> Distributing unauthorized materials or advertising or promoting goods or services without our permission (including, without limitation, by sending spam, promotional materials, junk mail, chain letters, pyramid schemes or any other form of unauthorized solicitation).

In plain words: this is written for in game conduct, not fan sites. It is the closest clause to advertising and it does not mention donations.

**Nexon Japan guideline, monetization clauses.** https://jp.nexon.com/rule/copyright_maplestory.aspx.

> お客様は、誰もが無料でアクセス可能なプラットフォーム（YouTube、Twitch、Facebook 、ニコニコ動画/生配信、TwitCasting等）にUGCをアップロードすることで、広告収入等により収益化することが可能です。

In plain words: in Japan, fan works may earn ad revenue on free public platforms such as YouTube and Twitch. Websites and donations are not named. The scope is Japan only.

**Nexon Japan and Nexon Korea creator programs.** https://maplestory.nexon.co.jp/notice/view/?alias=400dab1e83d14681addc61a21b7ddfc8 and https://www.etoday.co.kr/news/view/2228753. Regional programs where reviewed creators earn points from supporters' in game purchases. Platforms named: YouTube, Twitch, X. Not open to a Global fan wiki. No image rules. Listed so nobody mistakes them for a Global policy.

**MapleStory Worlds Creator Center.** https://maplestoryworlds-creators.nexon.com. This is the creator program Nexon America promotes. It is about building content inside the Worlds platform, not websites. Nothing there helps the wiki.

## How other fan wikis handle it

The quote verification pass for this topic did not run, because the session hit a usage limit. The passages the researcher copied are therefore not shown. The summaries below stand on the pages that loaded.

- **MapleStory Wiki (maplestorywiki.net).** Text is CC BY-NC-SA 3.0 for revisions on or after 25 February 2024 and CC BY-SA 3.0 before that. Those three license lines were verified in a different sweep. Game images carry a per file fair use template that marks the file as copyrighted and asserts fair use under US law. The images are not under the wiki's CC license. The terms page names a DMCA agent. Nexon is not mentioned on the about or copyright pages. https://maplestorywiki.net/w/Template:Fairuse
- **NiaMeowDB (meowdb.com).** A direct peer for Classic World that takes donations through a Buy Me a Coffee link. Its terms state non-affiliation, claim fair use for sprites, and say supporter payments buy nothing from Nexon. Its reuse policy allows excerpts and facts with credit and a link, licenses community posts CC BY-SA 4.0, and grants no rights to Nexon assets. https://meowdb.com/terms and https://meowdb.com/reuse
- **Old School RuneScape Wiki and Weird Gloop.** Every file carries a license box with owner, source, and basis. In game media is labeled Jagex copyright used with permission. Outside media is labeled non-free and fair use. Images from other fan sites are not reused. Text license and media license are separate. The permission line rests on a real Jagex partnership. The wiki must not write that line. https://oldschool.runescape.wiki/w/RuneScape:Images_and_media_policy
- **bg3.wiki and Terraria Wiki.** Both use a per file license notice that names the publisher as owner and the basis for showing the file. bg3.wiki points to Larian's public fan content policy. Terraria Wiki is the official wiki and states Re-Logic permission. Nexon has no equivalent public policy for Global.
- **MapleStory Fandom wiki.** Every page returned HTTP 402. Unknown.
- **MapleLegends.** Never loaded. Unknown, and a private server.

Nexon enforcement history, from loaded pages:

- **September 2026, Nexon America, Steam announcement "Maple Memo: Notice Regarding Unauthorized MapleStory Servers".** Nexon says MapleStory content is its copyrighted property, private servers infringe it, legal action is under way, some servers have closed, and enforcement extends to the support structure around operators. Fan wikis are not mentioned. Link in the inventory table.
- **2024-08-07, GitHub DMCA notice filed for NEXON Korea.** Against the Maple2 server emulator and 34 forks. Cites item data reverse engineered from the client, modified images, and a modified client. https://github.com/github/dmca/commit/9c54ccb7bfbfe32ad48ae63ee2e455fc3b11a35c
- **2024, Northern District of Texas, DMCA subpoena to Discord.** Nexon Korea sought to unmask Discord users accused of sharing pirated games. Outcome unknown. Reported by APH Networks.
- **2023, Nexon Korea notice reported by GamingDeputy.** 29 operators or developers arrested, proceedings against 23 operators, and planned countermeasures against users who support private servers.
- **2012, UMaple.** Nexon America won a default judgment of about 3.6 million dollars on DMCA anti-circumvention counts. Fan blog report.
- **2009, FinalStory and Leafre.com.** Cease and desist from Nexon America's general counsel. Fan blog report.
- **2008, OdinMS.** Nexon sued the emulator project. Fan blog report, outcome not reported.
- **2010, Hidden Street.** A Nexon Korea letter reportedly accused the fan database of running unauthorized servers and was reportedly retracted. The page returned 403. Unverified.
- **2017, BannedStory.** A character simulator went offline. Cause unknown. No Nexon statement.

No documented Nexon action against an information only fan wiki was found. Every confirmed action targeted private servers, emulators, cheat tools, or users sharing pirated games. Absence of a found case is not proof of safety.

## Monetization: the plain statement

Whether a fan wiki may take donations is **unclear**. The evidence:

- The Global terms are silent on fan sites, donations, and ads. They say the game is for personal, non-commercial use, which governs playing, not publishing.
- The only commercial clause that reaches third parties is the Open API rule, which bars commercial use of API data without written agreement.
- The Japan guideline permits ad revenue on free video platforms for individuals in Japan. It does not reach websites or other countries.
- A direct peer, NiaMeowDB, takes donations while showing Nexon sprites under a fair use claim, and no action against it was found.

What this means for the support page:

- With decision 0003, the site shows no Nexon art. A donation link on a site with no Nexon art raises no Nexon copyright question. The remaining question is only whether Nexon would read a donation link as commercial use of its trademarks in the site name. Plain text naming of the game with a clear not affiliated line is ordinary descriptive use.
- If the owner later allows screenshots, money changes the fair use picture. Keep donations clearly tied to hosting and maintenance, state that all content stays free, and state that supporters get nothing from Nexon.
- This is flagged to the owner before the support page ships, as the brief requires. Recommended default: proceed with donations, with the wording above, and send Nexon America a short written request for a fan site acknowledgment in parallel.

## Decisions the owner must make

1. Screenshots. Allow your own in game screenshots, small and attributed, under a fair use claim with a per file label and a takedown contact, or allow none. Recommended default: none at launch. Revisit after launch with a written request to Nexon.
2. Donations. Proceed with the wording in the monetization section, or wait for a Nexon answer. Recommended default: proceed.
3. Site name. Keep MapleStory in the tagline and description as plain text with the not affiliated line, or avoid the word in the site name. Recommended default: keep it in the description, never in the wordmark.
4. Mascot. Allow a generic mushroom motif with its own design, or avoid mushrooms. Recommended default: a generic mushroom, clearly not the Orange Mushroom sprite.
5. Fonts. Pick one pixel display face from Pixelify Sans, Press Start 2P, and Silkscreen, and one body face from Inter, Nunito, Source Serif 4, and Lora. Recommended default: Pixelify Sans for display, Nunito for body, Silkscreen for chips. The spec will show them.
6. Icons. Pick one line set and one pixel set. Recommended default: Lucide for interface icons, Pixelarticons free set for entity glyphs.
7. Open art packs. Allow Kenney CC0 packs as raw material for window frames and tiles, recolored to our palette, or draw everything from scratch. Recommended default: allow Kenney as raw material, nothing else without a per file check.
8. Other wikis' text. Write everything original, or allow data table reuse from maplestorywiki.net under CC BY-SA 3.0 with credit and share alike. Recommended default: original only.
9. Press kit. Register a press login on Games Press to see whether a Nexon kit exists, or skip. Recommended default: skip until after launch.
10. Written request. Send Nexon America a short note describing the wiki and asking for a fan site acknowledgment. Recommended default: yes, after launch, from your own name.

## Unknowns

- The live nexon.com legal pages render as JavaScript shells. The m.nexon.com copy dated September 8, 2026 and the Steam copy dated July 15, 2026 were read instead. Whether they match the live page word for word is unverified.
- Whether any Nexon fan content, fan site, or streaming policy exists for Global MapleStory. None was found.
- Whether Classic World has its own terms or founder's agreement with extra clauses.
- The Nexon Rules of Conduct text could not be read from any source.
- The official Classic World FAQ, news post 45385, loaded only a title. It may contain creator or streaming guidance. The owner should open it in a browser.
- Whether Nexon America sends takedowns to fan wikis. Not researched.
- Whether the Nexon Open API serves Classic World data.
- Whether Nexon Korea's REPLAY open IP project covers MapleStory. Korean news snippets say it covers other titles. Not loaded.
- Fandom's MapleStory wiki licensing. HTTP 402 on every page.
- Whether donations and an agency credit keep the wiki inside a non-commercial clause is a legal question this research cannot answer.
- Every Nexon quote above is an exact fragment cut at the fetch tool's limit. Read the full sections before relying on them.
- Pixelarticons Pro terms, the Pixabay full license, and the Upheaval font license were not confirmed.
