// app/components/Contact.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(t('successMessage'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage(t('errorMessage'));
      }
    } catch (error) {
      setSubmitMessage(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="kontak" 
      ref={sectionRef} 
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-8 text-center text-gray-800 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {t('contactTitle')}
        </h2>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('name')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('email')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800 transition-all duration-1000 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('message')}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800 transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {isSubmitting ? t('sending') : t('send')}
            </button>
          </form>
          {submitMessage && (
            <p className={`mt-4 text-center ${
              submitMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'
            }`}>
              {submitMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}