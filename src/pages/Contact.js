import React, { useEffect, useState } from 'react';
import { Phone, HelpCircle } from 'lucide-react';
import FAQSection from '../components/contact/FAQSection';
import EnhancedContactForm from '../components/contact/EnhancedContactForm';
import '../styles/Contact.css';

function Contact() {
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'faq' || tab === 'contact') {
      setActiveTab(tab);
    }
  }, []);

  return (
    <main className="contact-page">
      <div className="contact-hero">
        <h1>Contact & Support</h1>
        <p>Votre partenaire de confiance pour tous vos besoins d'assurance</p>
      </div>

      <div className="contact-tabs">
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Phone size={20} />
          Nous Contacter
        </button>
        <button 
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <HelpCircle size={20} />
          FAQ
        </button>
      </div>

      <div className="contact-content">
        {activeTab === 'contact' && (
          <EnhancedContactForm />
        )}

        {activeTab === 'faq' && (
          <FAQSection />
        )}
      </div>
    </main>
  );
}

export default Contact;
