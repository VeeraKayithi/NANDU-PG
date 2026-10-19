import {
  Building2,
  ChevronRight,
  MapPin,
  Navigation,
  Phone,
  Users,
} from "lucide-react";

export default function Footer({
  showCampuses,
}) {
  return (
    <footer
      className="
        mx-4
        mb-[calc(1.5rem+env(safe-area-inset-bottom))]
        overflow-hidden
        rounded-[2rem]
        border
        border-[#E7E2D8]
        bg-white
        shadow-[0_16px_45px_rgba(24,59,91,0.08)]

        sm:mx-8
        sm:mb-8
        sm:rounded-[2.5rem]
      "
    >
      {/* =========================
          MAIN FOOTER
      ========================== */}

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-10
          px-6
          py-10

          sm:px-8
          sm:py-12

          md:grid-cols-12
          md:gap-10
        "
      >
        {/* =====================
            BRAND
        ====================== */}

        <div className="md:col-span-5">
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
              items-center
              gap-3
              text-left
            "
          >
            {/* LOGO */}

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white
                p-1.5
                shadow-[0_4px_12px_rgba(24,59,91,0.10)]
                ring-1
                ring-[#E7E2D8]
                transition-transform
                duration-300

                group-hover:scale-105
              "
            >
              <img
                src="/nandu_group_of_hostels_logo.svg"
                alt="NANDU Group of Hostels"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-black
                  uppercase
                  leading-tight
                  tracking-tight
                  text-[#183B5B]

                  sm:text-xl
                "
              >
                Nandu Group of Hostels
              </h2>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#B33A3A]
                "
              >
                Hyderabad
              </p>
            </div>
          </button>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-md
              text-sm
              leading-relaxed
              text-stone-500
            "
          >
            Comfortable men's and women's PG
            accommodation across Hyderabad's
            major IT corridors with direct
            property contact.
          </p>

          {/* LOCATION CHIPS */}

          <div className="mt-5 flex flex-wrap gap-2">
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
                  border-[#E7E2D8]
                  bg-[#F7F5EF]
                  px-3
                  py-1.5
                  text-[9px]
                  font-semibold
                  text-stone-600
                "
              >
                <MapPin
                  size={11}
                  className="text-[#B33A3A]"
                />

                {location}
              </span>
            ))}
          </div>
        </div>

        {/* =====================
            EXPLORE
        ====================== */}

        <div className="md:col-span-3 md:col-start-7">
          <h4
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#183B5B]
            "
          >
            Explore
          </h4>

          <div className="mt-4 grid grid-cols-2 gap-2 md:block md:space-y-1.5">
            {/* MEN */}

            <button
              type="button"
              onClick={() =>
                showCampuses("men")
              }
              className="
                group
                grid
                w-full
                grid-cols-[32px_1fr_20px]
                items-center
                gap-2
                rounded-xl
                px-2
                py-2.5
                text-left
                transition

                hover:bg-[#E8F0F7]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#E8F0F7]
                  text-[#183B5B]
                "
              >
                <Users size={14} />
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                  text-stone-600
                  transition-colors

                  group-hover:text-[#183B5B]
                "
              >
                Men's PG
              </span>

              <ChevronRight
                size={15}
                className="
                  justify-self-end
                  text-stone-300
                  transition-all

                  group-hover:translate-x-0.5
                  group-hover:text-[#183B5B]
                "
              />
            </button>

            {/* WOMEN */}

            <button
              type="button"
              onClick={() =>
                showCampuses("women")
              }
              className="
                group
                grid
                w-full
                grid-cols-[32px_1fr_20px]
                items-center
                gap-2
                rounded-xl
                px-2
                py-2.5
                text-left
                transition

                hover:bg-[#FCECEC]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#FCECEC]
                  text-[#B33A3A]
                "
              >
                <Users size={14} />
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                  text-stone-600
                  transition-colors

                  group-hover:text-[#B33A3A]
                "
              >
                Women's PG
              </span>

              <ChevronRight
                size={15}
                className="
                  justify-self-end
                  text-stone-300
                  transition-all

                  group-hover:translate-x-0.5
                  group-hover:text-[#B33A3A]
                "
              />
            </button>

            {/* LOCATIONS */}

            <button
              type="button"
              onClick={() =>
                showCampuses("men")
              }
              hidden md:grid
              className="
                group
                grid
                w-full
                grid-cols-[32px_1fr_20px]
                items-center
                gap-2
                rounded-xl
                px-2
                py-2.5
                text-left
                transition

                hover:bg-[#F7F5EF]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F7F5EF]
                  text-[#B33A3A]
                "
              >
                <MapPin size={14} />
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                  text-stone-600
                  transition-colors

                  group-hover:text-[#183B5B]
                "
              >
                View Locations
              </span>

              <ChevronRight
                size={15}
                className="
                  justify-self-end
                  text-stone-300
                  transition-all

                  group-hover:translate-x-0.5
                  group-hover:text-[#183B5B]
                "
              />
            </button>
          </div>
        </div>

        {/* =====================
            QUICK INFORMATION
        ====================== */}

        <div className="hidden md:col-span-3 md:block">
          <h4
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#183B5B]
            "
          >
            Quick Information
          </h4>

          <div className="mt-5 space-y-3">
            {/* MULTIPLE LOCATIONS */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#E7E2D8]
                bg-white
                p-3
                pl-4
                shadow-sm
              "
            >
              {/* COLOR STRIP */}

              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#183B5B]" />

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E8F0F7]
                    text-[#183B5B]
                  "
                >
                  <Building2 size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-stone-800">
                    Multiple Locations
                  </p>

                  <p className="mt-0.5 text-[10px] text-stone-500">
                    Across Hyderabad IT hubs
                  </p>
                </div>
              </div>
            </div>

            {/* DIRECT CONTACT */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#E7E2D8]
                bg-white
                p-3
                pl-4
                shadow-sm
              "
            >
              {/* COLOR STRIP */}

              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#B33A3A]" />

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FCECEC]
                    text-[#B33A3A]
                  "
                >
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-stone-800">
                    Direct Contact
                  </p>

                  <p className="mt-0.5 text-[10px] text-stone-500">
                    Call each property directly
                  </p>
                </div>
              </div>
            </div>

            {/* GOOGLE MAPS */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#E7E2D8]
                bg-white
                p-3
                pl-4
                shadow-sm
              "
            >
              {/* COLOR STRIP */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  top-0
                  w-1
                  bg-gradient-to-b
                  from-[#183B5B]
                  to-[#B33A3A]
                "
              />

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F7F5EF]
                    text-[#B33A3A]
                    ring-1
                    ring-[#E7E2D8]
                  "
                >
                  <Navigation size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-stone-800">
                    Google Maps
                  </p>

                  <p className="mt-0.5 text-[10px] text-stone-500">
                    Directions for every PG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          SEPARATOR
      ========================== */}

      <div
        className="
          mx-6
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#183B5B]/15
          to-transparent

          sm:mx-8
        "
      />

      {/* =========================
          BOTTOM
      ========================== */}

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-3
          px-6
          py-6

          sm:px-8

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-stone-400
          "
        >
          © {new Date().getFullYear()} Nandu
          Group of Hostels. All rights
          reserved.
        </p>

        {/* KEEP THIS BRAND SIGNATURE */}

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#183B5B]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#B33A3A]" />

          <p
            className="
              ml-1
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-stone-400
            "
          >
            PG Accommodation · Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}