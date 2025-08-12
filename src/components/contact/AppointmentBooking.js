import React, { useState } from 'react';
import '../../styles/AppointmentBooking.css';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentData, setAppointmentData] = useState({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    { id: 'consultation', name: 'Consultation Assurance', duration: 30, description: "Discussion sur vos besoins d'assurance", price: 'Gratuit' },
    { id: 'devis', name: 'Devis Personnalisé', duration: 45, description: 'Étude de votre situation et devis détaillé', price: 'Gratuit' },
    { id: 'sinistre', name: 'Accompagnement Sinistre', duration: 60, description: 'Assistance pour déclaration de sinistre', price: 'Gratuit' },
    { id: 'renouvellement', name: 'Renouvellement Contrat', duration: 30, description: 'Optimisation de votre contrat existant', price: 'Gratuit' },
  ];

  const timeSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleServiceSelect = (serviceId) => { setSelectedService(serviceId); setCurrentStep(2); };
  const handleDateSelect = (date) => { setSelectedDate(date); setCurrentStep(3); };
  const handleTimeSelect = (time) => { setSelectedTime(time); setCurrentStep(4); };
  const handleInputChange = (e) => { const { name, value } = e.target; setAppointmentData((prev) => ({ ...prev, [name]: value })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Rendez-vous confirmé ! Vous recevrez un email de confirmation.');
      setSelectedDate(''); setSelectedTime(''); setSelectedService(''); setAppointmentData({ firstName: '', lastName: '', email: '', phone: '', notes: '' }); setCurrentStep(1);
    }, 2000);
  };

  const goBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const selectedServiceData = services.find((s) => s.id === selectedService);

  return (
    <div className="appointment-booking">
      <div className="booking-header"><h2>Prendre un Rendez-vous</h2><p>Planifiez une consultation avec nos experts en assurance</p></div>
      <div className="booking-progress">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}><span className="step-number">1</span><span className="step-label">Service</span></div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}><span className="step-number">2</span><span className="step-label">Date</span></div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}><span className="step-number">3</span><span className="step-label">Heure</span></div>
        <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}><span className="step-number">4</span><span className="step-label">Contact</span></div>
      </div>
      <div className="booking-content">
        {currentStep === 1 && (
          <div className="booking-step">
            <h3>Choisissez un service</h3>
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card" onClick={() => handleServiceSelect(service.id)}>
                  <div className="service-header"><h4>{service.name}</h4><span className="service-price">{service.price}</span></div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-duration"><span>⏱️ {service.duration} min</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="booking-step">
            <h3>Sélectionnez une date</h3>
            <div className="date-selection">
              {getAvailableDates().map((date) => (
                <button key={date.toISOString()} className={`date-option ${selectedDate === date.toISOString() ? 'selected' : ''}`} onClick={() => handleDateSelect(date.toISOString())}>
                  <span className="date-day">{date.getDate()}</span>
                  <span className="date-month">{date.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                  <span className="date-weekday">{date.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
                </button>
              ))}
            </div>
            <button className="back-button" onClick={goBack}>← Retour</button>
          </div>
        )}
        {currentStep === 3 && (
          <div className="booking-step">
            <h3>Choisissez une heure</h3>
            <div className="time-selection">
              {timeSlots.map((time) => (
                <button key={time} className={`time-option ${selectedTime === time ? 'selected' : ''}`} onClick={() => handleTimeSelect(time)}>{time}</button>
              ))}
            </div>
            <button className="back-button" onClick={goBack}>← Retour</button>
          </div>
        )}
        {currentStep === 4 && (
          <div className="booking-step">
            <h3>Informations de contact</h3>
            <div className="appointment-summary">
              <h4>Récapitulatif du rendez-vous</h4>
              <div className="summary-details">
                <p><strong>Service:</strong> {selectedServiceData?.name}</p>
                <p><strong>Date:</strong> {selectedDate && formatDate(new Date(selectedDate))}</p>
                <p><strong>Heure:</strong> {selectedTime}</p>
                <p><strong>Durée:</strong> {selectedServiceData?.duration} minutes</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group"><label htmlFor="firstName">Prénom *</label><input type="text" id="firstName" name="firstName" value={appointmentData.firstName} onChange={handleInputChange} required /></div>
                <div className="form-group"><label htmlFor="lastName">Nom *</label><input type="text" id="lastName" name="lastName" value={appointmentData.lastName} onChange={handleInputChange} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label htmlFor="email">Email *</label><input type="email" id="email" name="email" value={appointmentData.email} onChange={handleInputChange} required /></div>
                <div className="form-group"><label htmlFor="phone">Téléphone *</label><input type="tel" id="phone" name="phone" value={appointmentData.phone} onChange={handleInputChange} required /></div>
              </div>
              <div className="form-group"><label htmlFor="notes">Notes (optionnel)</label><textarea id="notes" name="notes" value={appointmentData.notes} onChange={handleInputChange} rows="3" placeholder="Informations supplémentaires..." /></div>
              <div className="form-actions">
                <button type="button" className="back-button" onClick={goBack}>← Retour</button>
                <button type="submit" className="confirm-button" disabled={isSubmitting}>{isSubmitting ? <><span className="loading-spinner"></span>Confirmation...</> : 'Confirmer le rendez-vous'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;



