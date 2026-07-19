# Skill Registry — KioskoApp

Generated: 2026-06-04
Mode: user-level skills (no project-level skills detected)

## Project Standards

No project-level convention files detected (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, `copilot-instructions.md`). Using orchestrator-agent persona rules only.

## Compact Rules by Skill

### branch-pr
**Trigger**: creating, opening, or preparing PRs for review
**Path**: `~/.config/opencode/skills/branch-pr/SKILL.md`
- Every PR MUST link an approved issue — no exceptions.
- Every PR MUST have exactly one `type:*` label.
- Branch names: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`.
- Conventional commits only; never add "Co-Authored-By" or AI attribution to commits.

### chained-pr
**Trigger**: PRs over 400 lines, stacked PRs, review slices
**Path**: `~/.config/opencode/skills/chained-pr/SKILL.md`
- Split PRs over 400 changed lines unless maintainer accepts `size:exception`.
- Keep each PR reviewable in ≤60 minutes; one deliverable work unit per PR.
- State start, end, prior dependencies, follow-up work, and out-of-scope items in every chained PR.
- Every child PR must include a dependency diagram marking the current PR with `📍`.
- In Feature Branch Chain: tracker PR draft/no-merge; child #1 targets tracker branch, later children target immediate parent.
- Treat polluted diffs as base bugs; do not mix chain strategies after user chooses one.

### work-unit-commits
**Trigger**: implementation, commit splitting, chained PRs
**Path**: `~/.config/opencode/skills/work-unit-commits/SKILL.md`
- Commit by work unit (deliverable behavior), not by file type.
- Keep tests with code — same commit as the behavior they verify.
- Keep docs with the user-visible change.
- Each commit should be a candidate chained PR when the change grows.
- Tell a story: reviewer should understand why each commit exists from its diff and message.

### cognitive-doc-design
**Trigger**: writing guides, READMEs, RFCs, onboarding, architecture docs
**Path**: `~/.config/opencode/skills/cognitive-doc-design/SKILL.md`
- Lead with the answer — decision/action/outcome first, context after.
- Progressive disclosure: happy path first, then details, edge cases, references.
- Chunking: group related info into small sections; keep flat lists short.
- Signposting: use headings, labels, callouts, summaries.
- Recognition over recall: prefer tables, checklists, examples, templates over prose.

### comment-writer
**Trigger**: PR feedback, issue replies, reviews, Slack/GitHub comments
**Path**: `~/.config/opencode/skills/comment-writer/SKILL.md`
- Be useful fast — start with the actionable point.
- Be warm and direct; keep it short (1-3 paragraphs or tight bullets).
- Explain WHY when asking for a change.
- Match thread language: Spanish → Rioplatense voseo (`podés`, `tenés`, `fijate`, `dale`).
- Avoid pile-ons — comment on the highest-value issue, not every tiny preference.

### issue-creation
**Trigger**: creating GitHub issues, bug reports, feature requests
**Path**: `~/.config/opencode/skills/issue-creation/SKILL.md`
- Must use a template (bug report or feature request); blank issues are disabled.
- Every issue gets `status:needs-review` automatically on creation.
- A maintainer MUST add `status:approved` before any PR can be opened.
- Search existing issues for duplicates before creating.

### judgment-day
**Trigger**: judgment day, dual review, adversarial review, juzgar
**Path**: `~/.config/opencode/skills/judgment-day/SKILL.md`
- Launch two blind judges in parallel with identical target and criteria.
- Never accept a partial verdict; wait for both judges before synthesis.
- Classify warnings: only `WARNING (real)` if normal use triggers it; otherwise `INFO (theoretical)`.
- After any fix, immediately re-launch both judges in parallel before commit/push/done.
- Terminal states: only `JUDGMENT: APPROVED` or `JUDGMENT: ESCALATED`.
- After 2 fix iterations with remaining issues, ask user whether to continue.

### skill-creator
**Trigger**: new skills, agent instructions, documenting AI usage patterns
**Path**: `~/.config/opencode/skills/skill-creator/SKILL.md`
- Skill is a runtime instruction contract for an LLM, not human documentation.
- Keep trigger words in `description`; do not add a separate `Keywords` section.
- Target 180-450 body tokens; hard max 1000.
- References must point to local files: put templates/schemas in `assets/`, conceptual detail in `references/`.
- Required structure: frontmatter, Activation Contract, Hard Rules, Decision Gates, Execution Steps, Output Contract.

### go-testing
**Trigger**: Go tests, go test coverage, Bubbletea teatest, golden files
**Path**: `~/.config/opencode/skills/go-testing/SKILL.md`
- Not applicable to this TypeScript/React Native project. Included for completeness only.
