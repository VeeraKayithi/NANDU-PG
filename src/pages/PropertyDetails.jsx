import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowLeft,
  BedDouble,
  BrushCleaning,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Dumbbell,
  ExternalLink,
  Gamepad2,
  Hospital,
  Images,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Train,
  Utensils,
  WashingMachine,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CAMPUS_DATA } from "../data/campuses";
import { formatPrice } from "../utils/formatPrice";
import Footer from "../components/Footer";

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
const getNearbyPlaceIcon = (type = "") => {
  const value = type.toLowerCase();

  if (value.includes("metro")) return Train;
  if (value.includes("hospital")) return Hospital;

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
  const navigate = useNavigate();

  const allCampuses = [...CAMPUS_DATA.men, ...CAMPUS_DATA.women];
  const campus = allCampuses.find((property) => property.slug === slug);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const galleryDialogRef = useRef(null);
  const galleryCloseButtonRef = useRef(null);
  const galleryTriggerRef = useRef(null);

  /* =========================
     PAGE SEO - R01
  ========================== */

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!campus) return;

    const propertyUrl = `${window.location.origin}/pg/${campus.slug}`;

    const setMetaContent = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute("content", value);
    };

    const setLinkHref = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute("href", value);
    };

    document.title = campus.seo.title;

    setMetaContent('meta[name="description"]', campus.seo.description);
    setLinkHref('link[rel="canonical"]', propertyUrl);
    setMetaContent('meta[property="og:title"]', campus.seo.title);
    setMetaContent('meta[property="og:description"]', campus.seo.description);
    setMetaContent('meta[property="og:url"]', propertyUrl);
    setMetaContent('meta[name="twitter:title"]', campus.seo.title);
    setMetaContent(
      'meta[name="twitter:description"]',
      campus.seo.description
    );

    return () => {
      const homepageUrl = `${window.location.origin}/`;

      document.title =
        "Nandu PG Hyderabad | Men's & Women's PG near HITEC City";

      setMetaContent(
        'meta[name="description"]',
        "Nandu PG offers men's and women's PG accommodation in HITEC City, Madhapur and Rai Durg, Hyderabad with flexible room options, amenities and direct property enquiries."
      );

      setLinkHref('link[rel="canonical"]', homepageUrl);
      setMetaContent(
        'meta[property="og:title"]',
        "Nandu PG Hyderabad | Men's & Women's PG"
      );
      setMetaContent(
        'meta[property="og:description"]',
        "Explore Nandu PG accommodation across Hyderabad's major IT corridors with room pricing, amenities, maps and direct WhatsApp enquiries."
      );
      setMetaContent('meta[property="og:url"]', homepageUrl);
      setMetaContent('meta[name="twitter:title"]', "Nandu PG Hyderabad");
      setMetaContent(
        'meta[name="twitter:description"]',
        "Men's and women's PG accommodation near Hyderabad's major IT hubs."
      );
    };
  }, [campus]);

  /* =========================
     GALLERY BODY LOCK + KEYBOARD
  ========================== */

  useEffect(() => {
    if (!galleryOpen || !campus) return;

    const previousBodyOverflow = document.body.style.overflow;
    const triggerElement = galleryTriggerRef.current;

    document.body.style.overflow = "hidden";

    const focusCloseButton = window.requestAnimationFrame(() => {
      galleryCloseButtonRef.current?.focus();
    });

    const getFocusableElements = () => {
      if (!galleryDialogRef.current) return [];

      return Array.from(
        galleryDialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setGalleryOpen(false);
        return;
      }

      if (event.key === "ArrowLeft" && campus.images.length > 1) {
        event.preventDefault();
        setDirection(-1);
        setActiveImageIndex((current) =>
          current === 0 ? campus.images.length - 1 : current - 1
        );
        return;
      }

      if (event.key === "ArrowRight" && campus.images.length > 1) {
        event.preventDefault();
        setDirection(1);
        setActiveImageIndex((current) =>
          current === campus.images.length - 1 ? 0 : current + 1
        );
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      window.requestAnimationFrame(() => {
        if (triggerElement?.isConnected) {
          triggerElement.focus();
        }
      });
    };
  }, [galleryOpen, campus]);

  if (!campus) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F0] px-6 text-center">
        <h1 className="text-4xl font-black text-stone-900">
          Property Not Found
        </h1>
        <p className="mt-3 text-stone-500">
          The PG property you're looking for could not be found.
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

  const isMen = campus.gender === "men";
  const branchName = campus.name.replace(/^Campus\s+/i, "");

  const whatsappMessage =
    `Hi! I'm interested in ${campus.name}. Is a room available?`;

  const whatsappUrl =
    `https://wa.me/${campus.contact.whatsapp}` +
    `?text=${encodeURIComponent(whatsappMessage)}`;

  const openGallery = (index, triggerElement) => {
    galleryTriggerRef.current = triggerElement ?? document.activeElement;
    setDirection(0);
    setActiveImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => setGalleryOpen(false);

  const previousImage = () => {
    setDirection(-1);
    setActiveImageIndex((current) =>
      current === 0 ? campus.images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setDirection(1);
    setActiveImageIndex((current) =>
      current === campus.images.length - 1 ? 0 : current + 1
    );
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: campus.name,
    description: campus.seo.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: campus.location.locality,
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    telephone: `+91${campus.contact.phone}`,
    url: `${window.location.origin}/pg/${campus.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-stone-900 lg:pb-0">
      {/* FULL SCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            ref={galleryDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${campus.name} image gallery`}
          >
            <button
              ref={galleryCloseButtonRef}
              type="button"
              onClick={closeGallery}
              className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-black/35 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              <X size={21} strokeWidth={2} />
            </button>

            {campus.images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white/75 backdrop-blur-md">
                {activeImageIndex + 1} / {campus.images.length}
              </div>
            )}

            {campus.images.length > 1 && (
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-black/35 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 md:flex"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
            )}

            {campus.images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-black/35 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 md:flex"
                aria-label="Next image"
              >
                <ChevronRight size={24} strokeWidth={2} />
              </button>
            )}

            <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-12 sm:py-20">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={activeImageIndex}
                  src={campus.images[activeImageIndex]}
                  alt={`${campus.name} image ${activeImageIndex + 1}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 120 : direction < 0 ? -120 : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -120 : 120,
                  }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  drag={campus.images.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(event, info) => {
                    const distance = info.offset.x;
                    const velocity = info.velocity.x;

                    if (distance < -70 || velocity < -500) {
                      nextImage();
                      return;
                    }

                    if (distance > 70 || velocity > 500) {
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

      {/* PROPERTY HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#E7E2D8] bg-[#F7F5EF]/95 shadow-[0_4px_16px_rgba(24,59,91,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:h-[92px] sm:px-6">
          <Link to={`/?gender=${campus.gender}#pg-locations`} className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)] ring-1 ring-stone-200 sm:h-16 sm:w-16">
              <img
                src="/nandu_group_of_hostels_logo.svg"
                alt="NANDU Group of Hostels"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-black uppercase leading-tight tracking-tight text-[#183B5B] sm:text-lg">
                {branchName}
              </p>

              <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B33A3A] sm:text-[11px]">
                {isMen ? "Men's PG" : "Women's PG"} · {campus.location.area}
              </p>
            </div>
          </Link>

          <Link
            to={`/?gender=${campus.gender}#pg-locations`}
            className="flex min-h-11 shrink-0 items-center justify-center rounded-full border border-[#183B5B]/20 bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-[#183B5B] shadow-sm transition-all hover:bg-[#183B5B] hover:text-white active:scale-95 sm:px-5"
          >
            <span className="flex items-center gap-1.5">
              <ArrowLeft size={14} />
              All PGs
            </span>
          </Link>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        {/* MAIN PROPERTY IMAGE */}
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
          <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] sm:h-[520px] sm:rounded-[2rem]">
            <button
              type="button"
              onClick={(event) => openGallery(0, event.currentTarget)}
              className="absolute inset-0 h-full w-full cursor-zoom-in"
              aria-label={`Open ${campus.name} photo gallery`}
            >
              <img
                src={campus.images[0]}
                alt={`${campus.name} in ${campus.location.area}`}
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </button>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 text-white sm:p-10">
              <span className="inline-flex rounded-full bg-[#183B5B]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-sm">
                {campus.tagline}
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-6xl">
                {campus.name}
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-stone-200 sm:text-base">
                {campus.location.display}
              </p>
            </div>
          </div>
        </section>

        {/* PAGE CONTENT */}
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_360px] lg:gap-10">
          <div className="flex flex-col">
            {/* PROPERTY PHOTOS */}
            {campus.images.length > 1 && (
              <section className="order-2 mt-10 sm:mt-12 lg:order-1 lg:mt-0">
                <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                    <Images size={18} strokeWidth={2} />
                  </span>
                  Property Photos
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {campus.images.map((image, index) => (
                    <button
                      type="button"
                      key={`${campus.id}-gallery-${index}`}
                      onClick={(event) => openGallery(index, event.currentTarget)}
                      className="group relative h-40 overflow-hidden rounded-2xl bg-stone-200 text-left sm:h-52"
                      aria-label={`Open ${campus.name} image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${campus.name} property ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                        <span className="rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          View
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* AMENITIES */}
            <section className="order-3 mt-10 sm:mt-12 lg:order-2">
              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCECEC] text-[#B33A3A]">
                  <Sparkles size={18} strokeWidth={2} />
                </span>
                Amenities
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {campus.amenities.map((amenity) => {
                  const AmenityIcon = AMENITY_ICONS[amenity] || Sparkles;

                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E7E2D8] bg-white px-3 py-3 shadow-sm transition hover:border-[#183B5B]/20"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F0F7] text-[#183B5B]">
                        <AmenityIcon size={17} strokeWidth={2} />
                      </div>
                      <span className="text-xs font-semibold text-stone-700 sm:text-sm">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* NEARBY PLACES */}
            <section className="order-4 mt-10 sm:mt-12 lg:order-3">
              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCECEC] text-[#B33A3A]">
                  <MapPin size={18} strokeWidth={2} />
                </span>
                Nearby Places
              </h2>

              <div className="mt-5 space-y-3">
                {campus.nearbyPlaces.map((place) => {
                  const PlaceIcon = getNearbyPlaceIcon(place.type);

                  const proximityLabel =
                    place.distance ||
                    place.travelTime ||
                    place.proximity;

                  const content = (
                    <>
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                          <PlaceIcon size={18} strokeWidth={2} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-stone-800">
                            {place.name}
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-stone-500">
                            {place.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {proximityLabel && (
                          <span className="rounded-full bg-[#F7F5EF] px-2.5 py-1 text-[10px] font-bold text-[#183B5B]">
                            {proximityLabel}
                          </span>
                        )}

                        {place.mapUrl && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                            <ExternalLink size={15} strokeWidth={2} />
                          </span>
                        )}
                      </div>
                    </>
                  );

                  if (place.mapUrl) {
                    return (
                      <a
                        key={place.name}
                        href={place.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${place.name} in Google Maps`}
                        className="
            flex min-h-14 items-center justify-between gap-4
            rounded-xl
            border border-stone-200
            bg-white
            px-4 py-3.5
            shadow-sm
            transition-all
            hover:border-[#183B5B]/30
            hover:shadow-md
            active:scale-[0.99]
          "
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={place.name}
                      className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white px-4 py-3.5 shadow-sm"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ROOM PRICING */}
            <section className="order-1 lg:order-4 lg:mt-12">
              <h2 className="flex items-center gap-2 text-xl font-black text-stone-900 sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#183B5B]">
                  <BedDouble size={18} strokeWidth={2} />
                </span>
                Room Pricing
              </h2>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#E7E2D8] bg-white shadow-[0_8px_24px_rgba(24,59,91,0.06)]">
                <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr] items-center bg-[#F8F6F1] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                    Room Type
                  </p>
                  <p className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">
                    Non-AC
                  </p>
                  <p className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2878B5]">
                    <Snowflake size={11} />
                    AC
                  </p>
                </div>

                <div>
                  {campus.roomOptions.map((option, index) => (
                    <div
                      key={option.type}
                      className={`grid grid-cols-[1.3fr_0.8fr_0.8fr] items-center px-4 py-4 ${index !== campus.roomOptions.length - 1
                        ? "border-b border-[#EEEAE2]"
                        : ""
                        }`}
                    >
                      <div className="min-w-0">
                        <p className="text-[12px] font-bold leading-tight text-stone-800 sm:text-sm">
                          {option.type}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-[12px] font-black leading-none text-stone-900 sm:text-sm">
                          {formatPrice(option.nonAcPrice)}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-[12px] font-black leading-none text-[#183B5B] sm:text-sm">
                          {formatPrice(option.acPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E7E2D8] bg-[#FCFBF8] px-4 py-2.5">
                  <p className="text-[10px] font-medium leading-relaxed text-stone-400">
                    Monthly pricing · Room availability may vary
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* CONTACT CARD */}
          <aside>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Interested in this property?
              </p>
              <h2 className="mt-2 text-2xl font-black">Check Availability</h2>
              <p className="mt-2 text-sm text-stone-500">
                Contact this Nandu PG property directly.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 justify-center rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#183B5B] shadow-sm transition hover:bg-[#1FB85A] active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </span>
                </a>

                <a
                  href={`tel:${campus.contact.phone}`}
                  className="flex min-h-11 justify-center rounded-full bg-[#183B5B] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-[#102F4B] active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Call Now
                  </span>
                </a>

                <a
                  href={campus.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#B33A3A] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-[#982F2F] active:scale-95"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
              </div>

              <div className="mt-6 border-t border-stone-100 pt-5">
                <p className="text-xs font-bold text-stone-800">
                  {campus.location.area}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {campus.location.display}
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* SHARED FOOTER — SAME COMPONENT AS HOMEPAGE */}
      <Footer
        showCampuses={(gender) =>
          navigate(`/?gender=${gender}#pg-locations`)
        }
      />

      {/* MOBILE CONTACT BAR - PRESERVED LAYOUT */}
      <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-[#E7E2D8] bg-[#F7F5EF]/95 px-2.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(24,59,91,0.12)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-full bg-[#25D366] px-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-[#183B5B] shadow-sm min-[360px]:text-[11px] active:scale-95"
          >
            <FaWhatsapp size={14} className="shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${campus.contact.phone}`}
            className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-full bg-[#183B5B] px-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-white shadow-sm min-[360px]:text-[11px] active:scale-95"
          >
            <Phone size={13} className="shrink-0" />
            <span>Call</span>
          </a>

          <a
            href={campus.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-full bg-[#B33A3A] px-1 text-[10px] font-bold uppercase tracking-[0.02em] text-white shadow-sm min-[360px]:text-[11px] active:scale-95"
          >
            <Navigation size={13} className="shrink-0" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
