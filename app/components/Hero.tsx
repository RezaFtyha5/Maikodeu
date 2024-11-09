// app/components/Hero.tsx
'use client';

import { useLanguage } from '../LanguageContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/images/bg1.jpg', '/images/bg2.jpg', '/images/bg3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {images.map((img, index) => (
        <Image
          key={img}
          src={img}
          alt={`Background ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in-up text-white">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-200 mb-8 animate-fade-in-up animate-delay-100">
          {t('tagline')}
        </p>
        <a
          href="#kontak"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-200"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  );
}