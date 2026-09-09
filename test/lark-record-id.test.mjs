import assert from "node:assert/strict";
import test from "node:test";

import { isRecordId as isInsightRecordId } from "../skills/live-agency-creator-assessment-update/scripts/insight_sync_core.mjs";
import { isRecordId as isLiveRecordId } from "../skills/live-agency-creator-live-observation-record/scripts/live_history_sync_core.mjs";
import { isRecordId as isMetricCompactionRecordId } from "../skills/live-agency-creator-live-metric-history-prune/scripts/lark_live_metrics_compact.mjs";
import { isRecordId as isProfileCompactionRecordId } from "../skills/live-agency-creator-profile-history-prune/scripts/lark_profile_compact.mjs";
import { isRecordId as isProfileRecordId } from "../skills/live-agency-creator-profile-record/scripts/profile_sync_core.mjs";

test("current and legacy Lark record IDs are accepted consistently", () => {
  const validators = [
    isInsightRecordId,
    isLiveRecordId,
    isMetricCompactionRecordId,
    isProfileCompactionRecordId,
    isProfileRecordId,
  ];
  for (const validator of validators) {
    assert.equal(validator("recYyFHagy"), true);
    assert.equal(validator("recv3LTUOVCCpf"), true);
    assert.equal(validator("rec-short"), false);
    assert.equal(validator("tblYyFHagy"), false);
  }
});
