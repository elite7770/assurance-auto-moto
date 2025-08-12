import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageSquare,
  FileText,
  Shield,
  Car
} from 'lucide-react';
import '../../styles/FAQSection.css';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'general', label: 'Général' },
    { id: 'claims', label: 'Sinistres' },
    { id: 'policies', label: 'Polices' },
    { id: 'vehicles', label: 'Véhicules' },
    { id: 'contact', label: 'Contact' }
  ];

  const faqData = [
    {
      id: 1,
      question: 'Comment déclarer un sinistre ?',
      answer: 'Pour déclarer un sinistre, vous pouvez utiliser notre formulaire en ligne, nous appeler au 01 23 45 67 89, ou nous envoyer un email à support@assurance-auto-moto.fr. Nous vous recommandons de déclarer le sinistre dans les 48h suivant l\'événement.',
      category: 'claims'
    },
    {
      id: 2,
      question: 'Quels documents sont nécessaires pour souscrire une assurance ?',
      answer: 'Pour souscrire une assurance auto ou moto, vous aurez besoin de : votre permis de conduire, la carte grise du véhicule, votre justificatif de domicile, et éventuellement votre relevé d\'informations (si vous changez d\'assureur).',
      category: 'policies'
    },
    {
      id: 3,
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Vous pouvez modifier vos informations personnelles directement depuis votre espace client en ligne, ou nous contacter par téléphone ou email. Les modifications sont généralement prises en compte sous 24h.',
      category: 'general'
    },
    {
      id: 4,
      question: 'Quelle est la différence entre assurance au tiers et tous risques ?',
      answer: 'L\'assurance au tiers couvre uniquement les dommages que vous causez aux autres (véhicules, personnes, biens). L\'assurance tous risques couvre également les dommages à votre propre véhicule, même si vous êtes responsable de l\'accident.',
      category: 'policies'
    },
    {
      id: 5,
      question: 'Comment renouveler mon contrat d\'assurance ?',
      answer: 'Votre contrat se renouvelle automatiquement chaque année. Vous recevrez un avis d\'échéance 2 mois avant la date de renouvellement. Vous pouvez également nous contacter pour discuter de vos options ou effectuer des modifications.',
      category: 'policies'
    },
    {
      id: 6,
      question: 'Que faire en cas de vol de mon véhicule ?',
      answer: 'En cas de vol, contactez immédiatement la police pour déposer une plainte, puis appelez-nous au 01 23 45 67 89. Nous vous guiderons dans les démarches et vous accompagnerons dans le processus d\'indemnisation.',
      category: 'claims'
    },
    {
      id: 7,
      question: 'Mon assurance couvre-t-elle les dommages causés par la grêle ?',
      answer: 'Oui, les dommages causés par la grêle sont généralement couverts par l\'assurance tous risques. Si vous avez une assurance au tiers, seuls les dommages causés aux autres sont couverts.',
      category: 'claims'
    },
    {
      id: 8,
      question: 'Comment calculer le montant de ma prime d\'assurance ?',
      answer: 'Le montant de votre prime dépend de plusieurs facteurs : votre âge et expérience de conduite, le type de véhicule, votre lieu de résidence, votre historique de sinistres, et les garanties choisies. Utilisez notre simulateur en ligne pour une estimation personnalisée.',
      category: 'policies'
    },
    {
      id: 9,
      question: 'Puis-je assurer plusieurs véhicules avec le même contrat ?',
      answer: 'Oui, nous proposons des contrats multi-véhicules qui vous permettent d\'assurer plusieurs véhicules avec des conditions avantageuses et une gestion simplifiée.',
      category: 'policies'
    },
    {
      id: 10,
      question: 'Que se passe-t-il si je ne paie pas ma prime ?',
      answer: 'En cas de non-paiement, votre contrat peut être suspendu après un délai de carence. Nous vous contactons toujours avant toute suspension pour trouver une solution. Contactez-nous rapidement si vous rencontrez des difficultés de paiement.',
      category: 'policies'
    }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'claims':
        return <FileText className="category-icon" />;
      case 'policies':
        return <Shield className="category-icon" />;
      case 'vehicles':
        return <Car className="category-icon" />;
      case 'contact':
        return <MessageSquare className="category-icon" />;
      default:
        return <HelpCircle className="category-icon" />;
    }
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2>Questions fréquemment posées</h2>
        <p>Trouvez rapidement des réponses à vos questions sur nos services d'assurance</p>
      </div>

      <div className="faq-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher dans les questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      <div className="faq-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {getCategoryIcon(category.id)}
            {category.label}
          </button>
        ))}
      </div>

      <div className="faq-content">
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <HelpCircle className="no-results-icon" />
            <p>Aucune question trouvée pour votre recherche.</p>
            <p>Essayez de modifier vos critères ou contactez-nous directement.</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${expandedItems.has(faq.id) ? 'expanded' : ''}`}
                  onClick={() => toggleExpanded(faq.id)}
                >
                  <span>{faq.question}</span>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="expand-icon" />
                  ) : (
                    <ChevronDown className="expand-icon" />
                  )}
                </button>
                {expandedItems.has(faq.id) && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="faq-footer">
        <p>Vous ne trouvez pas la réponse à votre question ?</p>
        <div className="faq-actions">
          <button className="contact-btn">
            <MessageSquare />
            Nous Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;



