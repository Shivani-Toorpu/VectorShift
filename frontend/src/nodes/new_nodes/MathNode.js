// MathNode.js
// Performs basic arithmetic operations between two inputs.

import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      accentColor="var(--accent-cyan)"
      inputs={[
        { id: 'val1' },
        { id: 'val2' },
      ]}
      outputs={[
        { id: 'result' }
      ]}
    >
      <label className="node-field-label">
        Operation
        <select
          className="node-input-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>
      </label>
    </BaseNode>
  );
};
