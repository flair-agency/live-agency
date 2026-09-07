# Backup hardening workflow design

Status: agreed design for optional complete-attachment recovery; not a prerequisite for ordinary Base-only backup. Existing Skill reference contracts own execution details.

## 1. Problem statement

The verified native Base export remains the authoritative artifact for the
reviewed Base structure and record-data recovery scope. The completed isolated
drill proved that its attachment option does not restore attachment blobs.
Attachment recovery must therefore be represented by a separate artifact and
receipt rather than by broadening the meaning of an existing version 1 Base
backup receipt.

The current Lark and storage Bindings also remain `unattended: false`. Passing
synthetic tests does not prove that an authenticated production route can run
without a prompt, challenge, route switch, permission drift, or uncertain
write. Finally, a destination name and successful upload do not prove that the
active Principal has least-privilege access to the exact protected folders.

## 2. Responsibility boundaries

The public Skills own only source-neutral validation, readiness assessment,
review gates, and content-bound normalized receipts. They contain no
organization identifiers, Base/table/record/field IDs, file tokens, URLs,
screen structure, credentials, or source data.

The private Lark Base Provider owns complete attachment enumeration, byte
acquisition, source-reference validation, and the owner-only attachment
manifest. Its normalized output exposes only logical aliases, counts, and
SHA-256 values.

The private storage Provider owns exact destination routing, complete artifact
readback, attachment receipt creation, and permission inspection. The
owner-only counterpart retains storage object and Principal details.

Production artifacts, manifests, attestations, receipts, restored data, and
credentials remain outside Git. Checked-in tests use only synthetic values.

## 3. Attachment recovery set

An attachment recovery set contains two independently verified artifacts:

1. one existing version 1 `full-base-export` receipt for Base structure and
   record data; and
2. one version 1 `attachment-set` receipt bound to that exact Base receipt,
   schema fingerprint, complete attachment manifest, and restore-mapping
   contract.

The private attachment manifest records one exact source location and one
restore record key for every attachment reference. Blob storage is
content-addressed so repeated references to identical bytes are stored once.
Coverage requires zero unavailable or ambiguous references and exact complete
readback of the packaged attachment set.

Enumeration and native Base export are not atomic. The receipt therefore
records `consistency_model=bounded-non-atomic`; it must not claim a single
transactional snapshot. The private route records its scan bounds and stops on
detected source drift.

## 4. Composite recovery drill

A version 2 composite drill preflight binds the exact Base receipt, attachment
receipt, schema, source manifest, mapping contract, isolated destination, and
both restore routes. A successful composite receipt requires:

- matched Base schema and per-table record counts;
- matched attachment manifest and restore mapping;
- exact expected and actual attachment-reference and unique-blob counts;
- attachment content readback matching the stored hashes; and
- separately approved and verified cleanup.

The existing version 1 Base-only drill receipt remains valid for its narrower
scope. It does not imply attachment recoverability.

## 5. Unattended readiness

Unattended activation requires three independently content-bound evidence
groups:

- a candidate source route bound to one exact Base with read authority only;
- a candidate storage route bound to one exact destination with create, list,
  and readback authority but no sharing, move, delete, or restore authority;
- one completed unattended rehearsal proving exact coverage recheck, complete
  acquisition, complete storage readback, no prompts or authentication
  challenges, no route switch, no forbidden mutation, and no uncertain write.

The storage permission attestation must come from Provider readback, match the
candidate storage profile, be unexpired, confirm disabled link sharing, and
report no external or unreviewed Principal.

Even complete evidence returns only
`ready-for-explicit-activation-review`. It never activates a Binding, changes a
schedule, or authorizes a backup write.


Historical synthetic stages and operational gaps: [Runtime evidence](../../../runtime/docs/archive/backup-hardening-evidence.md).
