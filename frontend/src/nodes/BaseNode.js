// BaseNode.js
// Reusable node abstraction — every pipeline node uses this as its shell.
// Accepts declarative config for title, accent color, handles, and body content.

import { Handle, Position } from 'reactflow';

/**
 * BaseNode — the universal wrapper for all pipeline nodes.
 *
 * Props:
 *   id         — React Flow node id (passed automatically by RF)
 *   title      — display name shown in the node header
 *   accentColor — CSS color used for the type-dot and handle glow (defaults to --accent-blue)
 *   inputs     — array of { id: string, label?: string, style?: object }
 *                each entry creates a target Handle on the left side
 *   outputs    — array of { id: string, label?: string, style?: object }
 *                each entry creates a source Handle on the right side
 *   children   — arbitrary JSX rendered as the node body (form fields, text, etc.)
 *   style      — optional extra styles on the outer container
 */
export const BaseNode = ({
  id,
  title = 'Node',
  accentColor = 'var(--accent-blue)',
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  // Calculate evenly-spaced positions for multiple handles on the same side
  const handlePosition = (index, total) => {
    if (total === 1) return '50%';
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div
      className="base-node-container"
      style={{ '--node-accent': accentColor, ...style }}
    >
      {/* ---- Left-side target handles (inputs) ---- */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: handlePosition(i, inputs.length), ...(input.style || {}) }}
        />
      ))}

      {/* ---- Header ---- */}
      <div className="node-card-header">
        <span className="node-card-title">
          <span className="node-card-type-dot" />
          {title}
        </span>
      </div>

      {/* ---- Body (caller provides form fields, text, etc.) ---- */}
      {children && <div className="node-card-fields">{children}</div>}

      {/* ---- Right-side source handles (outputs) ---- */}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: handlePosition(i, outputs.length), ...(output.style || {}) }}
        />
      ))}
    </div>
  );
};
