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
      className="fixed inset-x-0 top-0 z-50 border-b border-[#E7E2D8] bg-[#F7F5EF]/95 shadow-[0_4px_16px_rgba(24,59,91,0.08)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[78px] sm:px-6">

        {/* LOGO */}

        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="group flex items-center gap-3"
          aria-label="Go to top"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_4px_12px_rgba(24,59,91,0.10)] ring-1 ring-[#E7E2D8] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
            <img
              src="/nandu_group_of_hostels_logo.svg"
              alt="NANDU Group of Hostels"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-black uppercase tracking-tight text-[#183B5B]">
              Nandu Group of Hostels
            </p>

            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#B33A3A]">
              Hyderabad
            </p>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() =>
              showCampuses("men")
            }
            className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
              genderTab === "men"
                ? "bg-[#183B5B] text-white shadow-sm"
                : "text-[#183B5B] hover:bg-[#E8F0F7]"
            }`}
          >
            Men's PG
          </button>

          <button
            type="button"
            onClick={() =>
              showCampuses("women")
            }
            className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
              genderTab === "women"
                ? "bg-[#183B5B] text-white shadow-sm"
                : "text-[#183B5B] hover:bg-[#E8F0F7]"
            }`}
          >
            Women's PG
          </button>
        </nav>

        {/* MOBILE BRAND MARK */}

        <div className="flex items-center gap-2 md:hidden">
          <span className="h-2 w-2 rounded-full bg-[#B33A3A]" />

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#183B5B]">
            Hyderabad
          </span>
        </div>
      </div>
    </motion.header>
  );
}