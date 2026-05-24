from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow the React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    # Accept JSON payload from the frontend
    pipeline = await request.json()
    
    nodes = pipeline.get('nodes', [])
    edges = pipeline.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # --- DAG Detection (Cycle Detection using DFS) ---
    # 1. Build an adjacency list representation of the graph
    from collections import defaultdict
    graph = defaultdict(list)
    for edge in edges:
        graph[edge.get('source')].append(edge.get('target'))
    
    # 2. Track visited nodes and the current recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # We hit a node currently in our traversal stack -> Cycle detected!
                return True
                
        rec_stack.remove(node)
        return False
        
    # 3. Check every node for cycles
    is_dag = True
    for node in nodes:
        node_id = node.get('id')
        if node_id not in visited:
            if has_cycle(node_id):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
