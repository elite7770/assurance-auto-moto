import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Devis.css';

function Devis() {
  const methods = useForm();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      setIsSubmitting(false);
    } else {
      // Final submission, navigate to confirmation page
      setFormData({ ...formData, ...data });
      navigate('/confirmation');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  useEffect(() => {
    methods.reset(formData);
  }, [step, formData, methods]);

  const stepTitles = [
    'Informations Véhicule',
    'Profil Conducteur',
    'Choix des Garanties',
    'Récapitulatif'
  ];

  return (
    <main className="devis-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step + 1) * 25}%` }}></div>
      </div>
      <h1>{stepTitles[step]}</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.section
                key="vehicule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="form-step"
              >
                <label>Type de véhicule
                  <select {...methods.register('vehiculeType', { required: true })}>
                    <option value="">--Choisir--</option>
                    <option value="auto">Voiture</option>
                    <option value="moto">Moto</option>
                  </select>
                </label>
                <label>Marque
                  <input type="text" {...methods.register('marque', { required: true })} />
                </label>
                <label>Année
                  <input type="number" {...methods.register('annee', { required: true, min: 1990 })} />
                </label>
                <div className="buttons">
                  <button type="submit" disabled={isSubmitting}>Suivant</button>
                </div>
              </motion.section>
            )}

            {step === 1 && (
              <motion.section
                key="conducteur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="form-step"
              >
                <label>Nom
                  <input type="text" {...methods.register('nom', { required: true })} />
                </label>
                <label>Âge
                  <input type="number" {...methods.register('age', { required: true, min: 18 })} />
                </label>
                <label>Bonus/Malus (%)
                  <input type="number" {...methods.register('bonus', { required: true, min: 50, max: 100 })} />
                </label>
                <div className="buttons">
                  <button type="button" onClick={handleBack}>Précédent</button>
                  <button type="submit" disabled={isSubmitting}>Suivant</button>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="garanties"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="form-step"
              >
                <label>
                  <input type="checkbox" {...methods.register('garantieVol')} /> Garantie Vol
                </label>
                <label>
                  <input type="checkbox" {...methods.register('garantieBris')} /> Garantie Bris de glace
                </label>
                <label>
                  <input type="checkbox" {...methods.register('garantieTousRisques')} /> Tous Risques
                </label>
                <div className="buttons">
                  <button type="button" onClick={handleBack}>Précédent</button>
                  <button type="submit" disabled={isSubmitting}>Suivant</button>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section
                key="resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="form-step"
              >
                <p><strong>Véhicule :</strong> {formData.vehiculeType} {formData.marque} ({formData.annee})</p>
                <p><strong>Conducteur :</strong> {formData.nom}, {formData.age} ans</p>
                <p><strong>Bonus :</strong> {formData.bonus}%</p>
                <p><strong>Garanties :</strong> {formData.garantieVol ? 'Vol ' : ''}{formData.garantieBris ? 'Bris de glace ' : ''}{formData.garantieTousRisques ? 'Tous Risques' : ''}</p>
                <div className="buttons">
                  <button type="button" onClick={handleBack}>Précédent</button>
                  <button type="submit" disabled={isSubmitting}>Valider</button>
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
