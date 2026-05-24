# VectorShift Frontend Assessment Tutorial

This guide provides a comprehensive breakdown of the technical assessment we completed. It serves as a tutorial on how we approached each phase, the design patterns we used, and how the final application works.

---

## Part 1: Node Abstraction

### The Problem
Initially, the four provided nodes (`InputNode`, `OutputNode`, `LLMNode`, `TextNode`) had highly redundant code. Every node manually defined its outer container div, border styles, titles, and `reactflow` `<Handle>` components. Adding a new node required copying and pasting all this boilerplate.

### The Solution: `BaseNode`
We built a higher-order component abstraction called `BaseNode.js` that acts as the universal shell for all pipeline nodes.

- **Declarative Handles:** Instead of manually plotting `<Handle>` components and calculating CSS `top` percentages, `BaseNode` accepts simple arrays for `inputs` and `outputs` (e.g., `inputs={[{id: 'prompt'}]}`). It automatically iterates through them, renders the Handles, and mathematically distributes their vertical spacing.
- **Unified Styling:** The container, header, title, and colored dots are managed centrally.
- **The 5 New Nodes:** With this abstraction, creating new nodes was incredibly fast. We built:
  1. **MathNode:** Dropdown for arithmetic operations and handles for values.
  2. **MergeNode:** Dropsdown for merging strategies and handles for merging data.
  3. **TimerNode:** Simple numeric input for delay logic.
  4. **ApiNode:** Complex node with multiple inputs (headers, body), outputs (response, status), and text/dropdown fields.
  5. **NoteNode:** Output-only sticky note with a textarea.

---

## Part 2: Premium Styling

### The Problem
The provided codebase lacked significant CSS, using only basic inline HTML styles (e.g., standard borders, white backgrounds).

### The Solution: Glassmorphism & VectorShift Branding
We overhauled the UI to match the deep-purple, premium glassmorphic aesthetic of the VectorShift landing page.

- **Theme & Gradients:** We defined a strict dark-mode color palette (`#080312` canvas) in `index.css`, heavily utilizing vibrant blue/purple gradients (`#5B6CF6` to `#824BF6`).
- **Component Styling:**
  - **Headers & Panels:** The toolbar and top header use `backdrop-filter: blur(12px)` for a frosted glass effect over the subtle radial gradient background.
  - **Node Aesthetics:** Nodes were styled with a distinct two-tone look: a lighter purple header block merging into a darker purple body block.
  - **Form Controls:** Inside the nodes, standard inputs were transformed into beautifully rounded, deep purple "pill" inputs with glowing focus states.
  - **Handles & Edges:** React Flow connection lines were styled as animated, dashed purple paths, and the handles enlarge and glow when hovered.

---

## Part 3: Text Node Logic

### The Problem
The `TextNode` was static. It didn't expand when users typed long text, and handles had to be hardcoded.

### The Solution: Reactivity & Regex
1. **Auto-Resizing:** We replaced the static `<input>` with a `<textarea>`. We added an `onChange` handler that resets the height to `auto` and then sets it to `e.target.scrollHeight`, allowing the node to perfectly grow vertically. We also calculate the longest line of text to dynamically adjust the width.
2. **Dynamic Handle Generation:**
   - We utilized the Regular Expression `/{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g` to actively scan the text as the user types.
   - It captures any valid variable wrapped in double curly braces (e.g., `{{ api_key }}`).
   - We deduplicate the found variables and map them into the `{id: variableName}` format.
   - We pass this dynamic array to `BaseNode`'s `inputs` prop, which instantly renders the new Handles on the left side of the node on the fly!

---

## Part 4: Backend Integration

### The Problem
The React Flow canvas was isolated. We needed to send the graph structure to a Python FastAPI backend to detect if the user created an infinite loop (a cycle).

### The Solution: Graph Parsing & Cycle Detection

#### The Python Backend (`main.py`)
- We converted the `/pipelines/parse` endpoint to a `POST` route to accept the JSON payload containing the `nodes` and `edges` arrays.
- We implemented **Depth-First Search (DFS)** to determine if the graph was a Directed Acyclic Graph (DAG).
  - The algorithm converts the edges into an adjacency list.
  - It recursively traverses paths. If it visits a node that is currently sitting in its `rec_stack` (recursion stack), it immediately knows the graph has looped back on itself (Cycle Detected!).
- It returns `{ num_nodes: int, num_edges: int, is_dag: bool }`.

#### The React Frontend (`submit.js`)
- We utilized Zustand's `useStore` hook to extract the exact `nodes` and `edges` state from the canvas.
- When the **Submit** button is clicked, a `fetch` POST request sends the graph data to `localhost:8000`.
- The response is displayed via a standard browser `alert()` pop-up strictly formatted exactly as requested.

---

## Conclusion
The application is now a fully functional, highly extensible, and beautifully styled pipeline builder with a connected backend ready for production extensions!
