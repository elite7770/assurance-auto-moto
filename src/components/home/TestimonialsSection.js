import React from 'react';
import '../../styles/TestimonialsSection.css';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sophie D.', feedback: "Service rapide et professionnel. L'équipe a su répondre à toutes mes attentes." },
  { name: 'Karim L.', feedback: 'Assistance parfaite lors de mon accident. Sérieux et efficacité au top.' },
  { name: 'Julie P.', feedback: 'Des tarifs compétitifs et une interface claire. Je recommande sans hésiter !' },
];

const TestimonialsSection = () => (
  <section className="testimonials-section">
    <div className="testimonials-wrapper">
      <h2 className="testimonials-title">Ce que disent nos clients</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="star-icon" />
              ))}
            </div>
            <p className="feedback">"{t.feedback}"</p>
            <p className="client-name">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;



