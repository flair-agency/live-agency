# Private Source Integration Guide

## Purpose

Clearly separate publicly distributable Skills from non-public information when handling data obtained from business portals requiring authentication or services whose contractual publication scope is unclear (for example, TikTok LIVE BackStage).

## Basic principles

1. Do not make public Skills depend on a specific service's screens, URLs, or export formats.
2. Public Skills process only normalized common input formats.
3. Manage source-service-specific schemas, column names, screen structures, and parsing rules in non-public source profiles.
4. Do not include real data, screenshots, creator information, or credentials in repositories.
5. Do not guess an unknown schema and perform updates. If identification, conversion, or matching fails, stop without updating.

## Separation of responsibilities

### Public Skills

Public Skills are responsible for:

- Validating the common input format
- Uniquely matching the target month and account
- Producing differences and dry runs
- Restricting update targets and update authority
- Performing updates through APIs
- Verifying updates by reading the data back
- Outputting audit results

Public Skills must not contain:

- Source-service URLs
- Screen names, tab names, or DOM structures
- Specific column names from export files
- Regular expressions specific to the source service
- Procedures for operating authenticated screens
- Actual export files or table data

### Non-public source profiles

Non-public source profiles are responsible for:

- Identifying input formats
- Defining required columns and required metadata
- Mapping source fields to common fields
- Normalizing Markdown, HTML, numbers, and time representations
- File-name and header fingerprints
- Detecting schema changes
- Versioning profiles

Do not execute arbitrary code from configuration. Compose transformations from approved generic operations implemented on the public side.

### Real-data storage

Store original exports and audit data in access-restricted storage such as Google Drive.

Do not manage them in Git repositories.

## Common input format

Normalize input passed to public Skills into a service-independent format.

```json
{
  "month": "YYYY-MM",
  "source_updated_at": "timestamp",
  "row_count": 0,
  "creators": [
    {
      "account": "creator",
      "diamonds": 0,
      "valid_live_days": 0,
      "live_minutes": 0
    }
  ]
}
```

Retain the following for auditing as needed:

- Source type
- Source profile ID
- Profile version
- Input file name
- Input hash
- Whether values are provisional or final

Keep these separate from the business fields being synchronized.

## Operating source profiles

Assign each profile a unique ID and version.

When a schema changes, add a new version instead of overwriting the existing version.

Stop if profile selection matches zero or multiple profiles. Do not guess and use a similar profile.

Use only fictitious accounts and synthetic data in tests.

## Manual input

Even when the current month's data is pasted into a prompt, do not add source-service-specific parsing rules to public Skills.

Normalize the table with a non-public source profile, then pass it to the public Skill in the common input format.

Do not update if the target month, target scope, total record count, or update time cannot be confirmed.

## Browser integration

Operating authenticated business portals is not a responsibility of public Skills.

When necessary, separate it into non-public, local acquisition processing and define explicit permission, stopping conditions, and handling of authentication and CAPTCHAs.

Do not treat acquisition processing and applying its results to an external system as the same authority.

## Credentials

Obtain API keys, App Secrets, access tokens, and similar credentials from the keychain or the execution environment's secret-management facility.

Do not record their values in Skills, configuration files, input data, audit logs, or Git history.

## Safety conditions for updates

- Always perform a dry run first
- Use immutable IDs for matching wherever possible
- Identify fields by ID, not display name
- Do not automatically create records that do not match
- Do not change out-of-scope fields
- Create or delete records only with separately explicit authority
- After updates, verify by reading back through the API
- Do not immediately resend when the communication outcome is unknown

## Review checklist

Check the following before publishing or updating a Skill:

- Whether any service-specific URLs or screen structures remain
- Whether any specific column names or export schemas remain
- Whether tests contain real accounts or real data
- Whether secret values or internal identifiers have entered Git history
- Whether processing stops without guessing on a schema mismatch
- Whether dry runs and readback verification are present
- Whether creation, deletion, or out-of-scope updates are implicitly permitted
