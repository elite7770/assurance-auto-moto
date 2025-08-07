import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/Devis.css';

function Devis() {
  const methods = useForm({ mode: 'onChange' });
  const { formState: { errors, isValid } } = methods;
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const stepTitles = [
    'Informations Véhicule',
    'Profil Conducteur',
    'Choix des Garanties',
    'Récapitulatif'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setTimeout(() => {
        setStep(step + 1);
        setIsSubmitting(false);
      }, 300);
    } else {
      setFormData({ ...formData, ...data });
      setTimeout(() => {
        navigate('/confirmation');
      }, 500);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  useEffect(() => {
    methods.reset(formData);
  }, [step, formData, methods]);

  return (
    <main className="devis-container">
      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${(step + 1) * 25}%` }}></div>
        <div className="step-indicators">
          {stepTitles.map((title, index) => (
            <div key={index} className={`step-circle ${step === index ? 'active' : step > index ? 'completed' : ''}`}>{step > index ? <CheckCircle size={20} /> : index + 1}</div>
          ))}
        </div>
      </div>

      <h1>{stepTitles[step]}</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.section
                key="vehicule"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="form-group">
                  <label>Type de véhicule</label>
                  <select {...methods.register('vehiculeType', { required: 'Champ requis' })} className={errors.vehiculeType ? 'error' : ''}>
                    <option value="">--Choisir--</option>
                    <option value="auto">Voiture</option>
                    <option value="moto">Moto</option>
                  </select>
                  {errors.vehiculeType && <span className="error-message">{errors.vehiculeType.message}</span>}
                </div>

                <div className="form-group">
                  <label>Marque</label>
                  <input type="text" {...methods.register('marque', { required: 'Champ requis' })} className={errors.marque ? 'error' : ''} />
                  {errors.marque && <span className="error-message">{errors.marque.message}</span>}
                </div>

                <div className="form-group">
  <label>Année</label>
  <select {...methods.register('annee', { required: 'Champ requis' })} className={errors.annee ? 'error' : ''}>
    <option value="">--Sélectionner--</option>
    {Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 2025 - i).map(year => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>
  {errors.annee && <span className="error-message">{errors.annee.message}</span>}
</div>

                
                <div className="buttons">
                  <button type="submit" disabled={!isValid || isSubmitting} className="next-button">{isSubmitting ? 'Chargement...' : 'Suivant'}</button>
                </div>
              </motion.section>
            )}

            {step === 1 && (
              <motion.section
                key="conducteur"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" {...methods.register('nom', { required: 'Champ requis' })} className={errors.nom ? 'error' : ''} />
                  {errors.nom && <span className="error-message">{errors.nom.message}</span>}
                </div>

                <div className="form-group">
                  <label>Âge</label>
                  <input type="number" {...methods.register('age', { required: 'Champ requis', min: { value: 18, message: 'Minimum 18 ans' } })} className={errors.age ? 'error' : ''} />
                  {errors.age && <span className="error-message">{errors.age.message}</span>}
                </div>

                <div className="form-group">
  <label>Date d'obtention du permis</label>
  <input type="date" {...methods.register('permisDate', { required: 'Champ requis' })} className={errors.permisDate ? 'error' : ''} />
  {errors.permisDate && <span className="error-message">{errors.permisDate.message}</span>}
</div>

                <div className="buttons">
                  <button type="button" onClick={handleBack}>Précédent</button>
                  <button type="submit" disabled={!isValid || isSubmitting} className="next-button">{isSubmitting ? 'Chargement...' : 'Suivant'}</button>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="garanties"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="form-group">
                  <label>
                    <input type="checkbox" {...methods.register('garantieVol')} /> Garantie Vol
                  </label>
                  <label>
                    <input type="checkbox" {...methods.register('garantieBris')} /> Garantie Bris de glace
                  </label>
                  <label>
                    <input type="checkbox" {...methods.register('garantieTousRisques')} /> Tous Risques
                  </label>
                </div>

                <div className="buttons">
                  <button type="button" onClick={handleBack}>Précédent</button>
                  <button type="submit" disabled={isSubmitting} className="next-button">{isSubmitting ? 'Chargement...' : 'Suivant'}</button>
                </div>
              </motion.section>
            )}

            {step === 3 && (
  <motion.section
    key="recap"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="form-step recap-step"
  >
    <div className="recap-card">
      <h2>Résumé de votre devis</h2>
      <div className="recap-details">
        <div className="recap-item">
          <span>Véhicule :</span>
          <strong>{formData.vehiculeType} {formData.marque} ({formData.annee})</strong>
        </div>
        <div className="recap-item">
          <span>Conducteur :</span>
          <strong>{formData.nom}, {formData.age} ans</strong>
        </div>
        <div className="recap-item">
          <span>Garanties :</span>
          <strong>
            {formData.garantieVol ? 'Vol ' : ''}
            {formData.garantieBris ? 'Bris de glace ' : ''}
            {formData.garantieTousRisques ? 'Tous Risques' : ''}
          </strong>
        </div>
      </div>
    </div>

    <div className="buttons">
      <button type="button" onClick={handleBack} className="prev-button">Précédent</button>
      <button type="submit" disabled={isSubmitting} className="validate-button">
        {isSubmitting ? 'Traitement...' : 'Valider'}
      </button>
    </div>
  </motion.section>
)}
          </AnimatePresence>
        </form>
      </FormProvider>
    </main>
  );
}

export default Devis;
