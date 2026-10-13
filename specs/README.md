# Specs

A spec is written before any feature code. Typo and one-line fixes are exempt.

## Process

1. Copy `_template.md` to `NNNN-short-name.md`. Use the next free number.
2. Fill in every section. Acceptance criteria must be testable.
3. Set Status to `draft` and link the spec from its item in `BACKLOG.md`.
4. Stop. The owner approves by saying so in chat or by setting Status to `approved`.
5. Set Status to `in progress` when work starts. Check off Tasks as they land.
6. Set Status to `done` when every acceptance criterion is met and verified.

## Status values

`draft` `approved` `in progress` `done`

## Rules

- One spec per backlog item. Small items may share one spec if they ship together.
- Open questions stay in the spec until the owner answers them. Record the answer in the spec.
- A spec changes only with owner approval once it is approved.
- Specs are plain Markdown. Short sentences, plain words, no em dashes.
