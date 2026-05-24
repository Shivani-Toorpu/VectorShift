// MergeNode.js
// Combines two inputs into a single output using a chosen merge strategy.

import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      accentColor="var(--accent-pink)"
      inputs={[
        { id: 'input-a' },
        { id: 'input-b' },
      ]}
      outputs={[{ id: 'merged' }]}
    >
      <label className="node-field-label">
        Strategy
        <select
          className="node-input-select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="interleave">Interleave</option>
          <option value="json_merge">JSON Merge</option>
        </select>
      </label>
    </BaseNode>
  );
};
