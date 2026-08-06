import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import StyleGuide from './pages/StyleGuide';
import StyleGuide2 from './pages/StyleGuide2';
import Dashboard from './pages/Dashboard';
import MasterComponents from './pages/MasterComponents';
import MasterComponents2 from './pages/MasterComponents2';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ContactSupport from './pages/auth/ContactSupport';
import Policy from './pages/Policy';
import { Inspector } from './components/styleguide/Inspector';

// Inspector is a style-guide dev tool (inspects [data-inspectable] elements
// on the guide/master-components pages) — it has no business floating over
// real product pages like the auth screens, so it's scoped to guide routes.
function InspectorForGuideRoutes() {
  const { pathname } = useLocation();
  const isGuideRoute = !pathname.startsWith('/auth');
  return isGuideRoute ? <Inspector /> : null;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/style-guide" replace />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/style-guide-2" element={<StyleGuide2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master-components" element={<MasterComponents />} />
        <Route path="/master-components-2" element={<MasterComponents2 />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/contact-support" element={<ContactSupport />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
      <InspectorForGuideRoutes />
    </>
  );
}

export default App;
