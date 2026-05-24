// NoteNode.js
// A sticky-note style node with a multi-line text area.
// Output-only — used to annotate pipelines or pass static content downstream.

import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const NoteNode = ({ id, data }) => {
  const [content, setContent] = useState(data?.content || 'Write a note…');

  return (
    <BaseNode
      id={id}
      title="Note"
      accentColor="var(--accent-orange)"
      outputs={[{ id: 'text' }]}
    >
      <label className="node-field-label">
        Content
        <textarea
          className="node-input-textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ resize: 'vertical' }}
        />
      </label>
    </BaseNode>
  );
};
