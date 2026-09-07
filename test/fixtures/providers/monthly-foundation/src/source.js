export function create({ snapshot, handoff = false, handoffContext }) {
  return {
    async readActivity(input, { request }) {
      if (handoff) return {
        ...request, context: handoffContext ?? request.context,
        status: 'interaction-required', instructions: 'Return the synthetic snapshot for this exact request.',
      };
      return structuredClone(snapshot);
    },
  };
}
