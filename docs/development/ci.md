# CI read access

The parent CI checks out the pinned composition, installs the development lockfile
with lifecycle scripts disabled, runs the full test runner, and checks public content.
It requires two repository Actions secrets, configured in Settings > Secrets and
variables > Actions. Never place their values in Git, issues or chat.

- CI_SOURCE_READ_TOKEN: a fine-grained GitHub token for resource owner
  flair-agency, with repository Contents: read access to the parent and every
  private component repository listed in .gitmodules. Select those repositories
  explicitly; no write permission is required. Organization approval may be required.
- CI_PACKAGES_READ_TOKEN: a classic GitHub token with read:packages, belonging to
  an account allowed to read creator-monthly-activity-reconcile and
  lark-base-provider in GitHub Packages. Authorize organization SSO if required.
  The current lockfile needs monthly activity 1.0.0 and Lark Provider 1.0.0/1.1.0.

Use dedicated expiring credentials. The source token is supplied only to checkout,
which does not persist it. The package token is supplied only to npm ci. Tests do
not receive either secret through their environment. Do not add pull_request_target
or expose these secrets to untrusted forks; fork PRs need a trusted review path.

After registration, rerun CI on the reviewed work branch. Missing credentials must
fail CI rather than skip checkout or tests. Source access does not imply package
access. A local cached installation does not prove CI registry access.

Rollback: revert the CI configuration change and remove its dedicated secrets.
This workflow does not publish packages or activate production services.
