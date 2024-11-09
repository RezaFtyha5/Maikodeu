import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Hero />
      <About />
      <Services />
      <Contact />
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Maikodeu. All rights reserved .</p>
        </div>
      </footer>
    </div>
  );
}