import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Info, Car, Motorcycle, Shield, Clock, Calculator } from 'lucide-react';
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
      franchise: '300',
      bonus: '50'
    }
  });
  
  const { formState: { errors, isValid }, watch, setValue } = methods;
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
    'Informations Véhicule',
    'Profil Conducteur',
    'Adresse & Usage',
    'Choix des Garanties',
    'Récapitulatif & Prix'
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
    { value: '150', label: '150 €' },
    { value: '300', label: '300 €' },
    { value: '500', label: '500 €' },
    { value: '750', label: '750 €' }
  ];

  // Bonus options
  const bonusOptions = [
    { value: '50', label: '50% (Bonus maximum)' },
    { value: '25', label: '25%' },
    { value: '0', label: '0% (Neutre)' },
    { value: '-25', label: '-25%' },
    { value: '-50', label: '-50%' }
  ];

  // Price calculation function
  const calculatePrice = (data) => {
    let basePrice = data.vehiculeType === 'auto' ? 800 : 600;
    
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
    if (data.garantieVol) coveragePrice += 200;
    if (data.garantieBris) coveragePrice += 150;
    if (data.garantieTousRisques) coveragePrice += 400;
    if (data.garantieAssistance) coveragePrice += 100;
    if (data.garantieDefense) coveragePrice += 80;
    
    // Franchise reduction
    const franchise = parseInt(data.franchise);
    if (franchise === 500) coveragePrice *= 0.9;
    else if (franchise === 750) coveragePrice *= 0.85;
    
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
        value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        message: 'Numéro de téléphone invalide'
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
                  <h2>Informations sur votre véhicule</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="vehiculeType">Type de véhicule *</label>
                    <select 
                      id="vehiculeType"
                      {...methods.register('vehiculeType', validationSchema.vehiculeType)} 
                      className={errors.vehiculeType ? 'error' : ''}
                    >
                      <option value="">--Choisir--</option>
                      <option value="auto">Voiture</option>
                      <option value="moto">Moto</option>
                    </select>
                    {errors.vehiculeType && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.vehiculeType.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="marque">Marque *</label>
                    <select 
                      id="marque"
                      {...methods.register('marque', validationSchema.marque)} 
                      className={errors.marque ? 'error' : ''}
                      disabled={!watchedValues.vehiculeType}
                    >
                      <option value="">--Choisir--</option>
                      {watchedValues.vehiculeType && vehicleBrands[watchedValues.vehiculeType]?.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    {errors.marque && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.marque.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="modele">Modèle *</label>
                    <input 
                      type="text" 
                      id="modele"
                      {...methods.register('modele', validationSchema.modele)} 
                      className={errors.modele ? 'error' : ''}
                      placeholder="Ex: Clio, 208, C3..."
                    />
                    {errors.modele && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.modele.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="annee">Année *</label>
                    <select 
                      id="annee"
                      {...methods.register('annee', validationSchema.annee)} 
                      className={errors.annee ? 'error' : ''}
                    >
                      <option value="">--Sélectionner--</option>
                      {Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {errors.annee && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.annee.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="puissance">Puissance fiscale *</label>
                    <select 
                      id="puissance"
                      {...methods.register('puissance', validationSchema.puissance)} 
                      className={errors.puissance ? 'error' : ''}
                    >
                      <option value="">--Sélectionner--</option>
                      {powerOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.puissance && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.puissance.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="usage">Usage du véhicule *</label>
                    <select 
                      id="usage"
                      {...methods.register('usage', validationSchema.usage)} 
                      className={errors.usage ? 'error' : ''}
                    >
                      <option value="">--Sélectionner--</option>
                      {usageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.usage && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.usage.message}
                      </span>
                    )}
                  </div>
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
                  <h2>Profil du conducteur principal</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input 
                      type="text" 
                      id="nom"
                      {...methods.register('nom', validationSchema.nom)} 
                      className={errors.nom ? 'error' : ''}
                      placeholder="Votre nom"
                    />
                    {errors.nom && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.nom.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input 
                      type="text" 
                      id="prenom"
                      {...methods.register('prenom', validationSchema.prenom)} 
                      className={errors.prenom ? 'error' : ''}
                      placeholder="Votre prénom"
                    />
                    {errors.prenom && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.prenom.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      {...methods.register('email', validationSchema.email)} 
                      className={errors.email ? 'error' : ''}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone *</label>
                    <input 
                      type="tel" 
                      id="telephone"
                      {...methods.register('telephone', validationSchema.telephone)} 
                      className={errors.telephone ? 'error' : ''}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.telephone && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.telephone.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="age">Âge *</label>
                    <input 
                      type="number" 
                      id="age"
                      {...methods.register('age', validationSchema.age)} 
                      className={errors.age ? 'error' : ''}
                      placeholder="25"
                      min="18"
                      max="85"
                    />
                    {errors.age && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.age.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="permisDate">Date d'obtention du permis *</label>
                    <input 
                      type="date" 
                      id="permisDate"
                      {...methods.register('permisDate', validationSchema.permisDate)} 
                      className={errors.permisDate ? 'error' : ''}
                    />
                    {errors.permisDate && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.permisDate.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Expérience de conduite *</label>
                    <select 
                      id="experience"
                      {...methods.register('experience', validationSchema.experience)} 
                      className={errors.experience ? 'error' : ''}
                    >
                      <option value="">--Sélectionner--</option>
                      {experienceOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {errors.experience && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.experience.message}
                      </span>
                    )}
                  </div>
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
                  <h2>Adresse et informations complémentaires</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="adresse">Adresse *</label>
                    <input 
                      type="text" 
                      id="adresse"
                      {...methods.register('adresse', validationSchema.adresse)} 
                      className={errors.adresse ? 'error' : ''}
                      placeholder="123 Rue de la Paix"
                    />
                    {errors.adresse && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.adresse.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="codePostal">Code postal *</label>
                    <input 
                      type="text" 
                      id="codePostal"
                      {...methods.register('codePostal', validationSchema.codePostal)} 
                      className={errors.codePostal ? 'error' : ''}
                      placeholder="75001"
                      maxLength="5"
                    />
                    {errors.codePostal && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.codePostal.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ville">Ville *</label>
                    <input 
                      type="text" 
                      id="ville"
                      {...methods.register('ville', validationSchema.ville)} 
                      className={errors.ville ? 'error' : ''}
                      placeholder="Paris"
                    />
                    {errors.ville && (
                      <span className="error-message">
                        <AlertCircle size={16} />
                        {errors.ville.message}
                      </span>
                    )}
                  </div>
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
                  <h2>Choix des garanties</h2>
                </div>

                <div className="coverage-section">
                  <h3>Garanties principales</h3>
                  <div className="coverage-grid">
                    <div className="coverage-card">
                      <label className="coverage-label">
                        <input 
                          type="checkbox" 
                          {...methods.register('garantieVol')} 
                        />
                        <div className="coverage-content">
                          <h4>Vol</h4>
                          <p>Protection contre le vol et la destruction</p>
                          <span className="coverage-price">+200€/an</span>
                        </div>
                      </label>
                    </div>

                    <div className="coverage-card">
                      <label className="coverage-label">
                        <input 
                          type="checkbox" 
                          {...methods.register('garantieBris')} 
                        />
                        <div className="coverage-content">
                          <h4>Bris de glace</h4>
                          <p>Réparation des vitres et pare-brise</p>
                          <span className="coverage-price">+150€/an</span>
                        </div>
                      </label>
                    </div>

                    <div className="coverage-card">
                      <label className="coverage-label">
                        <input 
                          type="checkbox" 
                          {...methods.register('garantieTousRisques')} 
                        />
                        <div className="coverage-content">
                          <h4>Tous Risques</h4>
                          <p>Protection complète tous dommages</p>
                          <span className="coverage-price">+400€/an</span>
                        </div>
                      </label>
                    </div>

                    <div className="coverage-card">
                      <label className="coverage-label">
                        <input 
                          type="checkbox" 
                          {...methods.register('garantieAssistance')} 
                        />
                        <div className="coverage-content">
                          <h4>Assistance 0km</h4>
                          <p>Dépannage et assistance routière</p>
                          <span className="coverage-price">+100€/an</span>
                        </div>
                      </label>
                    </div>

                    <div className="coverage-card">
                      <label className="coverage-label">
                        <input 
                          type="checkbox" 
                          {...methods.register('garantieDefense')} 
                        />
                        <div className="coverage-content">
                          <h4>Défense pénale</h4>
                          <p>Protection juridique en cas de litige</p>
                          <span className="coverage-price">+80€/an</span>
                        </div>
                      </label>
                    </div>
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
                    <Calculator size={20} />
                    <span>Estimation du prix</span>
                    <button 
                      type="button" 
                      onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                      className="toggle-breakdown"
                    >
                      {showPriceBreakdown ? 'Masquer' : 'Voir'} le détail
                    </button>
                  </div>
                  <div className="price-amount">
                    <span className="currency">€</span>
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
                        <span>€{Math.round(estimatedPrice * 0.7)}</span>
                      </div>
                      <div className="breakdown-item">
                        <span>Garanties additionnelles</span>
                        <span>€{Math.round(estimatedPrice * 0.3)}</span>
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
                  <h2>Résumé de votre devis</h2>
                  
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
                          <strong>{formData.franchise}€</strong>
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
                        <span className="currency">€</span>
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
