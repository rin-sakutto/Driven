import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MusicPageContent from "./MusicPageContent";

export const metadata: Metadata = {
  title: "MUSIC — DRIVEN",
  description: "Music by Driven. Sounds from the void.",
};

export default function MusicPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <MusicPageContent />
      <Footer />
    </main>
  );
}
