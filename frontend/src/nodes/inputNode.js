// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      accentColor="var(--accent-blue)"
      outputs={[{ id: 'value' }]}
    >
      <label className="node-field-label">
        Name
        <input
          className="node-input-text"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>
      <label className="node-field-label">
        Type
        <select
          className="node-input-select"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
