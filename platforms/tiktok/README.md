# TikTok platform declaration

Privately published and adopted platform `0.1.0-m3.4`. This package declares the selected
TikTok Web 1.1.1 profile-observation capability and its approved avatar acquisition correction; it contains no executable workflow
or credentials. The Provider owns its instructions and required host permissions.
BackStage and iOS Providers remain outside this selected slice.

Profile recording is an **available installation choice** at fixed version
`2.0.0-m3.4`. It requires observation, datastore read and datastore write
capabilities. Runtime setup refuses a selected Skill when any required binding
is absent. The user invokes the installed Skill; Runtime does not launch it.
Selecting the platform without a Skill remains supported. Installation alone
does not contact TikTok or establish business acceptance. See the
[current deployment and recovery record](../../docs/migration/status.md#profile-due-view-verification-release-adopted--2026-09-13)
for the adopted generation and successful Work read-only verification.

Database and storage Providers are chosen independently from the catalog. Their configuration and permission checks belong to the Providers; a recorded reference does not establish a verified connection. Available Skill packages are metadata choices, not mandatory dependencies.

Source owner: `flair-agency/live-agency`, `platforms/tiktok`. Package publication is separate from source integration and keeps the approved initial private registry visibility. No new repository or package visibility change is implied.
