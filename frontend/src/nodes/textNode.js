// textNode.js

import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables whenever text changes
  useEffect(() => {
    // Regex for matching {{ variableName }}
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1]);
    
    // Remove duplicate variable names
    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [currText]);

  // Handle auto-resizing width and height
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    
    // 1. Auto-resize Height
    e.target.style.height = 'auto'; // Reset to get correct scrollHeight for shrinking
    e.target.style.height = `${e.target.scrollHeight}px`;
    
    // 2. Auto-resize Width
    const lines = e.target.value.split('\n');
    const longestLine = Math.max(...lines.map(line => line.length));
    
    // Scale width linearly with the longest line (approx 8px per char)
    // Clamp it between min 260px and max 600px
    const newWidth = Math.min(Math.max(260, longestLine * 8), 600);
    e.target.style.width = `${newWidth}px`;
  };

  // Run height resize once on initial mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  // Map our extracted variables into the format BaseNode expects for its `inputs` prop
  const dynamicInputs = variables.map(v => ({ id: v }));

  return (
    <BaseNode
      id={id}
      title="Text"
      accentColor="var(--accent-emerald)"
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
    >
      <label className="node-field-label">
        Text
        <textarea
          ref={textareaRef}
          className="node-input-textarea"
          value={currText}
          onChange={handleTextChange}
          style={{ 
            resize: 'none', 
            overflow: 'hidden', 
            minHeight: '40px',
            width: '260px' // Initial width fallback
          }}
        />
      </label>
    </BaseNode>
  );
};
