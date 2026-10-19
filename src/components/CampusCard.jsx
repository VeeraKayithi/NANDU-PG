import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Camera,
  Droplets,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Utensils,
  Wifi,
  Zap,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { formatPrice } from "../utils/formatPrice";


const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


const AMENITY_ICONS = {
  "Wi-Fi": Wifi,
  Food: Utensils,
  Housekeeping: Sparkles,
  "Hot Water": Droplets,
  "Power Backup": Zap,
  CCTV: Camera,
};


export default function CampusCard({
  campus,
}) {
  const branchName =
    campus.name.replace(
      /^Campus\s+/i,
      ""
    );

  const whatsappMessage =
    `Hi! I'm interested in ${campus.name}. Is a room available?`;

  const whatsappUrl =
    `https://wa.me/${campus.contact.whatsapp}` +
    `?text=${encodeURIComponent(
      whatsappMessage
    )}`;


  /*
   * FIND LOWEST MONTHLY PRICE
   */

  const monthlyPrices =
    campus.roomOptions
      .flatMap((room) => [
        room.nonAcPrice,
        room.acPrice,
      ])
      .filter(
        (price) =>
          typeof price === "number"
      );

  const startingPrice =
    monthlyPrices.length > 0
      ? Math.min(
        ...monthlyPrices
      )
      : null;


  return (
    <motion.article
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-40px",
      }}
      className="
        overflow-hidden
        rounded-[1.6rem]
        border
        border-[#E7E2D8]
        bg-white
        shadow-[0_10px_30px_rgba(24,59,91,0.08)]
      "
    >

      {/* =========================
          PROPERTY IMAGE
      ========================== */}

      <Link
        to={`/pg/${campus.slug}`}
        className="
          group
          relative
          block
          h-[220px]
          overflow-hidden
          bg-stone-100

          sm:h-[260px]
        "
      >
        <img
          src={campus.images[0]}
          alt={`${campus.name} - ${campus.location.display}`}
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700

            group-hover:scale-105
          "
        />

        {/* SUBTLE IMAGE GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />


        {/* MEN / WOMEN BADGE */}

        <div
          className="
            absolute
            left-3
            top-3
            rounded-full
            bg-[#183B5B]
            px-3
            py-1.5
            text-[8px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-white
            shadow-sm
          "
        >
          {campus.gender === "men"
            ? "Men's PG"
            : "Women's PG"}
        </div>


        {/* PHOTO COUNT */}

        {campus.images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              right-3
              flex
              items-center
              gap-1.5
              rounded-full
              bg-black/55
              px-2.5
              py-1.5
              text-[8px]
              font-semibold
              text-white
              backdrop-blur-md
            "
          >
            <Camera size={11} />

            {campus.images.length}
          </div>
        )}
      </Link>


      {/* =========================
          CARD CONTENT
      ========================== */}

      <div className="p-5">

        {/* NAME + MAP */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">

            <h3
              className="
                text-[20px]
                font-black
                leading-tight
                tracking-tight
                text-[#183B5B]

                sm:text-2xl
              "
            >
              {branchName}
            </h3>


            {/* LOCATION */}

            <div className="mt-1.5 flex items-center gap-1.5">
              <MapPin
                size={13}
                className="shrink-0 text-[#B33A3A]"
              />

              <p className="truncate text-[11px] font-medium text-stone-500">
                {campus.location.area},{" "}
                {campus.location.city}
              </p>
            </div>
          </div>


          {/* MAP */}

          {campus.mapLink && (
            <a
              href={campus.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                shrink-0
                items-center
                gap-1
                rounded-full
                px-2
                py-1
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#B33A3A]
                transition

                hover:bg-[#FCECEC]
              "
            >
              <Navigation size={11} />

              Map
            </a>
          )}
        </div>


        {/* =========================
            NEARBY PLACES
        ========================== */}

        {campus.nearbyPlaces?.length >
          0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">

              {campus.nearbyPlaces
                .slice(0, 2)
                .map(
                  (place) => (
                    <span
                      key={`${campus.id}-${place.name}`}
                      className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-lg
                      bg-[#F7F5EF]
                      px-2
                      py-1.5
                      text-[8px]
                      font-medium
                      text-stone-600
                    "
                    >
                      <MapPin
                        size={9}
                        className="text-[#B33A3A]"
                      />

                      {place.travelTime}

                      <span className="text-stone-300">
                        ·
                      </span>

                      {place.name}
                    </span>
                  )
                )}
            </div>
          )}


        {/* DIVIDER */}

        <div className="my-4 h-px bg-[#E7E2D8]" />


        {/* =========================
            STARTING PRICE
        ========================== */}

        <div
          className="
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div>

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-stone-400
              "
            >
              Starting From
            </p>

            {startingPrice && (
              <p className="mt-1 text-xl font-black text-[#183B5B]">
                {formatPrice(
                  startingPrice
                )}

                <span className="ml-0.5 text-[10px] font-medium text-stone-400">
                  /month
                </span>
              </p>
            )}
          </div>


          {/* AC INFORMATION */}

          <div className="text-right">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#E8F0F7]
                px-2.5
                py-1
                text-[8px]
                font-bold
                text-[#183B5B]
              "
            >
              AC & Non-AC
            </span>
          </div>
        </div>


        {/* =========================
            AMENITIES
        ========================== */}

        {campus.amenities?.length >
          0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">

              {campus.amenities
                .slice(0, 4)
                .map(
                  (amenity) => {
                    const AmenityIcon =
                      AMENITY_ICONS[
                      amenity
                      ] ||
                      Sparkles;

                    return (
                      <span
                        key={`${campus.id}-${amenity}`}
                        className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        border
                        border-[#D9E4EE]
                        bg-white
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-medium
                        text-stone-600
                      "
                      >
                        <AmenityIcon
                          size={10}
                          className="text-[#183B5B]"
                        />

                        {amenity}
                      </span>
                    );
                  }
                )}
            </div>
          )}


        {/* =========================
            ACTION BUTTONS
        ========================== */}

        <div className="mt-5 space-y-2">

          {/* VIEW DETAILS */}

          <Link
            to={`/pg/${campus.slug}`}
            className="
    flex
    w-full
    items-center
    justify-center
    rounded-full
    bg-[#183B5B]
    px-5
    py-3
    text-[9px]
    font-bold
    uppercase
    tracking-[0.12em]
    text-white
    shadow-sm
    transition-all

    hover:bg-[#102F4B]
    active:scale-[0.98]
  "
          >
            View Details
          </Link>

          {/* WHATSAPP + CALL */}

          <div className="grid grid-cols-2 gap-2">

            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#25D366]
                px-3
                py-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-white
                shadow-sm
                transition

                hover:bg-[#1FB85A]
                active:scale-95
              "
            >
              <FaWhatsapp size={15} />

              WhatsApp
            </a>


            {/* CALL */}

            <a
              href={`tel:${campus.contact.phone}`}
              className="
    flex
    items-center
    justify-center
    gap-1.5
    rounded-full
    bg-[#B33A3A]
    px-3
    py-3
    text-[9px]
    font-bold
    uppercase
    tracking-[0.1em]
    text-white
    shadow-sm
    transition

    hover:bg-[#982F2F]
    active:scale-95
  "
            >
              <Phone size={13} />

              Call
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}