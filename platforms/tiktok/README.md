# TikTok platform declaration

Unreleased M1 candidate `0.1.0-m1.0`. This package declares the selected TikTok Web profile-observation capability; it contains no executable workflow or service credentials. The Provider owns its instructions and required host permissions. The initial slice does not install BackStage or iOS Providers. Add capabilities through an explicitly reviewed platform version.

Profile recording is listed as **pending**, because its neutral destination connection and direct Skill invocation are not yet accepted. It is not an installable workflow in this candidate. Runtime setup may select this platform without selecting a business Skill, allowing M1 to be tried separately from M2/M3. Installing the package does not contact TikTok or establish service access.

Database and storage Providers are chosen independently from the catalog. Their configuration and permission checks belong to the Providers; a recorded reference does not establish a verified connection. Available Skill packages are metadata choices, not mandatory dependencies.

Source owner: `flair-agency/live-agency`, `platforms/tiktok`. Package publication is separate from source integration and keeps the approved initial private registry visibility. No new repository or package visibility change is implied.
