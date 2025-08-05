import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AssuranceAuto from './pages/AssuranceAuto';
import AssuranceMoto from './pages/AssuranceMoto';
import Devis from './pages/Devis';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import EspaceClient from './pages/EspaceClient';
import Confirmation from './pages/Confirmation'; // Add this import at the top
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assurance-auto" element={<AssuranceAuto />} />
        <Route path="/assurance-moto" element={<AssuranceMoto />} />
        <Route path="/devis" element={<Devis />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/espace-client" element={<EspaceClient />} />
        <Route path="/confirmation" element={<Confirmation />} /> {/* Added route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
