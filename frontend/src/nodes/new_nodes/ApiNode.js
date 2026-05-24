// ApiNode.js
// Represents an HTTP API call node with configurable URL and method.

import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&hourly=temperature_2m,rain,relative_humidity_2m');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API"
      accentColor="var(--accent-red)"
      inputs={[
        { id: 'headers' },
        { id: 'body' },
      ]}
      outputs={[
        { id: 'response' },
        { id: 'status' },
      ]}
    >
      <label className="node-field-label">
        URL
        <input
          className="node-input-text"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>
      <label className="node-field-label">
        Method
        <select
          className="node-input-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </label>
    </BaseNode>
  );
};
