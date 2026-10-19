import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import CampusCard from "../components/CampusCard.jsx";

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
    <div className="min-h-screen bg-[#F7F5EF] text-stone-900 antialiased font-sans selection:bg-[#183B5B] selection:text-white overflow-x-hidden relative">
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
          className="max-w-7xl mx-auto px-6 pt-6 sm:pt-8 mb-8 sm:mb-10"
        >

          <div className="mx-auto flex w-fit rounded-full border border-[#E7E2D8] bg-white p-1.5 shadow-[0_4px_16px_rgba(24,59,91,0.06)]">
            <button
              type="button"
              onClick={() =>
                setGenderTab("men")
              }
              className={`rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 sm:px-8 ${genderTab === "men"
                ? "bg-[#183B5B] text-white shadow-md"
                : "text-stone-500 hover:bg-[#E8F0F7] hover:text-[#183B5B]"
                }`}
            >
              Men's PG
            </button>

            <button
              type="button"
              onClick={() =>
                setGenderTab("women")
              }
              className={`rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 sm:px-8 ${genderTab === "women"
                ? "bg-[#183B5B] text-white shadow-md"
                : "text-stone-500 hover:bg-[#E8F0F7] hover:text-[#183B5B]"
                }`}
            >
              Women's PG
            </button>
          </div>
        </motion.div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid gap-5 md:grid-cols-2">
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