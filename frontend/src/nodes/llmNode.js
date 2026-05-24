// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      accentColor="var(--accent-purple)"
      inputs={[
        { id: 'system' },
        { id: 'prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
        This is a LLM.
      </span>
    </BaseNode>
  );
};
