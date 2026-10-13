# Backlog

Three sections. Only items in Now may be worked on. Moving an item into Now needs owner approval.

Each line: id, one line, spec, status, owner. Status is one of `todo`, `in progress`, `blocked`, `done`.

## Now

- **P2** Design system: the chosen mix of mockups A and B built into the site. Spec: [0002](specs/0002-design-system.md). Status: in progress on branch `spec/0002-design-system`, pull request 3. Owner: agent.
- **P2a** Sprite system: images policy, source list, sprite field, validator checks. Decision [0005](docs/decisions/0005-identification-sprites.md), rules in [docs/policies/images.md](docs/policies/images.md). Status: in progress. Rules and checks done, sprites not yet shown on pages. Owner: agent.
- **P1** GitHub repository, labels, branch protection, then Vercel hosting with previews and the real domain. Spec: [0001](specs/0001-github-and-vercel.md). Status: done 2026-10-13. Live at https://classicmaple.wiki with previews on every pull request. Owner: agent, with owner for logins and DNS.

## Next

- **P3** Ecosystem pages: `/about` with Sirux credit, `/support` with donations, footer credit, disclaimer on every page, a credits list for sprite sources, a takedown contact, and plain text links to the official game site (decision 0005). Spec: not yet written. Status: todo. Owner: agent.
- **P2b** First sprites: add sprites for the monsters and items that exist, from allowed sources, following the images policy. Spec: none needed, the policy is the process. Status: todo. Owner: agent or contributors.
- **P2c** Direction C, the Maple storybook look named in decision 0005, as a refinement of the built design. Spec: 0002 addendum, not yet written. Status: todo, after the owner sees the current build. Owner: agent.

## Later

- **P4a** Spec only: contribution-scale, from ten contributors to a thousand. Spec: not yet written. Status: todo. Owner: agent.
- **P4b** Spec only: ai-assist, AI drafts and humans approve, with running cost per option. Spec: not yet written. Status: todo. Owner: agent.
- **P4c** Spec only: community-platform, accounts, submissions, profiles, and the trigger for a database. Spec: not yet written. Status: todo. Owner: agent.
- **P2d** Read the Fandom and Hidden Street terms in a browser and record them in `data/sprite-sources.yaml`. Both are `ask-first` because automated checks were blocked. Status: todo. Owner: owner.

## Owner questions

Answers unblock the items above. Record the answer in the related spec.

- **Q2** Donation platforms for `/support`. Blocks P3.
- **Q3** Credit the owner by name, or only as Sirux. Blocks P3.
- **Q10** A takedown contact for the site: an email address, or GitHub issues with a `takedown` label only. Blocks P3.
- **Q11** Confirm the first source statuses in `data/sprite-sources.yaml`: maplestory.io allowed, maplestorywiki.net and NiaMeowDB allowed with credit, Fandom and Hidden Street ask first, private servers blocked.
- Answered: Q1 repository address, Q4 CI only protection, Q5 Vercel app and DNS, Q6 domain at Name.com, Q7 admin bypass, Q8 asset defaults, Q9 moods and hubs, Vercel spend cap of $50 a month set 2026-10-13.
