import { motion } from "framer-motion";

import mainImg from "../assets/main.jpg";

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection({
  showCampuses,
}) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      className="relative min-h-[560px] h-[75vh] flex items-center justify-center px-6 mt-[130px] lg:mt-[140px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden mx-4 sm:mx-8 shadow-2xl border border-stone-200/50"
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 z-0">
        <img
          src={mainImg}
          alt="Nandu PG accommodation in Hyderabad"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/45 to-stone-900/85" />
      </div>

      {/* HERO CONTENT */}

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
        <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          PG Accommodation in Hyderabad
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white drop-shadow-md">
          Comfortable PG Living
          <br />

          <span className="text-stone-300 font-light">
            Near Hyderabad's IT Hubs.
          </span>
        </h1>

        <p className="mt-6 text-sm md:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
          Discover separate men's and women's
          Nandu PG locations with flexible room
          sharing options, convenient locations
          and direct property enquiries.
        </p>

        {/* CTA */}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              showCampuses("men")
            }
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-stone-900 text-[10px] font-black uppercase tracking-widest hover:bg-stone-100 transition-all active:scale-95 shadow-lg"
          >
            Explore Men's PG
          </button>

          <button
            type="button"
            onClick={() =>
              showCampuses("women")
            }
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95"
          >
            Explore Women's PG
          </button>
        </div>
      </div>
    </motion.section>
  );
}