import assert from "node:assert/strict";
import test from "node:test";

import {
  createLarkChatApiAdapter,
  createLarkChatSelectedConversationMessagesAdapter,
  createLarkChatBrowserAdapter,
  createLarkChatReadProvider,
  LARK_CHAT_API_OPERATIONS,
  resolveLarkChatProfileBundle,
} from "../providers/lark-chat/src/index.js";
import {
  createLarkSelectedApiTransport,
  resolveLarkApiSelection,
} from "@flair-agency/lark-transport";
import {
  finalizeConversationMessageObservation,
  hashConversationMessageRequest,
} from "../mcp/operations/src/conversation-message-contracts.mjs";
import {
  expected,
  profileBundle,
  resourceId,
} from "../providers/lark-chat/test-support/profile-fixture.js";

const baseRequest = {
  contractVersion: 1,
  requestId: "00000000-0000-4000-8000-000000000010",
  sourceConversationRef: "synthetic-chat-one",
  conversationKind: "group",
  requestedWindow: {
    startAt: "2030-01-01T00:00:00.000Z",
    endAt: "2030-01-02T00:00:00.000Z",
  },
  messageScope: "content",
  attachmentScope: "metadata",
  threadExpansion: "all-discovered",
  routeId: null,
  bounds: {
    pageSize: 50,
    maxMainPages: 3,
    maxThreadPagesPerThread: 2,
    maxMessages: 10,
    maxRequests: 10,
  },
};

const runtimeClaims = {
  tenantDomain: "synthetic.example",
  tenantId: "tenant-synthetic",
  userId: "synthetic-user",
  service: "lark-chat",
  resourceId,
  authority: "read",
  principalScope: "creator-networks-chat-read",
  visibleDataScope: "synthetic-browser/v1",
  sessionState: "authenticated",
  interactionPolicy: "read-only",
  structureVersion: "synthetic-browser/v1",
};

function selectedChatInput(mode = "tenant") {
  const organizationProfile = {
    contractVersion: "lark-profiles/v2",
    organizationProfileId: "synthetic-org",
    organizationKey: "synthetic",
    activationStatus: "active",
    claims: {
      tenantDomain: { evidenceState: "verified", value: "synthetic.example" },
      tenantId: { evidenceState: "verified", value: "synthetic-tenant" },
      corporateDetails: { evidenceState: "unknown", value: null },
      subscriptionDetails: { evidenceState: "unknown", value: null },
      memberDetails: { evidenceState: "unknown", value: null },
    },
  };
  const principal = mode === "tenant" ? {
    contractVersion: "lark-profiles/v2",
    principalProfileId: "synthetic-tenant-actor",
    organizationProfileId: "synthetic-org",
    activationStatus: "active",
    principalType: "api-app",
    credentialRef: "env:SYNTHETIC_CHAT_APP",
    appIdSha256: "a".repeat(64),
    appIdEvidence: { evidenceState: "verified", value: "synthetic-app" },
  } : {
    contractVersion: "lark-profiles/v2",
    principalProfileId: "synthetic-user-actor",
    organizationProfileId: "synthetic-org",
    activationStatus: "active",
    principalType: "api-user",
    authorizationRef: "lark-cli:synthetic-user",
    appIdSha256: "a".repeat(64),
    appIdEvidence: { evidenceState: "verified", value: "synthetic-app" },
    runtimeUserId: { evidenceState: "verified", value: "synthetic-user" },
    requiredScopes: ["im:message:readonly"],
  };
  const instanceProfile = {
    contractVersion: "lark-profiles/v2",
    profileId: "synthetic-chat-selected-read",
    organizationProfileId: "synthetic-org",
    service: "lark-chat",
    domain: "agency-intelligence",
    authority: "read",
    activationStatus: "active",
    primaryRouteId: "selected-api",
    allowedOperations: ["conversation-messages:read"],
    routes: [{
      routeId: "selected-api",
      principalProfileId: principal.principalProfileId,
      transport: "api",
      organizationProfileId: "synthetic-org",
      service: "lark-chat",
      domain: "agency-intelligence",
      authority: "read",
      resourceId: "chat-allowlist-sha256:synthetic",
      principalScope: "synthetic-chat-read",
      visibleDataScope: "synthetic-chat/v1",
    }],
  };
  return {
    organizationProfile,
    principalProfiles: [principal],
    instanceProfile,
    expected: {
      profileId: instanceProfile.profileId,
      organizationProfileId: instanceProfile.organizationProfileId,
      service: instanceProfile.service,
      domain: instanceProfile.domain,
      authority: instanceProfile.authority,
    },
    operationContracts: LARK_CHAT_API_OPERATIONS,
    operationIds: ["conversation-messages:read"],
  };
}

test("M2U selected Chat operation contract contains only the reviewed Tenant main-message read", () => {
  assert.deepEqual(
    LARK_CHAT_API_OPERATIONS.map((operation) => operation.operationId),
    ["conversation-messages:read"],
  );
  assert.deepEqual(
    LARK_CHAT_API_OPERATIONS[0].supportedTokenTypes,
    ["tenant"],
  );
});

function selectedChatTransport(selection, requests, { respond } = {}) {
  return createLarkSelectedApiTransport({
    selection,
    now: () => 1_000_000,
    delay: async () => {},
    tokenProvider: async () => ({ token: "synthetic-selected-token", tokenType: "tenant", expiresAt: 2_000_000 }),
    verifyTokenIdentity: async () => ({
      verified: true,
      tokenType: "tenant",
      appIdSha256: selection.binding.appIdSha256,
      userId: null,
      tenantId: "synthetic-tenant",
      tenantDomain: "synthetic.example",
      grantedScopes: ["im:message:readonly"],
    }),
    authorizeRequest: ({ query }) => query.container_id === "synthetic-chat-one" &&
      query.container_id_type === "chat" && query.sort_type === "ByCreateTimeAsc" &&
      Object.keys(query).every((key) => ["container_id_type", "container_id", "start_time", "end_time", "sort_type", "page_size", "page_token"].includes(key)),
    fetchImpl: async (url, options) => {
      requests.push({ url: String(url), options });
      const supplied = respond?.({ url: String(url), options, requestCount: requests.length });
      if (supplied instanceof Response) return supplied;
      return new Response(JSON.stringify(supplied ?? {
        code: 0,
        data: {
          items: [{
            message_id: "selected-api-root",
            msg_type: "text",
            create_time: "1893459600",
            update_time: "1893459600",
            deleted: false,
            updated: false,
            sender: { id: "synthetic-sender", sender_type: "user", name: "Synthetic User" },
            body: { content: JSON.stringify({ text: "Synthetic selected transport content" }) },
            mentions: [],
            thread_id: null,
            root_id: null,
            parent_id: null,
          }],
          has_more: false,
          page_token: null,
        },
      }));
    },
  });
}

function selectedApiMessage(messageId, content = JSON.stringify({ text: "Synthetic page content" })) {
  return {
    message_id: messageId,
    msg_type: "text",
    create_time: "1893459600",
    update_time: "1893459600",
    deleted: false,
    updated: false,
    sender: { id: "synthetic-sender", sender_type: "user", name: "Synthetic User" },
    body: { content },
    mentions: [],
    thread_id: null,
    root_id: null,
    parent_id: null,
  };
}

function textMessage({
  id,
  text,
  createdAt,
  threadRef = null,
  rootRef = null,
  parentRef = null,
  edited = false,
  updatedAt = null,
} = {}) {
  return {
    sourceMessageRef: id,
    createdAt,
    updatedAt,
    state: { lifecycle: "active", edited },
    sender: {
      sourceSenderRef: "synthetic-sender",
      senderType: "user",
      displayName: "Synthetic User",
    },
    messageType: "text",
    content: {
      status: "observed",
      mediaType: "text/plain",
      text,
      structuredSha256: null,
    },
    thread: {
      sourceThreadRef: threadRef,
      sourceRootMessageRef: rootRef,
      sourceParentMessageRef: parentRef,
    },
    mentions: [],
    attachments: [],
    unavailableFields: [],
  };
}

function browserEnvelope(page, overrides = {}) {
  return {
    sessionState: "authenticated",
    interactionPolicy: "read-only",
    structureVersion: "synthetic-browser/v1",
    loadingComplete: true,
    page,
    ...overrides,
  };
}

function createBrowserFixture({ conflictingDuplicate = false } = {}) {
  let mainCalls = 0;
  let threadCalls = 0;
  const root = textMessage({
    id: "message-root",
    text: "Synthetic root",
    createdAt: "2030-01-01T01:00:00.000Z",
    threadRef: "thread-one",
    rootRef: "message-root",
  });
  const reader = {
    async readMainPage({ cursor }) {
      mainCalls += 1;
      if (cursor === null) {
        return browserEnvelope({ messages: [root], hasMore: true, nextCursor: "main-two" });
      }
      return browserEnvelope({
        messages: [
          conflictingDuplicate
            ? { ...root, content: { ...root.content, text: "Conflicting value" } }
            : {
              sourceMessageRef: "message-file",
              createdAt: "2030-01-01T01:02:00.000Z",
              updatedAt: null,
              state: { lifecycle: "recalled", edited: false },
              sender: { sourceSenderRef: null, senderType: "system", displayName: null },
              messageType: "file",
              content: {
                status: "unavailable",
                mediaType: null,
                text: null,
                structuredSha256: null,
              },
              thread: {
                sourceThreadRef: null,
                sourceRootMessageRef: null,
                sourceParentMessageRef: null,
              },
              mentions: [],
              attachments: [{
                sourceAttachmentRef: "attachment-file",
                kind: "file",
                displayName: "synthetic.txt",
                metadataStatus: "observed",
                contentStatus: "not-requested",
                mediaType: null,
                sizeBytes: null,
                sha256: null,
              }],
              unavailableFields: [],
            },
        ],
        hasMore: false,
        nextCursor: null,
      });
    },
    async readThreadPage({ sourceThreadRef }) {
      threadCalls += 1;
      assert.equal(sourceThreadRef, "thread-one");
      return browserEnvelope({
        messages: [textMessage({
          id: "message-reply",
          text: "Synthetic reply",
          createdAt: "2030-01-01T01:05:00.000Z",
          threadRef: "thread-one",
          rootRef: "message-root",
          parentRef: "message-root",
          edited: true,
          updatedAt: "2030-01-01T01:06:00.000Z",
        })],
        hasMore: false,
        nextCursor: null,
      });
    },
  };
  return { reader, counts: () => ({ mainCalls, threadCalls }) };
}

function browserProvider(fixture = createBrowserFixture()) {
  const resolution = resolveLarkChatProfileBundle(profileBundle(), expected);
  const adapter = createLarkChatBrowserAdapter({
    reader: fixture.reader,
    structureVersion: "synthetic-browser/v1",
  });
  return {
    fixture,
    provider: createLarkChatReadProvider({
      resolution,
      adapters: { browser: adapter },
      now: () => "2030-01-02T03:04:05.000Z",
      observationIdFactory: () => "00000000-0000-4000-8000-000000000011",
    }),
  };
}

test("reads a complete browser-primary observation without an API route", async () => {
  const { provider, fixture } = browserProvider();
  assert.deepEqual(Object.keys(provider), ["readConversation"]);
  const draft = await provider.readConversation(baseRequest, { runtimeClaims });
  const observation = finalizeConversationMessageObservation(draft);
  assert.equal(observation.audit.route.transport, "browser");
  assert.equal(observation.audit.interaction, "interactive");
  assert.equal(observation.informationQuality.grade, "B");
  assert.equal(observation.informationQuality.basis, "authenticated-browser-render");
  assert.equal(observation.informationQuality.attachmentContent, "out-of-scope");
  assert.equal(observation.coverage.status, "complete");
  assert.equal(observation.coverage.mainPagesRead, 2);
  assert.equal(observation.coverage.threadPagesRead, 1);
  assert.equal(observation.coverage.messageCount, 3);
  assert.equal(observation.coverage.completedThreadCount, 1);
  assert.equal(observation.messages[1].state.lifecycle, "recalled");
  assert.equal(observation.messages[1].attachments[0].contentStatus, "not-requested");
  assert.equal(observation.messages[2].state.edited, true);
  assert.deepEqual(fixture.counts(), { mainCalls: 2, threadCalls: 1 });
  assert.equal(
    observation.audit.requestSha256,
    hashConversationMessageRequest({ ...baseRequest, routeId: "browser" }),
  );
});

test("stops before acquisition on allowlist, session, tenant, structure, or policy drift", async () => {
  for (const [request, claims, expectedCode] of [
    [{ ...baseRequest, sourceConversationRef: "not-allowlisted" }, runtimeClaims, "CHAT_NOT_ALLOWLISTED"],
    [baseRequest, { ...runtimeClaims, sessionState: "challenge" }, "CHAT_BROWSER_SESSION_UNVERIFIED"],
    [baseRequest, { ...runtimeClaims, tenantId: "wrong-tenant" }, "CHAT_BROWSER_PRINCIPAL_MISMATCH"],
    [baseRequest, { ...runtimeClaims, structureVersion: "unknown" }, "CHAT_BROWSER_STRUCTURE_UNKNOWN"],
    [baseRequest, { ...runtimeClaims, interactionPolicy: "read-write" }, "CHAT_MUTATION_NOT_ALLOWED"],
  ]) {
    const { provider, fixture } = browserProvider();
    await assert.rejects(
      provider.readConversation(request, { runtimeClaims: claims }),
      (error) => error.code === expectedCode,
    );
    assert.deepEqual(fixture.counts(), { mainCalls: 0, threadCalls: 0 });
  }
});

test("stops before acquisition when a request exceeds the profile content scope", async () => {
  for (const [resourcePatch, requestPatch, expectedCode] of [
    [{ messageScope: "metadata" }, {}, "CHAT_PERMISSION_DENIED"],
    [{ attachmentScope: "none" }, {}, "CHAT_ATTACHMENT_SCOPE_DENIED"],
  ]) {
    const bundle = profileBundle();
    bundle.instanceProfiles[0].resource = {
      ...bundle.instanceProfiles[0].resource,
      ...resourcePatch,
    };
    const resolution = resolveLarkChatProfileBundle(bundle, expected);
    const fixture = createBrowserFixture();
    const provider = createLarkChatReadProvider({
      resolution,
      adapters: {
        browser: createLarkChatBrowserAdapter({
          reader: fixture.reader,
          structureVersion: "synthetic-browser/v1",
        }),
      },
    });
    await assert.rejects(
      provider.readConversation({ ...baseRequest, ...requestPatch }, { runtimeClaims }),
      (error) => error.code === expectedCode,
    );
    assert.deepEqual(fixture.counts(), { mainCalls: 0, threadCalls: 0 });
  }
});

test("preserves bounded pagination without exposing a raw cursor", async () => {
  const { provider } = browserProvider();
  const draft = await provider.readConversation({
    ...baseRequest,
    threadExpansion: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1 },
  }, { runtimeClaims });
  const observation = finalizeConversationMessageObservation(draft);
  assert.equal(observation.coverage.status, "partial");
  assert.deepEqual(observation.coverage.boundedBy, ["main-page-cap"]);
  assert.match(observation.coverage.continuationRef, /^owner-only-sha256:[0-9a-f]{64}$/);
  assert.equal(observation.coverage.continuationRef.includes("main-two"), false);
});

test("rejects conflicting duplicate messages and incomplete browser loading", async () => {
  const conflict = browserProvider(createBrowserFixture({ conflictingDuplicate: true }));
  await assert.rejects(
    conflict.provider.readConversation({ ...baseRequest, threadExpansion: "none" }, { runtimeClaims }),
    (error) => error.code === "CHAT_MESSAGE_DUPLICATE_CONFLICT",
  );

  const loading = createBrowserFixture();
  const original = loading.reader.readMainPage;
  loading.reader.readMainPage = async (input) => ({
    ...await original(input),
    loadingComplete: false,
  });
  const incomplete = browserProvider(loading);
  await assert.rejects(
    incomplete.provider.readConversation(baseRequest, { runtimeClaims }),
    (error) => error.code === "CHAT_PAGINATION_INCOMPLETE",
  );
});

test("API adapter exposes only bounded GET message-list operations", async () => {
  const calls = [];
  const transport = {
    async request(method, path, options) {
      calls.push({ method, path, options });
      return {
        code: 0,
        data: {
          items: [{
            message_id: path.includes("/threads/") ? "api-reply" : "api-root",
            msg_type: "text",
            create_time: String(Date.parse("2030-01-01T01:00:00.000Z")),
            update_time: String(Date.parse("2030-01-01T01:00:00.000Z")),
            deleted: false,
            updated: false,
            sender: { id: "api-sender", sender_type: "user", name: "Synthetic API User" },
            body: { content: JSON.stringify({ text: "Synthetic API content" }) },
            mentions: [],
            thread_id: path.includes("/threads/") ? "api-thread" : null,
            root_id: path.includes("/threads/") ? "api-root" : null,
            parent_id: path.includes("/threads/") ? "api-root" : null,
          }],
          has_more: false,
          page_token: null,
        },
      };
    },
  };
  const adapter = createLarkChatApiAdapter({ transport });
  assert.deepEqual(Object.keys(adapter), ["transport", "readMainPage", "readThreadPage"]);
  const request = { ...baseRequest, routeId: "api" };
  const main = await adapter.readMainPage({ request, cursor: null });
  const thread = await adapter.readThreadPage({
    request,
    sourceThreadRef: "api-thread",
    cursor: null,
  });
  assert.equal(main.messages[0].content.text, "Synthetic API content");
  assert.equal(thread.messages[0].thread.sourceParentMessageRef, "api-root");
  assert.equal(calls.length, 2);
  assert.equal(calls.every((call) => call.method === "GET"), true);
  assert.deepEqual(
    calls.map((call) => call.path),
    ["/open-apis/im/v1/messages", "/open-apis/im/v1/threads/api-thread/messages"],
  );
  assert.equal(calls[0].options.query.start_time, "1893456000");
  assert.equal(calls[0].options.query.end_time, "1893542400");
  assert.equal(calls[0].options.query.page_size, "50");
  assert.equal(calls[1].options.query.page_size, "50");

  const resolution = resolveLarkChatProfileBundle(
    profileBundle({ includeApi: true, primaryRouteId: "api" }),
    expected,
  );
  const provider = createLarkChatReadProvider({
    resolution,
    adapters: { api: adapter },
    now: () => "2030-01-02T03:04:05.000Z",
    observationIdFactory: () => "00000000-0000-4000-8000-000000000012",
  });
  const observation = finalizeConversationMessageObservation(
    await provider.readConversation({
      ...baseRequest,
      routeId: "api",
      threadExpansion: "none",
    }),
  );
  assert.equal(observation.informationQuality.grade, "A");
  assert.equal(observation.informationQuality.basis, "provider-api");
  assert.equal(observation.informationQuality.dimensions.coverageAssurance, "provider-pagination");
});

test("selected transport admits only the Tenant main-message read with its exact resource and bounds", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const requests = [];
  const transport = selectedChatTransport(selection, requests);
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport,
    authorizeConversation: (conversation) => conversation === "synthetic-chat-one",
    maxPageSize: 50,
    maxMainPages: 2,
    maxRequests: 2,
  });
  const request = {
    ...baseRequest,
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 2, maxRequests: 2 },
  };
  assert.deepEqual(Object.keys(adapter), ["transport", "readMainPage"]);
  const page = await adapter.readMainPage({ request, cursor: null });
  assert.equal(page.messages[0].content.text, "Synthetic selected transport content");
  assert.equal(requests.length, 1);
  const url = new URL(requests[0].url);
  assert.equal(url.pathname, "/open-apis/im/v1/messages");
  assert.deepEqual([...url.searchParams.keys()].sort(), [
    "container_id",
    "container_id_type",
    "end_time",
    "page_size",
    "sort_type",
    "start_time",
  ]);
  assert.equal(requests[0].options.method, "GET");
  assert.equal(requests[0].options.body, undefined);
  assert.equal(url.searchParams.get("page_size"), "10");
  assert.equal(transport.getAudit()[0].operationId, "conversation-messages:read");

  await assert.rejects(
    adapter.readMainPage({ request: { ...request, sourceConversationRef: "other-chat" }, cursor: null }),
    (error) => error.code === "CHAT_NOT_ALLOWLISTED",
  );
  await assert.rejects(
    adapter.readMainPage({ request: { ...request, bounds: { ...request.bounds, maxMainPages: 3 } }, cursor: null }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 1);
});

test("selected Chat read rejects User selection, actor substitution, threads, and widened pagination before transport", async () => {
  assert.throws(
    () => resolveLarkApiSelection(selectedChatInput("user")),
    (error) => error.code === "API_OPERATION_TOKEN_UNSUPPORTED",
  );
  const selection = resolveLarkApiSelection(selectedChatInput());
  assert.throws(
    () => createLarkChatSelectedConversationMessagesAdapter({
      selection,
      transport: { bindingSha256: "0".repeat(64), request: async () => null },
      authorizeConversation: () => true,
    }),
    (error) => error.code === "CHAT_API_ACTOR_SUBSTITUTION_DENIED",
  );
  const calls = [];
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: selectedChatTransport(selection, calls),
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  await assert.rejects(
    adapter.readMainPage({
      request: { ...baseRequest, routeId: "selected-api", threadExpansion: "all-discovered", attachmentScope: "none", bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 } },
      cursor: null,
    }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(calls.length, 0);
  assert.equal(adapter.readThreadPage, undefined);

  const boundedRequest = {
    ...baseRequest,
    requestId: "00000000-0000-4000-8000-000000000013",
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 },
  };
  await adapter.readMainPage({ request: boundedRequest, cursor: null });
  await assert.rejects(
    adapter.readMainPage({ request: boundedRequest, cursor: "synthetic-next" }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(calls.length, 1);
});

test("selected Chat read preserves its selected route and identity before an HTTP request", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const request = {
    ...baseRequest,
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 },
  };
  const transportCalls = [];
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: selectedChatTransport(selection, transportCalls),
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  await assert.rejects(
    adapter.readMainPage({ request: { ...request, routeId: "another-route" }, cursor: null }),
    (error) => error.code === "CHAT_API_ROUTE_MISMATCH",
  );
  assert.equal(transportCalls.length, 0);

  const identityCalls = [];
  const mismatchedIdentityTransport = createLarkSelectedApiTransport({
    selection,
    now: () => 1_000_000,
    tokenProvider: async () => ({
      token: "synthetic-selected-token",
      tokenType: "tenant",
      expiresAt: 2_000_000,
    }),
    verifyTokenIdentity: async () => ({
      verified: true,
      tokenType: "tenant",
      appIdSha256: "b".repeat(64),
      userId: null,
      tenantId: "synthetic-tenant",
      tenantDomain: "synthetic.example",
      grantedScopes: ["im:message:readonly"],
    }),
    authorizeRequest: () => true,
    fetchImpl: async () => {
      identityCalls.push("http");
      throw new Error("must not run");
    },
  });
  const identityAdapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: mismatchedIdentityTransport,
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  await assert.rejects(
    identityAdapter.readMainPage({ request, cursor: null }),
    (error) => error.code === "APP_ID_MISMATCH" && !String(error.message).includes("synthetic-selected-token"),
  );
  assert.deepEqual(identityCalls, []);
  assert.equal(JSON.stringify(mismatchedIdentityTransport.getAudit()).includes("synthetic-selected-token"), false);
});

test("selected Chat read rejects missing scope without access and audits only safe failure metadata", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const transportCalls = [];
  const transport = createLarkSelectedApiTransport({
    selection,
    now: () => 1_000_000,
    tokenProvider: async () => ({
      token: "synthetic-selected-token",
      tokenType: "tenant",
      expiresAt: 2_000_000,
    }),
    verifyTokenIdentity: async () => ({
      verified: true,
      tokenType: "tenant",
      appIdSha256: selection.binding.appIdSha256,
      userId: null,
      tenantId: "synthetic-tenant",
      tenantDomain: "synthetic.example",
      grantedScopes: [],
    }),
    authorizeRequest: () => true,
    fetchImpl: async () => {
      transportCalls.push("http");
      throw new Error("must not run");
    },
  });
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport,
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  const request = {
    ...baseRequest,
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 },
  };
  await assert.rejects(
    adapter.readMainPage({ request, cursor: null }),
    (error) => error.code === "API_SCOPE_MISSING" && !String(error.message).includes("synthetic-selected-token"),
  );
  assert.deepEqual(transportCalls, []);
  assert.deepEqual(transport.getAudit(), [{
    bindingSha256: selection.bindingSha256,
    operationId: "conversation-messages:read",
    tokenType: "tenant",
    stage: "authentication",
    result: "API_SCOPE_MISSING",
    uncertainWrite: false,
    attempt: 1,
  }]);
});

test("selected Chat read rejects spoofed actor bindings and substituted or write-capable contracts", () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  let spoofedCalls = 0;
  assert.throws(
    () => createLarkChatSelectedConversationMessagesAdapter({
      selection,
      transport: Object.freeze({
        bindingSha256: selection.bindingSha256,
        binding: Object.freeze({ ...selection.binding, principalProfileId: "substitute-actor" }),
        async request() { spoofedCalls += 1; },
      }),
      authorizeConversation: () => true,
    }),
    (error) => error.code === "CHAT_API_ACTOR_SUBSTITUTION_DENIED",
  );
  assert.equal(spoofedCalls, 0);

  const substitutedInput = selectedChatInput();
  substitutedInput.operationContracts = substitutedInput.operationContracts.map((operation) =>
    operation.operationId === "conversation-messages:read"
      ? { ...operation, scopeAlternatives: { tenant: [[]] } }
      : operation,
  );
  const substitutedSelection = resolveLarkApiSelection(substitutedInput);
  const substitutedCalls = [];
  assert.throws(
    () => createLarkChatSelectedConversationMessagesAdapter({
      selection: substitutedSelection,
      transport: selectedChatTransport(substitutedSelection, substitutedCalls),
      authorizeConversation: () => true,
    }),
    (error) => error.code === "CHAT_API_OPERATION_UNSUPPORTED",
  );
  assert.deepEqual(substitutedCalls, []);

  const writeInput = selectedChatInput();
  writeInput.instanceProfile.authority = "write";
  writeInput.instanceProfile.routes[0].authority = "write";
  writeInput.expected.authority = "write";
  writeInput.operationContracts = writeInput.operationContracts.map((operation) =>
    operation.operationId === "conversation-messages:read"
      ? { ...operation, method: "POST", effect: "write", bodyKind: "json" }
      : operation,
  );
  const writeSelection = resolveLarkApiSelection(writeInput);
  const writeCalls = [];
  assert.throws(
    () => createLarkChatSelectedConversationMessagesAdapter({
      selection: writeSelection,
      transport: selectedChatTransport(writeSelection, writeCalls),
      authorizeConversation: () => true,
    }),
    (error) => error.code === "CHAT_API_OPERATION_UNSUPPORTED",
  );
  assert.deepEqual(writeCalls, []);
});

test("selected Chat continuations are exact-request bound and reject cycles without extra access", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const requests = [];
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: selectedChatTransport(selection, requests, {
      respond: ({ requestCount }) => ({
        code: 0,
        data: {
          items: [selectedApiMessage(`page-${requestCount}`)],
          has_more: true,
          page_token: "synthetic-next",
        },
      }),
    }),
    authorizeConversation: (conversation) => conversation === "synthetic-chat-one",
    maxMainPages: 3,
    maxRequests: 3,
  });
  const request = {
    ...baseRequest,
    requestId: "00000000-0000-4000-8000-000000000014",
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 3, maxMessages: 3, maxRequests: 3 },
  };
  const first = await adapter.readMainPage({ request, cursor: null });
  assert.equal(first.nextCursor, "synthetic-next");
  await assert.rejects(
    adapter.readMainPage({ request, cursor: "forged-next" }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  await assert.rejects(
    adapter.readMainPage({
      request: {
        ...request,
        requestedWindow: { ...request.requestedWindow, endAt: "2030-01-03T00:00:00.000Z" },
      },
      cursor: "synthetic-next",
    }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 1);
  await assert.rejects(
    adapter.readMainPage({ request, cursor: "synthetic-next" }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 2);
  await assert.rejects(
    adapter.readMainPage({ request, cursor: "synthetic-next" }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 2);
});

test("selected Chat pagination rejects unbound starts and overfull pages", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const requests = [];
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: selectedChatTransport(selection, requests, {
      respond: () => ({
        code: 0,
        data: {
          items: [selectedApiMessage("overfull-one"), selectedApiMessage("overfull-two")],
          has_more: false,
          page_token: null,
        },
      }),
    }),
    authorizeConversation: () => true,
    maxPageSize: 1,
    maxMainPages: 1,
    maxRequests: 1,
  });
  const request = {
    ...baseRequest,
    requestId: "00000000-0000-4000-8000-000000000015",
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, pageSize: 1, maxMainPages: 1, maxMessages: 1, maxRequests: 1 },
  };
  await assert.rejects(
    adapter.readMainPage({ request, cursor: "unbound" }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 0);
  await assert.rejects(
    adapter.readMainPage({ request, cursor: null }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 1);
  await assert.rejects(
    adapter.readMainPage({ request, cursor: null }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(requests.length, 1);
});

test("selected Chat failures redact upstream content and reject uncertain outcomes without replay", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const secret = "synthetic-selected-token";
  const signedUrl = "https://private.example/file?signature=owner-only";
  const failedRequests = [];
  const failedTransport = selectedChatTransport(selection, failedRequests, {
    respond: () => new Response(JSON.stringify({ code: 987654, msg: `${secret} ${signedUrl}` }), { status: 503 }),
  });
  const failedAdapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: failedTransport,
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  const failedRequest = {
    ...baseRequest,
    requestId: "00000000-0000-4000-8000-000000000016",
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 },
  };
  await assert.rejects(
    failedAdapter.readMainPage({ request: failedRequest, cursor: null }),
    (error) => {
      const exposed = JSON.stringify({ code: error.code, message: error.message });
      return error.code === "API_OPERATION_FAILED" && !exposed.includes(secret) && !exposed.includes(signedUrl);
    },
  );
  assert.equal(failedRequests.length, 3);
  assert.doesNotMatch(JSON.stringify(failedTransport.getAudit()), /synthetic-selected-token|signature=|owner-only/);

  let uncertainCalls = 0;
  const uncertainTransport = Object.freeze({
    binding: selection.binding,
    bindingSha256: selection.bindingSha256,
    async request() {
      uncertainCalls += 1;
      throw Object.assign(new Error(`${secret} ${signedUrl}`), {
        code: `UNSAFE_${secret}`,
        uncertainWrite: true,
      });
    },
  });
  const uncertainAdapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport: uncertainTransport,
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  const uncertainRequest = { ...failedRequest, requestId: "00000000-0000-4000-8000-000000000017" };
  await assert.rejects(
    uncertainAdapter.readMainPage({ request: uncertainRequest, cursor: null }),
    (error) => error.code === "CHAT_API_UNCERTAIN_OUTCOME_DENIED" &&
      !error.message.includes(secret) && !error.message.includes(signedUrl),
  );
  await assert.rejects(
    uncertainAdapter.readMainPage({ request: uncertainRequest, cursor: null }),
    (error) => error.code === "CHAT_PAGINATION_WIDENING_DENIED",
  );
  assert.equal(uncertainCalls, 1);
});

test("selected Chat malformed message bodies do not leak protected response content", async () => {
  const selection = resolveLarkApiSelection(selectedChatInput());
  const protectedContent = "synthetic-selected-token https://private.example/file?signature=owner-only";
  const requests = [];
  const transport = selectedChatTransport(selection, requests, {
    respond: () => ({
      code: 0,
      data: {
        items: [selectedApiMessage("malformed-content", protectedContent)],
        has_more: false,
        page_token: null,
      },
    }),
  });
  const adapter = createLarkChatSelectedConversationMessagesAdapter({
    selection,
    transport,
    authorizeConversation: () => true,
    maxMainPages: 1,
    maxRequests: 1,
  });
  const request = {
    ...baseRequest,
    requestId: "00000000-0000-4000-8000-000000000018",
    routeId: "selected-api",
    threadExpansion: "none",
    attachmentScope: "none",
    bounds: { ...baseRequest.bounds, maxMainPages: 1, maxRequests: 1 },
  };
  await assert.rejects(
    adapter.readMainPage({ request, cursor: null }),
    (error) => error.code === "CHAT_MESSAGE_SCHEMA_UNKNOWN" &&
      !error.message.includes("synthetic-selected-token") && !error.message.includes("signature="),
  );
  assert.equal(requests.length, 1);
  assert.doesNotMatch(JSON.stringify(transport.getAudit()), /synthetic-selected-token|signature=|owner-only/);
});
