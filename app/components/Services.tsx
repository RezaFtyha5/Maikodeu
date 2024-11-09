// app/components/Services.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  // Definisikan services dengan menggunakan keys dari translations
  const services = [
    {
      title: t('graphicDesign'),
      description: t('graphicDesignDesc'),
      icon: '🎨'
    },
    {
      title: t('webProgramming'),
      description: t('webProgrammingDesc'),
      icon: '💻'
    },
    {
      title: t('officeAdmin'),
      description: t('officeAdminDesc'),
      icon: '📊'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
  
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-12 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {t('servicesTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4">{service.icon} {service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}