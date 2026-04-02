---
name: update-readme-if-needed
on:
  pull_request:
    types: [opened, synchronize]

permissions:
    contents: read
    pull-requests: read
    
safe-outputs:
  add-comment:
    hide-older-comments: true
    allowed-reasons: [outdated]
  noop:
    report-as-issue: false
    
tools:
  github:
    toolsets: [repos, pull_requests]
engine: copilot
---

# Goal
Analyze the pull request diff and update README.md if the changes affect user-facing behavior, setup, or documentation.

# Steps

## 1. Gather Context
- Retrieve the pull request title, description, and diff.
- Identify:
  - Files changed
  - Nature of changes (feature, fix, refactor, docs, config)

## 2. Classify Impact
Determine if the PR impacts:
- Public API
- CLI usage or commands
- Installation/setup steps
- Configuration
- Features or behavior
- Examples or usage docs

If NONE of the above → Do nothing

## 3. Locate Relevant README Sections
- Open README.md
- Identify sections that may need updates:
  - Overview / Features
  - Installation
  - Usage
  - Examples
  - Configuration

## 4. Decide Action

### Case A — No Update Needed
- DO NOT DO ANYTHING. STOP!

### Case B — Update Needed
- Proceed to generate a suggested patch only (no edits applied).

## 5. Locate Relevant Sections

Open README.md and identify affected sections:

- Overview / Features
- Installation
- Usage
- Configuration
- Examples

Only target specific sections that need changes — DO NOT rewrite entire README.

6. Generate Suggested Changes

Create a minimal patch that:

- Preserves tone and structure
- Matches existing formatting
- Adds or updates only necessary lines
- Avoids duplication

Format as a unified diff:

```
--- a/README.md
+++ b/README.md
@@
 <context>
- old content
+ new content
```

## 7. Post Suggestion for Human Review

Create a PR comment with:

Structure:

- Title - "### ✏️ Suggested README Update (Review Required)"
- Summary
    - Why README needs updating
    - What changed in the PR that triggered it
- Proposed Patch
    - Include the diff block
- Explicit Review Request - "Please review and apply this change if it looks correct."

# Guardrails
- Never hallucinate features not present in diff
- Do not remove unrelated content
- Keep edits minimal and precise
- If uncertain → ask for human review instead of editing

# Output
- Either:
  - No-op + explanation
  - OR a patch to README.md + explanation comment