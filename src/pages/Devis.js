import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Info, Car, Shield, Clock, Calculator } from 'lucide-react';
import FormField from '../components/forms/FormField';
import CoverageCard from '../components/coverage/CoverageCard';
import '../styles/Devis.css';

function Devis() {
  const methods = useForm({ 
    mode: 'onChange',
    defaultValues: {
      vehiculeType: '',
      marque: '',
      modele: '',
      annee: '',
      puissance: '',
      usage: 'personnel',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      age: '',
      permisDate: '',
      experience: '',
      adresse: '',
      codePostal: '',
      ville: '',
      garantieVol: false,
      garantieBris: false,
      garantieTousRisques: false,
      garantieAssistance: false,
      garantieDefense: false,
      franchise: '3000',
      bonus: '0'
    }
  });
  
  const { formState: { isValid }, watch, setValue } = methods;
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const navigate = useNavigate();

  // Watch form values for price calculation
  const watchedValues = watch();

  const stepTitles = [
    '1. Informations Véhicule',
    '2. Profil Conducteur',
    '3. Adresse & Usage',
    '4. Choix des Garanties',
    '5. Récapitulatif & Prix'
  ];

  // Enhanced vehicle brands and models
  const vehicleBrands = {
    auto: ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Opel', 'Fiat', 'Dacia', 'Hyundai', 'Kia', 'Nissan', 'Honda', 'Mazda', 'Skoda', 'Seat', 'Volvo'],
    moto: ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'BMW', 'Ducati', 'KTM', 'Triumph', 'Harley-Davidson', 'Aprilia', 'Moto Guzzi', 'Royal Enfield', 'Husqvarna', 'Benelli', 'MV Agusta']
  };

  // Power options
  const powerOptions = [
    { value: '1-4', label: '1 à 4 CV' },
    { value: '5-6', label: '5 à 6 CV' },
    { value: '7-10', label: '7 à 10 CV' },
    { value: '11-14', label: '11 à 14 CV' },
    { value: '15+', label: '15 CV et plus' }
  ];

  // Usage options
  const usageOptions = [
    { value: 'personnel', label: 'Usage personnel' },
    { value: 'professionnel', label: 'Usage professionnel' },
    { value: 'commercial', label: 'Usage commercial' }
  ];

  // Experience options
  const experienceOptions = [
    { value: '0-2', label: '0 à 2 ans' },
    { value: '3-5', label: '3 à 5 ans' },
    { value: '6-10', label: '6 à 10 ans' },
    { value: '10+', label: 'Plus de 10 ans' }
  ];

  // Franchise options
  const franchiseOptions = [
    { value: '1000', label: '1 000 MAD' },
    { value: '3000', label: '3 000 MAD' },
    { value: '5000', label: '5 000 MAD' },
    { value: '8000', label: '8 000 MAD' }
  ];

  // Bonus options
  const bonusOptions = [
    { value: '50', label: '50% (Bonus maximum)' },
    { value: '25', label: '25%' },
    { value: '0', label: '0% (Neutre)' },
    { value: '-25', label: '-25%' },
    { value: '-50', label: '-50%' }
  ];

  // Select options with placeholders
  const vehiculeTypeOptions = [
    { value: '', label: '--Choisir--' },
    { value: 'auto', label: 'Voiture' },
    { value: 'moto', label: 'Moto' },
  ];

  const usageSelectOptions = [
    { value: '', label: '--Sélectionner--' },
    ...usageOptions,
  ];

  const powerSelectOptions = [
    { value: '', label: '--Sélectionner--' },
    ...powerOptions,
  ];

  const experienceSelectOptions = [
    { value: '', label: '--Sélectionner--' },
    ...experienceOptions,
  ];

  // Keep direct arrays for simple selects

  const currentYear = new Date().getFullYear();
  const yearSelectOptions = [
    { value: '', label: '--Sélectionner--' },
    ...Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i).map((year) => ({
      value: String(year),
      label: String(year),
    })),
  ];

  // Price calculation function
  const calculatePrice = (data) => {
    // Base en MAD (Maroc)
    let basePrice = data.vehiculeType === 'auto' ? 3500 : 2500;
    
    // Vehicle factors
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - parseInt(data.annee);
    if (vehicleAge > 10) basePrice *= 0.8;
    else if (vehicleAge > 5) basePrice *= 0.9;
    
    // Power factor
    const power = data.puissance;
    if (power === '11-14') basePrice *= 1.2;
    else if (power === '15+') basePrice *= 1.4;
    
    // Driver age factor
    const age = parseInt(data.age);
    if (age < 25) basePrice *= 1.5;
    else if (age < 30) basePrice *= 1.3;
    else if (age > 65) basePrice *= 1.2;
    
    // Experience factor
    const experience = data.experience;
    if (experience === '0-2') basePrice *= 1.4;
    else if (experience === '3-5') basePrice *= 1.2;
    else if (experience === '10+') basePrice *= 0.9;
    
    // Bonus factor
    const bonus = parseInt(data.bonus);
    basePrice *= (1 + bonus / 100);
    
    // Coverage additions
    let coveragePrice = 0;
    if (data.garantieVol) coveragePrice += 1500;
    if (data.garantieBris) coveragePrice += 800;
    if (data.garantieTousRisques) coveragePrice += 3000;
    if (data.garantieAssistance) coveragePrice += 300;
    if (data.garantieDefense) coveragePrice += 200;
    
    // Franchise reduction
    const franchise = parseInt(data.franchise);
    if (franchise === 5000) coveragePrice *= 0.9;
    else if (franchise === 8000) coveragePrice *= 0.85;
    
    return Math.round(basePrice + coveragePrice);
  };

  // Save form data to localStorage
  const saveFormData = (data) => {
    localStorage.setItem('devisFormData', JSON.stringify(data));
  };

  // Load form data from localStorage
  const loadFormData = () => {
    const saved = localStorage.getItem('devisFormData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedData(parsed);
      return parsed;
    }
    return null;
  };

  // Clear saved form data
  const clearSavedData = () => {
    localStorage.removeItem('devisFormData');
    setSavedData(null);
  };

  // Enhanced validation schema
  const validationSchema = {
    vehiculeType: { required: 'Type de véhicule requis' },
    marque: { required: 'Marque requise' },
    modele: { required: 'Modèle requis' },
    annee: { required: 'Année requise' },
    puissance: { required: 'Puissance requise' },
    usage: { required: 'Usage requis' },
    nom: { 
      required: 'Nom requis',
      minLength: { value: 2, message: 'Nom trop court' }
    },
    prenom: { 
      required: 'Prénom requis',
      minLength: { value: 2, message: 'Prénom trop court' }
    },
    email: { 
      required: 'Email requis',
      pattern: { 
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email invalide'
      }
    },
    telephone: { 
      required: 'Téléphone requis',
      pattern: {
        // Maroc: +212 ou 0, indicatif 5,6,7 puis 8 chiffres
        value: /^(?:\+212|0)[\s.-]?(?:[5-7])[0-9]{8}$/,
        message: 'Numéro de téléphone marocain invalide'
      }
    },
    age: { 
      required: 'Âge requis',
      min: { value: 18, message: 'Minimum 18 ans' },
      max: { value: 85, message: 'Maximum 85 ans' }
    },
    permisDate: { required: 'Date d\'obtention du permis requise' },
    experience: { required: 'Expérience requise' },
    adresse: { required: 'Adresse requise' },
    codePostal: { 
      required: 'Code postal requis',
      pattern: {
        value: /^[0-9]{5}$/,
        message: 'Code postal invalide'
      }
    },
    ville: { required: 'Ville requise' }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    if (step < 4) {
      const newFormData = { ...formData, ...data };
      setFormData(newFormData);
      saveFormData(newFormData);
      
      // Calculate price for next step
      if (step === 2) {
        const price = calculatePrice(newFormData);
        setEstimatedPrice(price);
      }
      
      setTimeout(() => {
        setStep(step + 1);
        setIsSubmitting(false);
      }, 300);
    } else {
      const finalData = { ...formData, ...data };
      setFormData(finalData);
      saveFormData(finalData);
      
      // Simulate API call
      setTimeout(() => {
        clearSavedData();
        navigate('/confirmation', { 
          state: { 
            formData: finalData, 
            estimatedPrice: estimatedPrice 
          } 
        });
      }, 1000);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestoreData = () => {
    if (savedData) {
      Object.keys(savedData).forEach(key => {
        setValue(key, savedData[key]);
      });
      setFormData(savedData);
      clearSavedData();
    }
  };

  useEffect(() => {
    // Load saved data on component mount
    const saved = loadFormData();
    if (saved) {
      Object.keys(saved).forEach(key => {
        setValue(key, saved[key]);
      });
      setFormData(saved);
    }
  }, [setValue]);

  useEffect(() => {
    // Calculate price when relevant fields change
    if (step >= 3 && Object.keys(formData).length > 0) {
      const price = calculatePrice({ ...formData, ...watchedValues });
      setEstimatedPrice(price);
    }
  }, [watchedValues, step, formData]);

  return (
    <main className="devis-container" role="main">
      {/* Progress Bar */}
      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${(step + 1) * 20}%` }}></div>
        <div className="step-indicators">
          {stepTitles.map((title, index) => (
            <div 
              key={index} 
              className={`step-circle ${step === index ? 'active' : step > index ? 'completed' : ''}`}
              title={title}
            >
              {step > index ? <CheckCircle size={20} /> : index + 1}
            </div>
          ))}
        </div>
        <div className="step-labels">
          {stepTitles.map((title, index) => (
            <span key={index} className={`step-label ${step === index ? 'active' : ''}`}>
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* Saved Data Alert */}
      {savedData && (
        <motion.div 
          className="saved-data-alert"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Info size={20} />
          <span>Vous avez des données sauvegardées</span>
          <button onClick={handleRestoreData} className="restore-button">
            Restaurer
          </button>
          <button onClick={clearSavedData} className="clear-button">
            Effacer
          </button>
        </motion.div>
      )}

      <h1>{stepTitles[step]}</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <AnimatePresence mode="wait">
            {/* Step 1: Vehicle Information */}
            {step === 0 && (
              <motion.section
                key="vehicule"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="step-header">
                  <Car size={24} />
                  <h2>Étape 1 : Informations sur votre véhicule</h2>
                </div>

                <div className="form-grid">
                  <FormField
                    name="vehiculeType"
                    label="Type de véhicule *"
                    type="select"
                    options={vehiculeTypeOptions}
                    rules={validationSchema.vehiculeType}
                  />

                  <FormField
                    name="marque"
                    label="Marque *"
                    type="select"
                    options={[{ value: '', label: '--Choisir--' }, ...(watchedValues.vehiculeType ? vehicleBrands[watchedValues.vehiculeType].map((b) => ({ value: b, label: b })) : [])]}
                    rules={validationSchema.marque}
                      disabled={!watchedValues.vehiculeType}
                  />

                  <FormField
                    name="modele"
                    label="Modèle *"
                      type="text" 
                      placeholder="Ex: Clio, 208, C3..."
                    rules={validationSchema.modele}
                  />

                  <FormField
                    name="annee"
                    label="Année *"
                    type="select"
                    options={yearSelectOptions}
                    rules={validationSchema.annee}
                  />

                  <FormField
                    name="puissance"
                    label="Puissance fiscale *"
                    type="select"
                    options={powerSelectOptions}
                    rules={validationSchema.puissance}
                  />

                  <FormField
                    name="usage"
                    label="Usage du véhicule *"
                    type="select"
                    options={usageSelectOptions}
                    rules={validationSchema.usage}
                  />
                </div>

                <div className="buttons">
                  <button type="submit" disabled={!isValid || isSubmitting} className="next-button">
                    {isSubmitting ? 'Chargement...' : 'Suivant'}
                  </button>
                </div>
              </motion.section>
            )}

            {/* Step 2: Driver Profile */}
            {step === 1 && (
              <motion.section
                key="conducteur"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="step-header">
                  <Shield size={24} />
                  <h2>Étape 2 : Profil du conducteur principal</h2>
                </div>

                <div className="form-grid">
                  <FormField
                    name="nom"
                    label="Nom *"
                      type="text" 
                      placeholder="Votre nom"
                    rules={validationSchema.nom}
                  />

                  <FormField
                    name="prenom"
                    label="Prénom *"
                      type="text" 
                      placeholder="Votre prénom"
                    rules={validationSchema.prenom}
                  />

                  <FormField
                    name="email"
                    label="Email *"
                      type="email" 
                      placeholder="votre@email.com"
                    rules={validationSchema.email}
                  />

                  <FormField
                    name="telephone"
                    label="Téléphone *"
                      type="tel" 
                      placeholder="06 12 34 56 78"
                    rules={validationSchema.telephone}
                  />

                  <FormField
                    name="age"
                    label="Âge *"
                      type="number" 
                      placeholder="25"
                    rules={validationSchema.age}
                    inputProps={{ min: 18, max: 85 }}
                  />

                  <FormField
                    name="permisDate"
                    label="Date d'obtention du permis *"
                      type="date" 
                    rules={validationSchema.permisDate}
                  />

                  <FormField
                    name="experience"
                    label="Expérience de conduite *"
                    type="select"
                    options={experienceSelectOptions}
                    rules={validationSchema.experience}
                  />
                </div>

                <div className="buttons">
                  <button type="button" onClick={handleBack} className="prev-button">
                    Précédent
                  </button>
                  <button type="submit" disabled={!isValid || isSubmitting} className="next-button">
                    {isSubmitting ? 'Chargement...' : 'Suivant'}
                  </button>
                </div>
              </motion.section>
            )}

            {/* Step 3: Address & Usage */}
            {step === 2 && (
              <motion.section
                key="adresse"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="step-header">
                  <Clock size={24} />
                  <h2>Étape 3 : Adresse et informations complémentaires</h2>
                </div>

                <div className="form-grid">
                  <FormField
                    name="adresse"
                    label="Adresse *"
                      type="text" 
                      placeholder="123 Rue de la Paix"
                    rules={validationSchema.adresse}
                    wrapperClassName="full-width"
                  />

                  <FormField
                    name="codePostal"
                    label="Code postal *"
                      type="text" 
                      placeholder="75001"
                    rules={validationSchema.codePostal}
                    inputProps={{ maxLength: 5 }}
                  />

                  <FormField
                    name="ville"
                    label="Ville *"
                      type="text" 
                      placeholder="Paris"
                    rules={validationSchema.ville}
                  />
                </div>

                <div className="buttons">
                  <button type="button" onClick={handleBack} className="prev-button">
                    Précédent
                  </button>
                  <button type="submit" disabled={!isValid || isSubmitting} className="next-button">
                    {isSubmitting ? 'Chargement...' : 'Suivant'}
                  </button>
                </div>
              </motion.section>
            )}

            {/* Step 4: Coverage Options */}
            {step === 3 && (
              <motion.section
                key="garanties"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <div className="step-header">
                  <Shield size={24} />
                  <h2>Étape 4 : Choix des garanties</h2>
                </div>

                <div className="coverage-section">
                  <h3>Garanties principales</h3>
                  <div className="coverage-grid">
                    <CoverageCard
                      name="garantieVol"
                      title="Vol"
                      description="Protection contre le vol et la destruction"
                       priceLabel="+1 500 MAD/an"
                    />
                    <CoverageCard
                      name="garantieBris"
                      title="Bris de glace"
                      description="Réparation des vitres et pare-brise"
                       priceLabel="+800 MAD/an"
                    />
                    <CoverageCard
                      name="garantieTousRisques"
                      title="Tous Risques"
                      description="Protection complète tous dommages"
                       priceLabel="+3 000 MAD/an"
                    />
                    <CoverageCard
                      name="garantieAssistance"
                      title="Assistance 0km"
                      description="Dépannage et assistance routière"
                       priceLabel="+300 MAD/an"
                    />
                    <CoverageCard
                      name="garantieDefense"
                      title="Défense pénale"
                      description="Protection juridique en cas de litige"
                       priceLabel="+200 MAD/an"
                    />
                  </div>
                </div>

                <div className="options-section">
                  <h3>Options de personnalisation</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="franchise">Franchise</label>
                      <select 
                        id="franchise"
                        {...methods.register('franchise')} 
                      >
                        {franchiseOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bonus">Bonus/Malus</label>
                      <select 
                        id="bonus"
                        {...methods.register('bonus')} 
                      >
                        {bonusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Preview */}
                <div className="price-preview">
                  <div className="price-header">
                    <div className="calculator-icon">
                      <Calculator size={20} />
                      <span>Estimation du prix</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                      className="toggle-breakdown"
                    >
                      {showPriceBreakdown ? 'Masquer' : 'Voir'} le détail
                    </button>
                  </div>
                  <div className="price-amount">
                    <span className="currency">MAD</span>
                    <span className="amount">{estimatedPrice}</span>
                    <span className="period">/an</span>
                  </div>
                  {showPriceBreakdown && (
                    <motion.div 
                      className="price-breakdown"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="breakdown-item">
                        <span>Prix de base</span>
                        <span>{Math.round(estimatedPrice * 0.7)} MAD</span>
                      </div>
                      <div className="breakdown-item">
                        <span>Garanties additionnelles</span>
                        <span>{Math.round(estimatedPrice * 0.3)} MAD</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="buttons">
                  <button type="button" onClick={handleBack} className="prev-button">
                    Précédent
                  </button>
                  <button type="submit" disabled={isSubmitting} className="next-button">
                    {isSubmitting ? 'Chargement...' : 'Suivant'}
                  </button>
                </div>
              </motion.section>
            )}

            {/* Step 5: Summary & Price */}
            {step === 4 && (
              <motion.section
                key="recap"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step recap-step"
              >
                <div className="recap-card">
                  <h2>Étape 5 : Résumé de votre devis</h2>
                  
                  <div className="recap-sections">
                    <div className="recap-section">
                      <h3>Véhicule</h3>
                      <div className="recap-details">
                        <div className="recap-item">
                          <span>Type :</span>
                          <strong>{formData.vehiculeType === 'auto' ? 'Voiture' : 'Moto'}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Marque/Modèle :</span>
                          <strong>{formData.marque} {formData.modele}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Année :</span>
                          <strong>{formData.annee}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Puissance :</span>
                          <strong>{formData.puissance} CV</strong>
                        </div>
                        <div className="recap-item">
                          <span>Usage :</span>
                          <strong>{formData.usage}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="recap-section">
                      <h3>Conducteur</h3>
                      <div className="recap-details">
                        <div className="recap-item">
                          <span>Nom :</span>
                          <strong>{formData.prenom} {formData.nom}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Âge :</span>
                          <strong>{formData.age} ans</strong>
                        </div>
                        <div className="recap-item">
                          <span>Expérience :</span>
                          <strong>{formData.experience}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Contact :</span>
                          <strong>{formData.email}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="recap-section">
                      <h3>Adresse</h3>
                      <div className="recap-details">
                        <div className="recap-item">
                          <span>Adresse :</span>
                          <strong>{formData.adresse}</strong>
                        </div>
                        <div className="recap-item">
                          <span>Ville :</span>
                          <strong>{formData.codePostal} {formData.ville}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="recap-section">
                      <h3>Garanties sélectionnées</h3>
                      <div className="recap-details">
                        {formData.garantieVol && <div className="recap-item"><span>✓</span><strong>Vol</strong></div>}
                        {formData.garantieBris && <div className="recap-item"><span>✓</span><strong>Bris de glace</strong></div>}
                        {formData.garantieTousRisques && <div className="recap-item"><span>✓</span><strong>Tous Risques</strong></div>}
                        {formData.garantieAssistance && <div className="recap-item"><span>✓</span><strong>Assistance 0km</strong></div>}
                        {formData.garantieDefense && <div className="recap-item"><span>✓</span><strong>Défense pénale</strong></div>}
                        <div className="recap-item">
                          <span>Franchise :</span>
                          <strong>{formData.franchise} MAD</strong>
                        </div>
                        <div className="recap-item">
                          <span>Bonus/Malus :</span>
                          <strong>{formData.bonus}%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="final-price">
                    <div className="price-display">
                      <span className="price-label">Prix total annuel</span>
                      <div className="price-amount-large">
                         <span className="currency">MAD</span>
                        <span className="amount">{estimatedPrice}</span>
                        <span className="period">/an</span>
                      </div>
                      <span className="price-note">Prix indicatif sous réserve de validation</span>
                    </div>
                  </div>
                </div>

                <div className="buttons">
                  <button type="button" onClick={handleBack} className="prev-button">
                    Précédent
                  </button>
                  <button type="submit" disabled={isSubmitting} className="validate-button">
                    {isSubmitting ? 'Traitement...' : 'Valider le devis'}
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
