import { motion } from "framer-motion";

export default function Navbar({
  genderTab,
  showCampuses,
}) {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
    fixed
    inset-x-0
    top-0
    z-50
    border-b
    border-[#E7E2D8]
    bg-[#F7F5EF]/95
    shadow-[0_4px_16px_rgba(24,59,91,0.08)]
    backdrop-blur-xl
  "
    >
      <div
        className="
      mx-auto
      flex
      h-[68px]
      max-w-7xl
      items-center
      justify-between
      px-4

      sm:h-[78px]
      sm:px-6
    "
      >
        {/* BRAND */}

        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
        group
        flex
        min-w-0
        items-center
        gap-3
      "
          aria-label="Go to top"
        >
          {/* LOGO */}

          <div
            className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white
          p-1.5
          shadow-[0_4px_12px_rgba(24,59,91,0.10)]
          ring-1
          ring-[#E7E2D8]

          sm:h-14
          sm:w-14
          sm:rounded-2xl
        "
          >
            <img
              src="/nandu_group_of_hostels_logo.svg"
              alt="NANDU Group of Hostels"
              className="h-full w-full object-contain"
            />
          </div>

          {/* TEXT */}

          <div className="min-w-0 text-left">
            <p
              className="
            whitespace-nowrap
            text-[11px]
            font-black
            uppercase
            leading-none
            tracking-[-0.02em]
            text-[#183B5B]

            sm:text-sm
          "
            >
              Nandu Group of Hostels
            </p>

            <p
              className="
            mt-1
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#B33A3A]

            sm:text-[9px]
          "
            >
              Hyderabad
            </p>
          </div>
        </button>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => showCampuses("men")}
            className={`
          rounded-full
          px-5
          py-2.5
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          transition-all

          ${genderTab === "men"
                ? "bg-[#183B5B] text-white shadow-sm"
                : "text-[#183B5B] hover:bg-[#E8F0F7]"
              }
        `}
          >
            Men's PG
          </button>

          <button
            type="button"
            onClick={() => showCampuses("women")}
            className={`
          rounded-full
          px-5
          py-2.5
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          transition-all

          ${genderTab === "women"
                ? "bg-[#183B5B] text-white shadow-sm"
                : "text-[#183B5B] hover:bg-[#E8F0F7]"
              }
        `}
          >
            Women's PG
          </button>
        </nav>
      </div>
    </motion.header>
  );
}