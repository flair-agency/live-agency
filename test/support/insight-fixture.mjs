import assert from "node:assert/strict";
import { INSIGHT_PROPOSAL_KIND, INSIGHT_RULE_VERSION } from "../../skills/live-agency-creator-assessment-update/scripts/insight_sync_core.mjs";
const NOW = Date.parse("2030-01-31T03:04:05.000Z");
const CREATOR_ID = "recCreator0001";
const PROFILE_ID = "recProfile0001";
const METRIC_ID = "recMetric00001";

const config = {
  appToken: "app",
  creatorTableId: "creator-table",
  profileTableId: "profile-table",
  metricTableId: "metric-table",
  tagTableId: "tag-table",
  insightViewId: "due-view",
  fieldIds: {
    creatorAccount: "fldCreatorAccount",
    creatorInsight: "fldCreatorInsight",
    creatorTraits: "fldCreatorTraits",
    profileTimestamp: "fldProfileTimestamp",
    profileCreator: "fldProfileCreator",
    profileFeatureObservationData: "fldProfileFeatures",
    metricTimestamp: "fldMetricTimestamp",
    metricCreator: "fldMetricCreator",
    metricFanClub: "fldMetricFanClub",
    metricLatestLiveAt: "fldMetricLatest",
    metricLiveDays30d: "fldMetricDays",
    metricLiveHours30d: "fldMetricHours",
    metricLikes30d: "fldMetricLikes",
    tagVocabulary: "fldTagVocabulary",
  },
  apiOrigin: "https://example.invalid",
};

function options(names = ["交流志向", "継続型"]) {
  return names.map((name, index) => ({ id: `opt${index}`, name }));
}

function fieldDefinitions(tagOptions = options()) {
  return {
    creator: [
      { field_id: "fldCreatorAccount", field_name: "Renamed Account", ui_type: "Url" },
      { field_id: "fldCreatorInsight", field_name: "Renamed Insight", ui_type: "Text" },
      {
        field_id: "fldCreatorTraits",
        field_name: "Renamed Traits",
        ui_type: "MultiSelect",
        property: { options: options() },
      },
    ],
    profile: [
      { field_id: "fldProfileTimestamp", field_name: "Renamed Profile Time", ui_type: "DateTime" },
      {
        field_id: "fldProfileCreator",
        field_name: "Renamed Profile Creator",
        ui_type: "DuplexLink",
        property: { table_id: "creator-table", multiple: false },
      },
      { field_id: "fldProfileFeatures", field_name: "Renamed Features", ui_type: "Text" },
    ],
    metric: [
      { field_id: "fldMetricTimestamp", field_name: "Renamed Metric Time", ui_type: "DateTime" },
      {
        field_id: "fldMetricCreator",
        field_name: "Renamed Metric Creator",
        ui_type: "DuplexLink",
        property: { table_id: "creator-table", multiple: false },
      },
      { field_id: "fldMetricFanClub", field_name: "Renamed Fan Club", ui_type: "Number" },
      { field_id: "fldMetricLatest", field_name: "Renamed Latest LIVE", ui_type: "DateTime" },
      { field_id: "fldMetricDays", field_name: "Renamed LIVE Days", ui_type: "Number" },
      { field_id: "fldMetricHours", field_name: "Renamed LIVE Hours", ui_type: "Number" },
      { field_id: "fldMetricLikes", field_name: "Renamed Likes", ui_type: "Number" },
    ],
    tags: [{
      field_id: "fldTagVocabulary",
      field_name: "Renamed Tag Vocabulary",
      ui_type: "MultiSelect",
      property: { options: tagOptions },
    }],
  };
}

function fakeClient({ tagOptions = options() } = {}) {
  const fields = fieldDefinitions(tagOptions);
  const creators = [{
    record_id: CREATOR_ID,
    fields: {
      "Renamed Account": { text: "@Synthetic.Creator" },
      "Renamed Insight": "以前の所見",
      "Renamed Traits": ["交流志向"],
    },
  }];
  const profiles = [
    {
      record_id: "recProfileBlank1",
      fields: {
        "Renamed Profile Time": Date.parse("2030-01-30T00:00:00.000Z"),
        "Renamed Profile Creator": [CREATOR_ID],
        "Renamed Features": "",
      },
    },
    {
      record_id: PROFILE_ID,
      fields: {
        "Renamed Profile Time": Date.parse("2030-01-29T00:00:00.000Z"),
        "Renamed Profile Creator": [CREATOR_ID],
        "Renamed Features": JSON.stringify({
          schema_version: 1,
          bio: "視聴者との会話を大切にしています",
          recent_posts: [{ caption: "今夜も配信" }],
        }),
      },
    },
  ];
  const metrics = [{
    record_id: METRIC_ID,
    fields: {
      "Renamed Metric Time": Date.parse("2030-01-30T12:00:00.000Z"),
      "Renamed Metric Creator": [CREATOR_ID],
      "Renamed Fan Club": 25,
      "Renamed Latest LIVE": Date.parse("2030-01-30T10:00:00.000Z"),
      "Renamed LIVE Days": 12,
      "Renamed LIVE Hours": 30.5,
      "Renamed Likes": 12345,
    },
  }];
  const tableRecords = {
    "creator-table": creators,
    "profile-table": profiles,
    "metric-table": metrics,
  };
  const tableFields = {
    "creator-table": fields.creator,
    "profile-table": fields.profile,
    "metric-table": fields.metric,
    "tag-table": fields.tags,
  };
  return {
    legacyV1Rollback: true,
    creators,
    updates: [],
    async listFields(_appToken, tableId) {
      return structuredClone(tableFields[tableId]);
    },
    async listRecords(_appToken, tableId) {
      return structuredClone(tableRecords[tableId]);
    },
    async batchUpdate(_appToken, tableId, records) {
      assert.equal(tableId, "creator-table");
      for (const update of records) {
        const record = creators.find((item) => item.record_id === update.record_id);
        assert.ok(record);
        Object.assign(record.fields, structuredClone(update.fields));
        this.updates.push(structuredClone(update));
      }
    },
  };
}

function proposalsFor(context, overrides = {}) {
  return {
    version: 1,
    inputKind: INSIGHT_PROPOSAL_KIND,
    ruleVersion: INSIGHT_RULE_VERSION,
    contextSha256: context.contextSha256,
    generatedAt: new Date(NOW).toISOString(),
    rowCount: 1,
    proposals: [{
      creatorRecordId: CREATOR_ID,
      status: "proposed",
      insight: "視聴者との会話を明示的に大切にし、直近30日も継続的に配信している。",
      traits: ["交流志向", "継続型"],
      evidence: {
        profileRecordId: PROFILE_ID,
        liveMetricRecordId: METRIC_ID,
        profilePaths: ["/bio"],
        liveMetricFields: ["liveDays30d", "liveHours30d"],
        confidence: "high",
      },
      ...overrides,
    }],
  };
}


export { NOW, CREATOR_ID, PROFILE_ID, METRIC_ID, config, fieldDefinitions, options, fakeClient, proposalsFor };
