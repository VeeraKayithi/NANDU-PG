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
  BrushCleaning,
  Dumbbell,
  Gamepad2,
  WashingMachine,
  Wifi,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
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
  "House keeping": BrushCleaning,
  "Hot Water": Droplets,
  "Power Backup": Zap,
  CCTV: Camera,
  Gym: Dumbbell,
  "Indoor Games": Gamepad2,
  Laundry: WashingMachine,
};

export default function CampusCard({ campus }) {
  const branchName = campus.name.replace(/^Campus\s+/i, "");

  const whatsappMessage =
    `Hi! I'm interested in ${branchName}. Is a room available?`;

  const whatsappUrl =
    `https://wa.me/${campus.contact.whatsapp}` +
    `?text=${encodeURIComponent(whatsappMessage)}`;

  const monthlyPrices = campus.roomOptions
    .flatMap((room) => [room.nonAcPrice, room.acPrice])
    .filter((price) => typeof price === "number");

  const startingPrice =
    monthlyPrices.length > 0 ? Math.min(...monthlyPrices) : null;



  return (
    <motion.article
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="overflow-hidden rounded-[1.6rem] border border-[var(--pg-border)] bg-[var(--pg-surface)] shadow-[0_10px_30px_rgba(24,59,91,0.08)]"
    >
      {/* PROPERTY IMAGE */}
      <Link
        to={`/pg/${campus.slug}`}
        className="group relative block h-[185px] overflow-hidden bg-stone-100 sm:h-[260px]"
      >
        <img
          src={campus.images[0]}
          alt={`${campus.name} - ${campus.location.display}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <div className="absolute left-3 top-3 rounded-full bg-[#183B5B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
          {campus.gender === "men" ? "Men's PG" : "Women's PG"}
        </div>

        {campus.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
            <Camera size={12} />
            {campus.images.length}
          </div>
        )}
      </Link>

      {/* CARD CONTENT */}
      <div className="p-4 sm:p-5">
        {/* PROPERTY + DIRECTIONS */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[19px] font-black leading-tight tracking-tight text-[var(--pg-heading)] sm:text-2xl">
              {branchName}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="shrink-0 text-[#B33A3A]" />
              <p className="truncate text-[11px] font-medium text-[var(--pg-text-muted)]">
                {campus.location.area}, {campus.location.city}
              </p>
            </div>
          </div>

          {campus.mapLink && (
            <a
              href={campus.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#F0CACA] bg-[#FCECEC] px-3 text-[10px] font-bold uppercase tracking-[0.06em] text-[#B33A3A] shadow-sm transition-all min-[360px]:text-[11px] hover:bg-[#B33A3A] hover:text-white active:scale-95"
            >
              <Navigation size={13} />
              Directions
            </a>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--pg-text-muted)]">
              Starts at
            </p>

            {startingPrice && (
              <div className="mt-1 flex items-end">
                <p className="text-[21px] font-black leading-none text-[var(--pg-heading)] sm:text-[23px]">
                  {formatPrice(startingPrice)}
                </p>
                <span className="ml-1 text-[10px] font-medium text-[var(--pg-text-muted)]">
                  /month onwards
                </span>
              </div>
            )}
          </div>

          <span className="shrink-0 rounded-full bg-[var(--pg-surface-soft)] px-2.5 py-1.5 text-[10px] font-bold text-[var(--pg-heading)]">
            AC & Non-AC
          </span>
        </div>

        {/* =========================
    NEARBY
========================== */}

        {campus.nearbyPlaces?.length > 0 && (
          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--pg-text-muted)]">
              Nearby
            </p>

            <div className="flex flex-wrap gap-1.5">
              {campus.nearbyPlaces
                .slice(0, 2)
                .map((place, index) => {
                  const nearbyLabel =
                    place.distance ||
                    place.travelTime ||
                    place.proximity;

                  return (
                    <span
                      key={`${campus.id}-${place.name}`}
                      className={`
                items-center
                gap-1.5
                max-w-full
                min-w-0
                rounded-lg
                bg-[var(--pg-surface-soft)]
                px-2
                py-1.5
                text-[10px]
                font-medium
                text-[var(--pg-text-muted)]
                ${index === 0
                          ? "inline-flex"
                          : "hidden sm:inline-flex"
                        }
              `}
                    >
                      <MapPin
                        size={10}
                        className="shrink-0 text-[#B33A3A]"
                      />

                      {nearbyLabel && (
                        <>
                          <span className="font-semibold">
                            {nearbyLabel}
                          </span>

                          <span className="text-[var(--pg-border)]">
                            ·
                          </span>
                        </>
                      )}

                      <span className="min-w-0 truncate" title={place.name}>
                        {place.name}
                      </span>
                    </span>
                  );
                })}

              {campus.nearbyPlaces.length > 1 && (
                <span className="inline-flex items-center rounded-lg bg-[var(--pg-surface-soft)] px-2 py-1.5 text-[10px] font-bold text-[var(--pg-heading)] sm:hidden">
                  +{campus.nearbyPlaces.length - 1} nearby
                </span>
              )}
            </div>
          </div>
        )}
        {/* =========================
    AMENITIES
========================== */}

        {campus.amenities?.length > 0 && (
          <div className="mt-3">
            <p
              className="
        mb-2
        text-[10px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-[var(--pg-text-muted)]
      "
            >
              Amenities
            </p>

            <div className="flex flex-wrap gap-1.5">
              {campus.amenities.map((amenity) => {
                const AmenityIcon =
                  AMENITY_ICONS[amenity] || Sparkles;

                return (
                  <span
                    key={`${campus.id}-${amenity}`}
                    className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[var(--pg-border)]
              bg-[var(--pg-surface)]
              px-2.5
              py-1.5
              text-[10px]
              font-medium
              leading-none
              text-[var(--pg-text-muted)]
            "
                  >
                    <AmenityIcon
                      size={11}
                      strokeWidth={2}
                      className="shrink-0 text-[var(--pg-heading)]"
                    />

                    {amenity}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-4 space-y-2">
          <Link
            to={`/pg/${campus.slug}`}
            className="
    flex
    w-full
    min-h-11
    items-center
    justify-center
    rounded-full
    border
    border-[#183B5B]/25
    bg-[var(--pg-surface-soft)]
    px-5
    text-[11px]
    font-bold
    uppercase
    tracking-[0.10em]
    text-[var(--pg-heading)]
    shadow-sm
    transition-all

    hover:border-[#183B5B]
    hover:bg-[#183B5B]
    hover:text-white

    active:scale-[0.98]
  "
          >
            View Details
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-2 text-[10px] font-bold uppercase tracking-[0.05em] text-[#183B5B] shadow-sm transition min-[360px]:text-[11px] hover:bg-[#1FB85A] active:scale-95"
            >
              <FaWhatsapp size={15} />
              WhatsApp
            </a>

            <a
              href={`tel:${campus.contact.phone}`}
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#183B5B] px-2 text-[10px] font-bold uppercase tracking-[0.05em] text-white shadow-sm transition min-[360px]:text-[11px] hover:bg-[#102F4B] active:scale-95"
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
