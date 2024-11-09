// app/components/About.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { useLanguage } from '../LanguageContext';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage(); // Tambahkan hook useLanguage

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

  const fadeInUpClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
  const fadeInLeftClass = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
  const fadeInRightClass = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-12 text-center transition-all duration-1000 ${fadeInUpClass}`}>
          {t('aboutTitle')}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className={`md:w-1/2 transition-all duration-1000 delay-100 ${fadeInLeftClass}`}>
            <Image
              src="/images/about-image.jpg"
              alt={t('aboutTitle')}
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className={`md:w-1/2 transition-all duration-1000 delay-200 ${fadeInRightClass}`}>
            <p className="text-lg text-gray-600 mb-6">
              {t('aboutText1')}
            </p>
            <p className="text-lg text-gray-600">
              {t('aboutText2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}