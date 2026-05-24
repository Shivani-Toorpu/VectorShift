import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title-wrapper">
          <span className="app-logo">VectorShift</span>
          <span className="app-logo-badge">Pipeline Builder</span>
        </div>
        <SubmitButton />
      </header>
      <div className="main-content">
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
