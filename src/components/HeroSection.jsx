import { motion } from "framer-motion";

import {
  Building2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import mainImg from "../assets/optimized/main.webp";

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 24,
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

export default function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      className="
        nandu-hero
        relative
        mx-4
        mt-[84px]
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[#E7E2D8]
        shadow-[0_18px_50px_rgba(24,59,91,0.12)]

        sm:mx-8
        sm:mt-[96px]
        sm:rounded-[2.5rem]
      "
    >
      {/* =========================
          HERO IMAGE
      ========================== */}

      <div
        className="
          relative
          h-[380px]

          sm:h-[440px]
          lg:h-[500px]
        "
      >
        <img
          src={mainImg}
          alt="Nandu PG accommodation near Hyderabad IT hubs"
          className="
            h-full
            w-full
            object-cover
          "
          fetchPriority="high"
          decoding="async"
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#0F2436]/90
            via-[#183B5B]/65
            to-black/20
          "
        />

        {/* BOTTOM DEPTH */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent
          "
        />

        {/* =========================
            CONTENT
        ========================== */}

        <div
          className="
            absolute
            inset-0
            flex
            items-end
            px-5
            pb-7

            sm:px-8
            sm:pb-10

            lg:px-12
            lg:pb-12
          "
        >
          <div className="max-w-3xl">

            {/* BRAND BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/10
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white
                shadow-sm
                backdrop-blur-md
              "
            >
              <Building2
                size={13}
                className="text-[#F2A7A7]"
              />

              Nandu Group of Hostels
            </div>

            {/* HEADLINE */}

            <h1
              className="
                mt-4
                max-w-2xl
                text-[34px]
                font-black
                leading-[1.03]
                tracking-tight
                text-white

                sm:text-5xl
                lg:text-6xl
              "
            >
              PGs Near Hyderabad's
              <span className="block text-[#F2B0B0]">
                Major IT Hubs
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-xl
                text-[13px]
                leading-relaxed
                text-white/80

                sm:text-sm
                lg:text-base
              "
            >
              Men's and women's PG accommodation
              across HITEC City, Madhapur and Rai
              Durg with direct property contact.
            </p>

            {/* =====================
                LOCATION CHIPS
            ====================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {[
                "HITEC City",
                "Madhapur",
                "Rai Durg",
              ].map((location) => (
                <span
                  key={location}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/15
                    bg-white/10
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    text-white/90
                    backdrop-blur-md
                  "
                >
                  <MapPin
                    size={11}
                    className="text-[#F2A7A7]"
                  />

                  {location}
                </span>
              ))}
            </div>

            {/* SMALL TRUST LINE */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/60
              "
            >
              <ShieldCheck
                size={13}
                className="text-[#F2A7A7]"
              />

              Direct contact with each property
            </div>
          </div>
        </div>
        
      </div>
    </motion.section>
  );
}