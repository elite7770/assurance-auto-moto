import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AssuranceAuto from './pages/AssuranceAuto';
import AssuranceMoto from './pages/AssuranceMoto';
import Devis from './pages/Devis';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import EspaceClient from './pages/EspaceClient';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assurance-auto" element={<AssuranceAuto />} />
          <Route path="/assurance-moto" element={<AssuranceMoto />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/espace-client" element={<EspaceClient />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
