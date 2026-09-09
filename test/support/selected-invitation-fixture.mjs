import { composition as profileComposition, config as profileConfig } from './selected-profile-fixture.mjs';
import { resolveLarkApiSelection } from '../../packages/lark-transport/src/index.js';
import { LARK_BASE_API_OPERATIONS } from '../../providers/lark-base/src/index.js';

export const config = { appToken: profileConfig.appToken, creatorTableId: profileConfig.creatorTableId,
  invitationStateTableId: profileConfig.profileTableId, dueViewId: profileConfig.dueViewId,
  fieldIds: { creatorAccount: 'fldAccount', stateCreator: 'fldCreator', stateStatus: 'fldStatus', stateObservedAt: 'fldTime',
    stateNickname: 'fldNickname', stateAvatar: 'fldAvatar', stateExternalUserId: 'fldExternal' } };
export const observations = (state = 'synthetic_eligible') => ({ observedAt: '2030-02-01T00:00:00Z', rowCount: 1,
  creators: [{ accountKey: 'synthetic.creator', state, externalUserId: 'synthetic-external', nickname: 'Synthetic Creator' }] });
export function composition(options) {
  const c = profileComposition(options);
  c.creatorFields[0].ui_type = 'Url';
  c.state.records[0].fields['Renamed Account'] = { text: 'synthetic.creator', link: 'https://example.invalid/creator' };
  const definition = (field_id, field_name, ui_type, property) => ({ field_id, field_name, ui_type, ...(property ? { property } : {}) });
  c.profileFields.splice(0, c.profileFields.length,
    definition('fldCreator', 'Creator', 'DuplexLink', { table_id: config.creatorTableId, multiple: false }),
    definition('fldStatus', 'Eligibility', 'SingleSelect', { options: [{ id: 'optYes', name: 'synthetic_eligible' }, { id: 'optNo', name: 'synthetic_ineligible' }] }),
    definition('fldTime', 'Observed', 'DateTime'), definition('fldNickname', 'Nickname', 'Text'),
    { ...definition('fldAvatar', 'Avatar', 'Attachment'), type: 17 }, definition('fldExternal', 'External ID', 'Text'));
  const input = structuredClone(c.input);
  input.instanceProfile.authority = input.instanceProfile.routes[0].authority = input.expected.authority = 'write';
  input.instanceProfile.profileId = input.expected.profileId = 'synthetic-update';
  input.operationIds = input.instanceProfile.allowedOperations = ['records:batch-update'];
  input.operationContracts = LARK_BASE_API_OPERATIONS.filter(x => x.operationId === 'records:batch-update');
  return { ...c, updateSelection: resolveLarkApiSelection(input) };
}
export const stored = () => ({ record_id: 'recInvitationOne', fields: { Creator: [{ record_ids: ['recSynthetic01'] }],
  Eligibility: 'synthetic_eligible', Observed: Date.parse('2030-01-01T00:00:00Z'), Nickname: 'Synthetic Creator', 'External ID': 'synthetic-external' } });
