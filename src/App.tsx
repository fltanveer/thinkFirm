import { Navigate, Route, Routes } from 'react-router-dom';
import StyleGuide from './pages/StyleGuide';
import Dashboard from './pages/Dashboard';
import MasterComponents from './pages/MasterComponents';
import { Inspector } from './components/styleguide/Inspector';
import { CommentTool } from './components/styleguide/CommentTool';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/style-guide" replace />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master-components" element={<MasterComponents />} />
      </Routes>
      <CommentTool />
      <Inspector />
    </>
  );
}

export default App;
