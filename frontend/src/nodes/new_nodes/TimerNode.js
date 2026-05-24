// TimerNode.js
// Adds a configurable delay (in seconds) to the pipeline flow.

import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1);

  return (
    <BaseNode
      id={id}
      title="Timer"
      accentColor="var(--accent-violet)"
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'after-delay' }]}
    >
      <label className="node-field-label">
        Delay (seconds)
        <input
          className="node-input-text"
          type="number"
          min="0"
          step="0.1"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
