import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import CampusCard from "../components/CampusCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";

import { CAMPUS_DATA } from "../data/campuses.js";

export default function Home() {
  const [genderTab, setGenderTab] = useState("men");
  const [lightboxImg, setLightboxImg] = useState(null);

  const currentCampuses = CAMPUS_DATA[genderTab] || [];

  useEffect(() => {
    document.body.style.overflow = lightboxImg
      ? "hidden"
      : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxImg]);

  const showCampuses = (gender) => {
    setGenderTab(gender);

    setTimeout(() => {
      document
        .getElementById("pg-locations")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 antialiased font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden relative">
      <Lightbox
        lightboxImg={lightboxImg}
        closeLightbox={() =>
          setLightboxImg(null)
        }
      />

      <Navbar
        genderTab={genderTab}
        showCampuses={showCampuses}
      />

      <HeroSection
        showCampuses={showCampuses}
      />

      <section
        id="pg-locations"
        className="scroll-mt-36"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-7xl mx-auto px-6 pt-16 mb-12"
        >
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              Find Your Stay
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
              Explore Nandu PG Locations
            </h2>

            <p className="mt-3 text-sm text-stone-500 max-w-xl mx-auto">
              Choose men's or women's PG accommodation and contact the
              respective property directly for availability.
            </p>
          </div>

          <div className="flex justify-center p-1.5 bg-white border border-stone-200/80 rounded-full w-fit mx-auto shadow-sm">
            <button
              type="button"
              onClick={() =>
                setGenderTab("men")
              }
              className={`px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                genderTab === "men"
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-transparent text-stone-400 hover:text-stone-800"
              }`}
            >
              Men's PG
            </button>

            <button
              type="button"
              onClick={() =>
                setGenderTab("women")
              }
              className={`px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                genderTab === "women"
                  ? "bg-rose-800 text-white shadow-md"
                  : "bg-transparent text-stone-400 hover:text-stone-800"
              }`}
            >
              Women's PG
            </button>
          </div>
        </motion.div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
          {currentCampuses.map(
            (campus) => (
              <CampusCard
                key={campus.id}
                campus={campus}
                gender={genderTab}
                openLightbox={
                  setLightboxImg
                }
              />
            )
          )}
        </section>
      </section>

      <Testimonials />

      <FAQAccordion />

      <Footer
        showCampuses={showCampuses}
      />

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @keyframes marquee {
            0% {
              transform: translateX(100vw);
            }

            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 25s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}