# Backlog

Three sections. Only items in Now may be worked on. Moving an item into Now needs owner approval.

Each line: id, one line, spec, status, owner. Status is one of `todo`, `in progress`, `blocked`, `done`.

## Now

- **P2f** Interface that serves the art. Spec: [0003](specs/0003-art-led-interface.md), decision [0007](docs/decisions/0007-art-led-direction.md). Status: done 2026-10-14, live. Owner: agent.
- **P2e** Paint the scene pictures with the prompt kit in [docs/art-direction.md](docs/art-direction.md). Done: Henesys day and night, Kerning City at dusk. To do: Kerning City night, Maple Island, Ellinia, Perion, Sleepywood, Default. Status: in progress. Owner: owner.
- **P2** Design system. Spec: [0002](specs/0002-design-system.md). Status: done 2026-10-14, live. Owner: agent.
- **P2a** Sprite system: images policy, source list, sprite field, validator checks, page sprite layer. Decision [0005](docs/decisions/0005-identification-sprites.md), rules in [docs/policies/images.md](docs/policies/images.md). Status: done, waiting for the first sprites (P2b). Owner: agent.
- **P1** GitHub repository, labels, branch protection, then Vercel hosting with previews and the real domain. Spec: [0001](specs/0001-github-and-vercel.md). Status: done 2026-10-13. Live at https://classicmaple.wiki with previews on every pull request. Owner: agent, with owner for logins and DNS.

## Next

- **P3** Ecosystem pages: `/about` and a credits list for sprite sources. Footer credit, official game link, and disclaimer are done. Donations wait: Buy Me a Coffee or Patreon, once the owner can receive money. Spec: not yet written. Status: todo. Owner: agent.
- **P2b** First sprites: add sprites for the monsters and items that exist, from allowed sources, following the images policy. Spec: none needed, the policy is the process. Status: todo. Owner: agent or contributors.
- **P2c** Direction C, the storybook look from decision 0005. Status: replaced by P2f and spec 0003. Owner: agent.

## Later

- **P4a** Spec only: contribution-scale, from ten contributors to a thousand. Spec: not yet written. Status: todo. Owner: agent.
- **P4b** Spec only: ai-assist, AI drafts and humans approve, with running cost per option. Spec: not yet written. Status: todo. Owner: agent.
- **P4d** Idea from the owner, 2026-10-14, not to build yet: player centric contribution. A player finds something, uploads screenshots, and writes a note in a web form, no GitHub needed. An AI pipeline, likely Gemini because the owner has spare credits, reads the screenshots, extracts values against our schemas, and drafts the change for human review. Fold into the P4a and P4b specs, and P4c if accounts are needed. Status: idea. Owner: owner.
- **P4c** Spec only: community-platform, accounts, submissions, profiles, and the trigger for a database. Spec: not yet written. Status: todo. Owner: agent.
- **P2d** Fandom and Hidden Street stay `ask-first`. The owner does not contact sites, so use other sources or draw our own. Status: settled. Owner: owner.

## Owner questions

Answers unblock the items above. Record the answer in the related spec.

- Answered 2026-10-13: Q2 donations will be Buy Me a Coffee or Patreon, later. Q3 credit links to Sirux at sirux.io, after a link to the official game. Q10 takedown requests come in as GitHub issues with the `takedown` label, no email. Q11 source statuses confirmed, use what is allowed and draw our own otherwise, never contact sites. Q12 old scripted scene files deleted.
- Answered: Q1 repository address, Q4 CI only protection, Q5 Vercel app and DNS, Q6 domain at Name.com, Q7 admin bypass, Q8 asset defaults, Q9 moods and hubs, Vercel spend cap of $50 a month set 2026-10-13.
