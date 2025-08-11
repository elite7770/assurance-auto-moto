import React, { useState } from 'react';
import FAQSection from '../components/FAQSection';
import EnhancedContactForm from '../components/EnhancedContactForm';
import AppointmentBooking from '../components/AppointmentBooking';
import LiveChatWidget from '../components/LiveChatWidget';
import '../styles/Contact.css';

function Contact() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <main className="contact-page">
      <div className="contact-hero">
        <h1>Contact & Support</h1>
        <p>Nous sommes là pour vous accompagner à chaque étape</p>
      </div>

      <div className="contact-tabs">
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          📞 Nous Contacter
        </button>
        <button 
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          ❓ FAQ
        </button>
        <button 
          className={`tab-button ${activeTab === 'appointment' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointment')}
        >
          📅 Prendre RDV
        </button>
      </div>

      <div className="contact-content">
        {activeTab === 'contact' && (
          <EnhancedContactForm />
        )}

        {activeTab === 'faq' && (
          <FAQSection />
        )}

        {activeTab === 'appointment' && (
          <AppointmentBooking />
        )}
      </div>

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </main>
  );
}

export default Contact;
