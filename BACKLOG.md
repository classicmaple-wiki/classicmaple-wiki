# Backlog

Three sections. Only items in Now may be worked on. Moving an item into Now needs owner approval.

Each line: id, one line, spec, status, owner. Status is one of `todo`, `in progress`, `blocked`, `done`.

## Now

- **P2e** Paint the seven scene pictures, day and optional night, with an image model, following [docs/policies/scene-art.md](docs/policies/scene-art.md). Decision [0006](docs/decisions/0006-painted-scene-art.md). Kerning City and Henesys first. Status: todo. Owner: owner.
- **P2** Design system: the chosen mix of mockups A and B built into the site, scenes now painted per decision 0006. Spec: [0002](specs/0002-design-system.md). Status: in progress on branch `spec/0002-design-system`, pull request 3. Code ready for painted scenes and page sprites. Owner: agent.
- **P2a** Sprite system: images policy, source list, sprite field, validator checks. Decision [0005](docs/decisions/0005-identification-sprites.md), rules in [docs/policies/images.md](docs/policies/images.md). Status: in progress. Rules and checks done, sprites not yet shown on pages. Owner: agent.
- **P1** GitHub repository, labels, branch protection, then Vercel hosting with previews and the real domain. Spec: [0001](specs/0001-github-and-vercel.md). Status: done 2026-10-13. Live at https://classicmaple.wiki with previews on every pull request. Owner: agent, with owner for logins and DNS.

## Next

- **P3** Ecosystem pages: `/about` and a credits list for sprite sources. Footer credit, official game link, and disclaimer are done. Donations wait: Buy Me a Coffee or Patreon, once the owner can receive money. Spec: not yet written. Status: todo. Owner: agent.
- **P2b** First sprites: add sprites for the monsters and items that exist, from allowed sources, following the images policy. Spec: none needed, the policy is the process. Status: todo. Owner: agent or contributors.
- **P2c** Direction C, the Maple storybook look named in decision 0005, as a refinement of the built design. Spec: 0002 addendum, not yet written. Status: todo, after the owner sees the current build. Owner: agent.

## Later

- **P4a** Spec only: contribution-scale, from ten contributors to a thousand. Spec: not yet written. Status: todo. Owner: agent.
- **P4b** Spec only: ai-assist, AI drafts and humans approve, with running cost per option. Spec: not yet written. Status: todo. Owner: agent.
- **P4c** Spec only: community-platform, accounts, submissions, profiles, and the trigger for a database. Spec: not yet written. Status: todo. Owner: agent.
- **P2d** Fandom and Hidden Street stay `ask-first`. The owner does not contact sites, so use other sources or draw our own. Status: settled. Owner: owner.

## Owner questions

Answers unblock the items above. Record the answer in the related spec.

- Answered 2026-10-13: Q2 donations will be Buy Me a Coffee or Patreon, later. Q3 credit links to Sirux at sirux.io, after a link to the official game. Q10 takedown requests come in as GitHub issues with the `takedown` label, no email. Q11 source statuses confirmed, use what is allowed and draw our own otherwise, never contact sites. Q12 old scripted scene files deleted.
- Answered: Q1 repository address, Q4 CI only protection, Q5 Vercel app and DNS, Q6 domain at Name.com, Q7 admin bypass, Q8 asset defaults, Q9 moods and hubs, Vercel spend cap of $50 a month set 2026-10-13.
