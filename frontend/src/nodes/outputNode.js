// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      accentColor="var(--accent-orange)"
      inputs={[{ id: 'value' }]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
