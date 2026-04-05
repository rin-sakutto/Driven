import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Landscape from "./components/Landscape";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <About />
      <Landscape />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
