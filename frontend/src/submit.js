// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            alert(
                `Pipeline Analysis\n\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is a DAG: ${data.is_dag}`
            );
        } catch (error) {
            console.error('Error parsing pipeline:', error);
            alert("Error: Could not connect to the backend. Make sure the FastAPI server is running on port 8000.");
        }
    };

    return (
        <div>
            <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};
