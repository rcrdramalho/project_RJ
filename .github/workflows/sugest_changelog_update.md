---
name: update-changelog-if-needed
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
Analyze the pull request diff and update CHANGELOG.md if the changes affect user-facing behavior, setup, or maintenance. A changelog must be a curated, chronologically ordered list of notable changes for each version of the project.

# Steps

## 1. Gather Context
- Retrieve the pull request title, description, and diff.
- Identify:
  - Files changed
  - Nature of changes (new features, functionality changes, bug fixes, security)

## 2. Classify Changes
Determine what PR changes can be classified in the following types:
- Added: for new features.
- Changed: for changes in existing functionality.
- Deprecated: for soon-to-be removed features.
- Removed: for removed features.
- Fixed: for any bug fixes.
- Security: in case of vulnerabilities.

If NONE of the above → Do nothing
Do not update the changelog for internal-only changes with no user-facing impact, such as CI updates, internal refactors, tests, automation changes, or technical renames.

## 3. Read previous Change Log
- Open CHANGELOG.md
- Identify version patterns:
  - Date format
  - md file structure
  - Version control labels

## 4. Decide Action

### Case A — No Update Needed
- DO NOT DO ANYTHING. STOP!

### Case B — Update Needed
- Proceed to suggest a changelog update with the incoming changes.

## 5. Generate Suggested Changes

Create a minimal patch that:

- Preserves tone and structure
- Matches existing formatting and next version number
- Adds changes above the latest change version
- Avoids duplication

Format according to changelog guidelines (adapt to project pattern):

```
## [x.x.x] - yyyy-mm-dd
### type of change (Added, Changed, Deprecated, Removed, Fixed, Security)
- change1
- change2

### type of change...
```

## 7. Post Suggestion for Human Review

Create a PR comment with:

Structure:

- Title - "### ✏️ Suggested Changelog Update (Review Required)"
- Summary
    - Why Changelog needs updating
    - What changed in the PR that triggered it
- Proposed Patch
    - Include the diff block
- Explicit Review Request - "Please review and apply this change if it looks correct."

# Guardrails
- Never hallucinate features not present in diff
- Do not remove unrelated content from previous changes
- Keep edits minimal and precise
- If uncertain → ask for human review instead of editing

# Output
- Either:
  - No-op + explanation
  - OR a patch to CHANGELOG.md + explanation comment
