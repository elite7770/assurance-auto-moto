import React, { useState } from 'react';
import '../../styles/FAQSection.css';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqData = {
    categories: [
      { id: 'all', name: 'Toutes les questions' },
      { id: 'auto', name: 'Assurance Auto' },
      { id: 'moto', name: 'Assurance Moto' },
      { id: 'claims', name: 'Sinistres' },
      { id: 'billing', name: 'Facturation' },
      { id: 'technical', name: 'Support Technique' }
    ],
    questions: [
      { id: 1, category: 'auto', question: 'Comment souscrire à une assurance auto ?', answer: "Pour souscrire à une assurance auto, vous pouvez utiliser notre formulaire en ligne, nous appeler au 01 23 45 67 89, ou prendre rendez-vous avec un de nos conseillers. Nous vous guiderons à travers tout le processus." },
      { id: 2, category: 'auto', question: "Quels documents sont nécessaires pour l'assurance auto ?", answer: "Vous aurez besoin de votre permis de conduire, la carte grise du véhicule, votre justificatif de domicile, et éventuellement un relevé d'informations si vous changez d'assureur." },
      { id: 3, category: 'moto', question: "L'assurance moto est-elle obligatoire ?", answer: "Oui, l'assurance moto est obligatoire en France. Elle doit couvrir au minimum la responsabilité civile pour les dommages causés aux tiers." },
      { id: 4, category: 'claims', question: 'Comment déclarer un sinistre ?', answer: 'Vous pouvez déclarer un sinistre en ligne via votre espace client, par téléphone au 01 23 45 67 89, ou en nous envoyant un email. Nous vous accompagnerons dans toutes les démarches.' },
      { id: 5, category: 'claims', question: 'Quel est le délai pour déclarer un sinistre ?', answer: "Il est recommandé de déclarer un sinistre dans les 5 jours ouvrés suivant l'accident. Cependant, vous disposez d'un délai légal de 2 ans pour déclarer un sinistre." },
      { id: 6, category: 'billing', question: 'Comment modifier mes informations de paiement ?', answer: 'Vous pouvez modifier vos informations de paiement dans votre espace client, section "Profil" > "Moyens de paiement". Vous pouvez également nous contacter par téléphone.' },
      { id: 7, category: 'billing', question: 'Puis-je payer ma prime en plusieurs fois ?', answer: 'Oui, nous proposons le paiement en plusieurs fois sans frais supplémentaires. Vous pouvez choisir entre 3, 6 ou 12 mensualités lors de la souscription.' },
      { id: 8, category: 'technical', question: "J'ai oublié mon mot de passe, que faire ?", answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion. Vous recevrez un email avec un lien pour réinitialiser votre mot de passe.' },
      { id: 9, category: 'technical', question: "Comment télécharger mon attestation d'assurance ?", answer: 'Connectez-vous à votre espace client, allez dans "Mes Polices" et cliquez sur "Télécharger l\'attestation" pour la police concernée.' },
      { id: 10, category: 'auto', question: 'Que faire en cas de vol de mon véhicule ?', answer: 'En cas de vol, déclarez-le immédiatement à la police et obtenez un récépissé. Puis contactez-nous dans les plus brefs délais pour déclarer le sinistre.' },
    ],
  };

  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedItems(newExpanded);
  };

  const filteredQuestions = faqData.questions.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2>Questions Fréquemment Posées</h2>
        <p>Trouvez rapidement les réponses à vos questions</p>
      </div>

      <div className="faq-search">
        <div className="search-container">
          <input type="text" placeholder="Rechercher une question..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="faq-categories">
        {faqData.categories.map((category) => (
          <button key={category.id} className={`category-btn ${activeCategory === category.id ? 'active' : ''}`} onClick={() => setActiveCategory(category.id)}>
            {category.name}
          </button>
        ))}
      </div>

      <div className="faq-content">
        {filteredQuestions.length === 0 ? (
          <div className="no-results">
            <p>Aucune question trouvée pour votre recherche.</p>
            <p>Essayez avec d'autres mots-clés ou contactez-nous directement.</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredQuestions.map((item) => (
              <div key={item.id} className="faq-item">
                <button className={`faq-question ${expandedItems.has(item.id) ? 'expanded' : ''}`} onClick={() => toggleItem(item.id)}>
                  <span>{item.question}</span>
                  <span className="expand-icon">{expandedItems.has(item.id) ? '−' : '+'}</span>
                </button>
                {expandedItems.has(item.id) && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
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
          <button className="contact-btn">Nous Contacter</button>
          <button className="chat-btn">Chat en Direct</button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;



