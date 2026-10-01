import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { formatPrice } from "../utils/formatPrice";

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

export default function CampusCard({
  campus,
  gender,
  openLightbox,
}) {
  const [activeImage, setActiveImage] =
    useState(campus.images[0]);

  const isMen = gender === "men";

  useEffect(() => {
    setActiveImage(campus.images[0]);
  }, [campus]);

  const whatsappMessage = `Hi! I'm interested in ${campus.name}. Is a room available?`;

  const whatsappUrl = `https://wa.me/${
    campus.contact.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.article
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-50px",
      }}
      className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white p-5 sm:p-8 rounded-[2rem] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] border border-stone-200/60"
    >
      {/* IMAGE SECTION */}

      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <button
          type="button"
          className="w-full h-[260px] sm:h-[340px] bg-stone-100 rounded-[1.25rem] overflow-hidden relative cursor-zoom-in group text-left"
          onClick={() =>
            openLightbox(activeImage)
          }
          aria-label={`Expand ${campus.name} image`}
        >
          <img
            src={activeImage}
            alt={`${campus.name} - ${campus.location.display}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-opacity shadow-lg">
              Expand Image
            </span>
          </div>
        </button>

        {/* IMAGE THUMBNAILS */}

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x">
          {campus.images.map(
            (image, index) => (
              <button
                type="button"
                key={`${campus.id}-${index}`}
                onClick={() =>
                  setActiveImage(image)
                }
                aria-label={`View ${
                  campus.name
                } image ${index + 1}`}
                className={`relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-300 ${
                  activeImage === image
                    ? isMen
                      ? "ring-2 ring-slate-800 ring-offset-2 opacity-100"
                      : "ring-2 ring-rose-800 ring-offset-2 opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${campus.name} ${
                    index + 1
                  }`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            )
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        {/* TAG + MAP */}

        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
              isMen
                ? "bg-slate-100 text-slate-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {campus.tagline}
          </span>

          {campus.mapLink && (
            <a
              href={campus.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest transition-colors px-2 py-1 rounded-full ${
                isMen
                  ? "text-slate-500 hover:bg-slate-50"
                  : "text-rose-500 hover:bg-rose-50"
              }`}
            >
              Get Directions
            </a>
          )}
        </div>

        {/* PROPERTY NAME */}

        <h3 className="text-2xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tighter leading-none">
          {campus.name}
        </h3>

        {/* LOCATION */}

        <p className="text-xs text-stone-500 font-medium mt-2">
          {campus.location.display}
        </p>

        {/* NEARBY PLACES */}

        {campus.nearbyPlaces?.length >
          0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {campus.nearbyPlaces.map(
              (place) => (
                <span
                  key={`${campus.id}-${place.name}`}
                  className="px-2.5 py-1 bg-stone-50 border border-stone-200 text-stone-600 text-[9px] font-bold rounded-md shadow-sm"
                >
                  {place.travelTime} to{" "}
                  {place.name}
                </span>
              )
            )}
          </div>
        )}

        {/* AMENITIES */}

        {campus.amenities?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2">
              Amenities
            </h4>

            <div className="flex flex-wrap gap-2">
              {campus.amenities.map(
                (amenity) => (
                  <span
                    key={`${campus.id}-amenity-${amenity}`}
                    className={`px-2.5 py-1 rounded-full border text-[9px] font-semibold ${
                      isMen
                        ? "bg-slate-50 border-slate-200 text-slate-600"
                        : "bg-rose-50 border-rose-100 text-rose-700"
                    }`}
                  >
                    {amenity}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        <hr className="my-5 border-stone-100" />

        {/* MONTHLY PRICING */}

        <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-3">
          Monthly Room Pricing
        </h4>

        <div className="space-y-2 mb-4">
          {campus.roomOptions.map(
            (option) => (
              <div
                key={`${campus.id}-${option.type}`}
                className="flex justify-between items-center border-b border-stone-50 pb-2 gap-2 group"
              >
                <span className="text-xs font-semibold text-stone-600">
                  {option.type}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                      Non-AC
                    </span>

                    <span className="text-sm font-black text-stone-700 leading-none">
                      {formatPrice(
                        option.nonAcPrice
                      )}
                    </span>
                  </div>

                  <div className="w-px h-5 bg-stone-200" />

                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">
                      AC
                    </span>

                    <span className="text-sm font-black text-stone-900 leading-none">
                      {formatPrice(
                        option.acPrice
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* DAILY STAY */}

        {campus.dailyPricing && (
          <div className="flex justify-between items-center bg-stone-50 py-2.5 px-4 rounded-lg border border-stone-100 mb-5">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">
                Flexible Stay
              </span>

              <span className="text-xs font-semibold text-stone-700">
                Daily Basis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                  Non-AC
                </span>

                <span className="text-sm font-black text-stone-700 leading-none">
                  {formatPrice(
                    campus.dailyPricing
                      .nonAcPrice
                  )}

                  <span className="text-[9px] font-normal text-stone-500">
                    /day
                  </span>
                </span>
              </div>

              <div className="w-px h-5 bg-stone-200" />

              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">
                  AC
                </span>

                <span className="text-sm font-black text-stone-900 leading-none">
                  {formatPrice(
                    campus.dailyPricing
                      .acPrice
                  )}

                  <span className="text-[9px] font-normal text-stone-500">
                    /day
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex flex-1 px-6 py-3 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all justify-center items-center active:scale-95 shadow-sm ${
              isMen
                ? "bg-slate-800 hover:bg-slate-900"
                : "bg-rose-800 hover:bg-rose-900"
            }`}
          >
            Check Availability
          </a>

          {campus.contact.phone && (
            <a
              href={`tel:${campus.contact.phone}`}
              className="inline-flex px-6 py-3 border border-stone-300 text-stone-700 text-[10px] font-bold uppercase tracking-widest rounded-full justify-center items-center hover:bg-stone-50 transition-all active:scale-95"
            >
              Call Now
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
