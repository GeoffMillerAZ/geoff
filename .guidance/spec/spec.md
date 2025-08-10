1. What is a “spec file”
   A Markdown file (e.g. invent_new_ui_v3.md) placed under <repo‑root>/specs/ or <repo‑root>/spec/.

Treated as the authoritative requirements document for the next AI‑driven coding loop.

Parsed first by the agent workflow (“Specification Analysis: reads and understands the spec file requirements” before it touches the code)
GitHub
.

Passed as the first argument to commands such as

bash
Copy
Edit
/project:infinite specs/invent_new_ui_v3.md src 1
which tells the agent: “implement exactly what is in that spec, output to src/, make one iteration”
GitHub
.

2. What to put in the file (minimal but complete)
   Section Purpose
   Title / Goal One‑sentence summary (“Add dark‑mode toggle to header”).
   Context Why this matters, existing constraints, links to design docs.
   Requirements Bullet list of must haves (functional and non‑functional).
   Acceptance tests How success is measured (CLI command, unit test outline, screenshot description).
   Out of scope Anything the agent must not change.
   Implementation hints (optional) Libraries, naming conventions, file paths.

Keep each section terse—remember you are writing for a large‑language model.

3. When do you need a spec file?
   Write one when any of these are true:

Cross‑file change – touches more than one file/module.

New feature – end‑to‑end behaviour not yet in code.

Non‑trivial refactor – affects public API or architecture.

External contract – other teams or agents consume the output.

AI loop – you plan to run an autonomous or batch agent (“single, small, large, infinite” loop verbs in Dan’s examples)
GitHub
.

Skip it for spelling fixes, renaming a var, or a one‑liner bug patch; a quick inline prompt is faster.

4. Choosing the right scope
   Single concern only. If you can describe the work with one clear verb + object statement, you are at the right granularity.
   Good: “Generate REST client for Sales API v2.”
   Bad: “Re‑architect backend and add three pages.”

Fits in one agent cycle. If the model would run out of context or tokens, split the spec into smaller siblings (auth_spec.md, ui_spec.md, etc.).

Produces atomic value. Whoever reads the diff should see a coherent feature landed.

Dan’s rule of thumb mentioned on stream: “Think 50–150 lines of net new code or one logical unit test suite.” (paraphrased from his Spec‑based AI Coding lesson)
agenticengineer.com
.

5. Practical workflow
   mkdir specs && touch specs/<feature>.md

Fill in the five sections above.

Commit the spec (git add specs/... && git commit -m "spec: <feature>").

Run your agent command pointing at the spec.

Review the generated PR; if changes are needed, update the spec, not the code, then rerun.

6. Tips and pitfalls
   Be unambiguous. The agent will do exactly what you write—even your typos.

Anchor on tests. Give at least one clear pass/fail check.

Version your specs. Add \_v2, \_v3 suffixes or Git tags to track evolved requirements.

Archive old specs in /specs/archive/ so the context window stays clean.

Don’t mix business logic and styling in one spec; keep them separate for easier iteration.

Using this pattern keeps requirements explicit, repeatable, and auditable—perfect for AI‑accelerated engineering.
