// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="sidebar-panel">
            <div className="sidebar-title">Nodes</div>
            <div className="node-group">
                {/* Original nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                {/* New nodes */}
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
