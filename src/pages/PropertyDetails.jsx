import {
  useEffect,
  useState,
} from "react";

import { FaWhatsapp } from "react-icons/fa";

import {
  ArrowLeft,
  BedDouble,
  Building2,
  Camera,
  Droplets,
  Hospital,
  Images,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Train,
  Utensils,
  Wifi,
  Zap,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { CAMPUS_DATA } from "../data/campuses";
import { formatPrice } from "../utils/formatPrice";

const AMENITY_ICONS = {
  "Wi-Fi": Wifi,
  Food: Utensils,
  Housekeeping: Sparkles,
  "Hot Water": Droplets,
  "Power Backup": Zap,
  CCTV: Camera,
};

const getNearbyPlaceIcon = (type = "") => {
  const value = type.toLowerCase();

  if (value.includes("metro")) {
    return Train;
  }

  if (value.includes("hospital")) {
    return Hospital;
  }

  if (
    value.includes("mall") ||
    value.includes("supermarket") ||
    value.includes("shopping")
  ) {
    return ShoppingBag;
  }

  if (
    value.includes("office") ||
    value.includes("business") ||
    value.includes("it")
  ) {
    return Building2;
  }

  return MapPin;
};

export default function PropertyDetails() {
  const { slug } = useParams();

  const allCampuses = [
    ...CAMPUS_DATA.men,
    ...CAMPUS_DATA.women,
  ];

  const campus = allCampuses.find(
    (property) =>
      property.slug === slug
  );

  const [
    galleryOpen,
    setGalleryOpen,
  ] = useState(false);

  const [
    activeImageIndex,
    setActiveImageIndex,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] = useState(0);

  /*
   * PAGE SEO
   */

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!campus) {
      return;
    }

    document.title =
      campus.seo.title;

    const description =
      document.querySelector(
        'meta[name="description"]'
      );

    if (description) {
      description.setAttribute(
        "content",
        campus.seo.description
      );
    }

    return () => {
      document.title =
        "Nandu PG Hyderabad | Men's & Women's PG near HITEC City";

      if (description) {
        description.setAttribute(
          "content",
          "Nandu PG offers men's and women's PG accommodation in HITEC City, Madhapur and Rai Durg, Hyderabad."
        );
      }
    };
  }, [campus]);

  /*
   * GALLERY BODY LOCK + KEYBOARD
   */

  useEffect(() => {
    if (!galleryOpen) {
      document.body.style.overflow =
        "";

      return;
    }

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        setGalleryOpen(false);
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        setDirection(-1);

        setActiveImageIndex(
          (current) =>
            current === 0
              ? campus.images
                .length - 1
              : current - 1
        );
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        setDirection(1);

        setActiveImageIndex(
          (current) =>
            current ===
              campus.images.length -
              1
              ? 0
              : current + 1
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    galleryOpen,
    campus,
  ]);

  /*
   * PROPERTY NOT FOUND
   */

  if (!campus) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F0] px-6 text-center">
        <h1 className="text-4xl font-black text-stone-900">
          Property Not Found
        </h1>

        <p className="mt-3 text-stone-500">
          The PG property you're
          looking for could not be
          found.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  /*
   * PROPERTY VALUES
   */

  const isMen =
    campus.gender === "men";

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
   * GALLERY FUNCTIONS
   */

  const openGallery = (
    index
  ) => {
    setDirection(0);

    setActiveImageIndex(
      index
    );

    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const previousImage =
    () => {
      setDirection(-1);

      setActiveImageIndex(
        (current) =>
          current === 0
            ? campus.images
              .length - 1
            : current - 1
      );
    };

  const nextImage = () => {
    setDirection(1);

    setActiveImageIndex(
      (current) =>
        current ===
          campus.images.length - 1
          ? 0
          : current + 1
    );
  };

  /*
   * STRUCTURED DATA
   */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "LodgingBusiness",

    name: campus.name,

    description:
      campus.seo.description,

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        campus.location.locality,

      addressRegion:
        "Telangana",

      addressCountry:
        "IN",
    },

    telephone:
      `+91${campus.contact.phone}`,

    url:
      `${window.location.origin}/pg/${campus.slug}`,
  };

  return (
    <div
      className="
    min-h-screen
    bg-[#F7F5EF]
    pb-[calc(5.5rem+env(safe-area-inset-bottom))]
    text-stone-900

    lg:pb-0
  "
    >    {/* =========================
          FULL SCREEN IMAGE VIEWER
      ========================== */}

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label={`${campus.name} image gallery`}
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={
                closeGallery
              }
              className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl font-light text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              ×
            </button>

            {/* IMAGE COUNTER */}

            {campus.images
              .length > 1 && (
                <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white/75 backdrop-blur-md">
                  {activeImageIndex +
                    1}
                  {" / "}
                  {
                    campus.images
                      .length
                  }
                </div>
              )}

            {/* PREVIOUS */}

            {campus.images
              .length > 1 && (
                <button
                  type="button"
                  onClick={
                    previousImage
                  }
                  className="absolute left-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white backdrop-blur-md transition hover:bg-white/20 md:flex"
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

            {/* NEXT */}

            {campus.images
              .length > 1 && (
                <button
                  type="button"
                  onClick={
                    nextImage
                  }
                  className="absolute right-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white backdrop-blur-md transition hover:bg-white/20 md:flex"
                  aria-label="Next image"
                >
                  ›
                </button>
              )}

            {/* IMAGE AREA */}

            <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-12 sm:py-20">
              <AnimatePresence
                initial={false}
                custom={
                  direction
                }
                mode="popLayout"
              >
                <motion.img
                  key={
                    activeImageIndex
                  }
                  src={
                    campus.images[
                    activeImageIndex
                    ]
                  }
                  alt={`${campus.name} image ${activeImageIndex +
                    1
                    }`}
                  custom={
                    direction
                  }
                  initial={{
                    opacity: 0,

                    x:
                      direction >
                        0
                        ? 120
                        : direction <
                          0
                          ? -120
                          : 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,

                    x:
                      direction >
                        0
                        ? -120
                        : 120,
                  }}
                  transition={{
                    duration:
                      0.28,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  drag={
                    campus.images
                      .length > 1
                      ? "x"
                      : false
                  }
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={
                    0.16
                  }
                  onDragEnd={(
                    event,
                    info
                  ) => {
                    const distance =
                      info.offset.x;

                    const velocity =
                      info.velocity.x;

                    /*
                     * SWIPE LEFT
                     */

                    if (
                      distance <
                      -70 ||
                      velocity <
                      -500
                    ) {
                      nextImage();

                      return;
                    }

                    /*
                     * SWIPE RIGHT
                     */

                    if (
                      distance >
                      70 ||
                      velocity >
                      500
                    ) {
                      previousImage();
                    }
                  }}
                  className="max-h-full max-w-full cursor-grab select-none rounded-[1.25rem] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.45)] active:cursor-grabbing sm:rounded-[1.5rem]"
                  draggable="false"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          PROPERTY HEADER
      ========================== */}

      <header className="sticky top-0 z-50 border-b border-[#E7E2D8] bg-[#F7F5EF]/95 shadow-[0_4px_16px_rgba(24,59,91,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:h-[92px] sm:px-6">

          {/* LOGO + BRANCH */}

          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)] ring-1 ring-stone-200 sm:h-16 sm:w-16">
              <img
                src="/nandu_group_of_hostels_logo.svg"
                alt="NANDU Group of Hostels"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-black uppercase leading-tight tracking-tight text-[#183B5B] sm:text-lg">
                {branchName}
              </h1>

              <p className="mt-1 truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B33A3A] sm:text-[10px]">
                {isMen
                  ? "Men's PG"
                  : "Women's PG"}

                {" · "}

                {campus.location.area}
              </p>
            </div>
          </Link>

          {/* BACK */}

          <Link
            to="/"
            className="flex shrink-0 items-center justify-center rounded-full border border-[#183B5B]/20 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-[#183B5B] shadow-sm transition-all hover:bg-[#183B5B] hover:text-white active:scale-95 sm:px-5 sm:text-[10px]"
          >
            <span className="flex items-center gap-1.5">
              <ArrowLeft size={14} />
              All PGs
            </span>
          </Link>
        </div>
      </header>

      {/* SEO STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      <main>

        {/* =========================
            MAIN PROPERTY IMAGE
        ========================== */}

        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
          <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] sm:h-[520px] sm:rounded-[2rem]">

            {/* CLICKABLE IMAGE */}

            <button
              type="button"
              onClick={() =>
                openGallery(0)
              }
              className="absolute inset-0 h-full w-full cursor-zoom-in"
              aria-label={`Open ${campus.name} photo gallery`}
            >
              <img
                src={
                  campus
                    .images[0]
                }
                alt={`${campus.name} in ${campus.location.area}`}
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </button>

            {/* DARK OVERLAY */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* PROPERTY INFO */}

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 text-white sm:p-10">
              <span className="inline-flex rounded-full bg-[#183B5B]/90 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-sm">
                {campus.tagline}
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-6xl">
                {
                  campus.name
                }
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-stone-200 sm:text-base">
                {
                  campus.location
                    .display
                }
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            PAGE CONTENT
        ========================== */}

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_360px] lg:gap-10">

          <div>

            {/* =====================
                PROPERTY PHOTOS
            ====================== */}

            {campus.images
              .length > 1 && (
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                      <Images size={18} strokeWidth={2} />
                    </span>

                    Property Photos
                  </h2>
                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">

                    {campus.images.map(
                      (
                        image,
                        index
                      ) => (
                        <button
                          type="button"
                          key={`${campus.id}-gallery-${index}`}
                          onClick={() =>
                            openGallery(
                              index
                            )
                          }
                          className="group relative h-40 overflow-hidden rounded-2xl bg-stone-200 text-left sm:h-52"
                          aria-label={`Open ${campus.name} image ${index +
                            1
                            }`}
                        >
                          <img
                            src={
                              image
                            }
                            alt={`${campus.name} property ${index +
                              1
                              }`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* HOVER */}

                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                            <span className="rounded-full bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                              View
                            </span>
                          </div>
                        </button>
                      )
                    )}

                  </div>
                </section>
              )}

            {/* =====================
                AMENITIES
            ====================== */}

            <section className="mt-10 sm:mt-12">
              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCECEC] text-[#B33A3A]">
                  <Sparkles size={18} strokeWidth={2} />
                </span>

                Amenities
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {campus.amenities.map((amenity) => {
                  const AmenityIcon =
                    AMENITY_ICONS[amenity] || Sparkles;

                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E7E2D8] bg-white px-3 py-3 shadow-sm transition hover:border-[#183B5B]/20"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F0F7] text-[#183B5B]">
                        <AmenityIcon
                          size={17}
                          strokeWidth={2}
                        />
                      </div>

                      <span className="text-xs font-semibold text-stone-700 sm:text-sm">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* =====================
                NEARBY PLACES
            ====================== */}

            <section className="mt-10 sm:mt-12">
              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCECEC] text-[#B33A3A]">
                  <MapPin size={18} strokeWidth={2} />
                </span>
                Nearby Places
              </h2>

              <div className="mt-5 space-y-3">
                {campus.nearbyPlaces.map((place) => {
                  const PlaceIcon =
                    getNearbyPlaceIcon(place.type);

                  return (
                    <div
                      key={place.name}
                      className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white px-4 py-3.5 shadow-sm"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                          <PlaceIcon
                            size={18}
                            strokeWidth={2}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-stone-800">
                            {place.name}
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-stone-400">
                            {place.type}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#F7F5EF] px-2.5 py-1 text-[10px] font-bold text-[#183B5B]">
                        {place.travelTime}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =====================
    ROOM PRICING
====================== */}

            <section className="mt-10 sm:mt-12">

              {/* HEADING */}

              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span
                  className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-xl
        bg-[#E8F0F7]
        text-[#183B5B]
      "
                >
                  <BedDouble
                    size={18}
                    strokeWidth={2}
                  />
                </span>

                Room Pricing
              </h2>


              {/* PRICING CARD */}

              <div
                className="
      mt-5
      overflow-hidden
      rounded-[1.5rem]
      border
      border-[#E7E2D8]
      bg-white
      shadow-[0_8px_24px_rgba(24,59,91,0.06)]
    "
              >

                {/* TABLE HEADER */}

                <div
                  className="
        grid
        grid-cols-[1.3fr_0.8fr_0.8fr]
        items-center
        bg-[#F8F6F1]
        px-4
        py-3
      "
                >
                  <p
                    className="
          text-[8px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-stone-400
        "
                  >
                    Room Type
                  </p>

                  <p
                    className="
          text-center
          text-[8px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-stone-400
        "
                  >
                    Non-AC
                  </p>

                  <p
                    className="
          flex
          items-center
          justify-center
          gap-1
          text-[8px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-[#2878B5]
        "
                  >
                    <Snowflake size={10} />

                    AC
                  </p>
                </div>


                {/* PRICING ROWS */}

                <div>
                  {campus.roomOptions.map(
                    (option, index) => (
                      <div
                        key={option.type}
                        className={`
              grid
              grid-cols-[1.3fr_0.8fr_0.8fr]
              items-center
              px-4
              py-4

              ${index !==
                            campus.roomOptions.length - 1
                            ? "border-b border-[#EEEAE2]"
                            : ""
                          }
            `}
                      >

                        {/* ROOM TYPE */}

                        <div className="min-w-0">
                          <p
                            className="
                  text-[12px]
                  font-bold
                  leading-tight
                  text-stone-800

                  sm:text-sm
                "
                          >
                            {option.type}
                          </p>
                        </div>


                        {/* NON AC PRICE */}

                        <div className="text-center">
                          <p
                            className="
                  text-[12px]
                  font-black
                  leading-none
                  text-stone-900

                  sm:text-sm
                "
                          >
                            {formatPrice(
                              option.nonAcPrice
                            )}
                          </p>
                        </div>


                        {/* AC PRICE */}

                        <div className="text-center">
                          <p
                            className="
                  text-[12px]
                  font-black
                  leading-none
                  text-[#183B5B]

                  sm:text-sm
                "
                          >
                            {formatPrice(
                              option.acPrice
                            )}
                          </p>
                        </div>

                      </div>
                    )
                  )}
                </div>


                {/* SMALL NOTE */}

                <div
                  className="
        border-t
        border-[#E7E2D8]
        bg-[#FCFBF8]
        px-4
        py-2.5
      "
                >
                  <p
                    className="
          text-[8px]
          font-medium
          leading-relaxed
          text-stone-400
        "
                  >
                    Monthly pricing · Room availability may vary
                  </p>
                </div>

              </div>
            </section>
          </div>

          {/* =========================
              CONTACT CARD
          ========================== */}

          <aside>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">

              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Interested in this
                property?
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Check Availability
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Contact this Nandu PG
                property directly.
              </p>

              {/* CONTACT ACTIONS */}

              <div className="mt-6 space-y-3">

                {/* WHATSAPP */}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-[#1FB85A] active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </span>
                </a>
                {/* CALL */}

                <a
                  href={`tel:${campus.contact.phone}`}
                  className="flex justify-center rounded-full bg-[#183B5B] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-[#102F4B] active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Call Now
                  </span>
                </a>
                {/* MAP */}

                <a
                  href={campus.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
    flex
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[#B33A3A]
    px-6
    py-3.5
    text-xs
    font-bold
    uppercase
    tracking-widest
    text-white
    shadow-sm
    transition

    hover:bg-[#982F2F]
    active:scale-95
  "
                >
                  <Navigation size={16} />

                  Get Directions
                </a>
              </div>

              {/* ADDRESS */}

              <div className="mt-6 border-t border-stone-100 pt-5">
                <p className="text-xs font-bold text-stone-800">
                  {
                    campus.location
                      .area
                  }
                </p>

                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {
                    campus.location
                      .display
                  }
                </p>
              </div>
            </div>
          </aside>

        </section>
      </main>
      {/* =========================
    MOBILE CONTACT BAR
========================== */}

      <div
        className="
    fixed
    inset-x-0
    bottom-0
    z-[80]
    border-t
    border-[#E7E2D8]
    bg-[#F7F5EF]/95
    px-2.5
    pt-2.5
    pb-[calc(0.625rem+env(safe-area-inset-bottom))]
    shadow-[0_-6px_20px_rgba(24,59,91,0.12)]
    backdrop-blur-xl

    lg:hidden
  "
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">

          {/* WHATSAPP */}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5
        rounded-full
        bg-[#25D366]
        px-2
        py-2.5
        text-[8px]
        font-bold
        uppercase
        tracking-[0.06em]
        text-white
        shadow-sm

        active:scale-95
      "
          >
            <FaWhatsapp
              size={14}
              className="shrink-0"
            />

            <span>WhatsApp</span>
          </a>


          {/* CALL */}

          <a
            href={`tel:${campus.contact.phone}`}
            className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5
        rounded-full
        bg-[#183B5B]
        px-2
        py-2.5
        text-[8px]
        font-bold
        uppercase
        tracking-[0.06em]
        text-white
        shadow-sm

        active:scale-95
      "
          >
            <Phone
              size={13}
              className="shrink-0"
            />

            <span>Call</span>
          </a>


          {/* DIRECTIONS */}

          <a
            href={campus.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5
        rounded-full
        bg-[#B33A3A]
        px-2
        py-2.5
        text-[8px]
        font-bold
        uppercase
        tracking-[0.05em]
        text-white
        shadow-sm

        active:scale-95
      "
          >
            <Navigation
              size={13}
              className="shrink-0"
            />

            <span>Directions</span>
          </a>

        </div>
      </div>
    </div>
  );
}