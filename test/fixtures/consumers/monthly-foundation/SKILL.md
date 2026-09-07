---
name: monthly-foundation-driver
description: Exercise the explicitly selected synthetic development installation of LIVE Agency Runtime.
---

Run the installed `live-agency monthly-activity` executable with explicit `--root`,
`--configuration`, `--request` and `--state-dir` paths. Private JSON inputs have mode 0600.
Review the returned normalized dry-run plan. For the synthetic destination only, provide
that exact plan using `--approved-plan` and the matching synthetic selection approval
using `--authorization` to exercise apply and readback. Do not select real services.
For interaction-required, supply the synthetic result with unchanged request identity
and context through `--resume`. A consumed request cannot be replayed.
