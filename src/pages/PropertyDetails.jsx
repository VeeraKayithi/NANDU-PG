import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { CAMPUS_DATA } from "../data/campuses";
import { formatPrice } from "../utils/formatPrice";

export default function PropertyDetails() {
  const { slug } = useParams();

  const allCampuses = [
    ...CAMPUS_DATA.men,
    ...CAMPUS_DATA.women,
  ];

  const campus = allCampuses.find(
    (property) => property.slug === slug
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!campus) {
      return;
    }

    document.title = campus.seo.title;

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

  if (!campus) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F0] px-6 text-center">
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

  const whatsappMessage =
    `Hi! I'm interested in ${campus.name}. Is a room available?`;

  const whatsappUrl =
    `https://wa.me/${campus.contact.whatsapp}` +
    `?text=${encodeURIComponent(whatsappMessage)}`;

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
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#F5F5F0]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src="/nandu-logo.svg"
              alt="Nandu PG"
              className="h-10 w-10"
            />

            <div>
              <p className="text-lg font-black uppercase leading-none">
                Nandu
              </p>

              <p className="text-[8px] uppercase tracking-[0.25em] text-stone-400 font-bold mt-1">
                Premium PG
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:text-stone-900"
          >
            ← All PGs
          </Link>
        </div>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="relative h-[360px] sm:h-[520px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
            <img
              src={campus.images[0]}
              alt={`${campus.name} in ${campus.location.area}`}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 text-white">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${isMen
                  ? "bg-slate-800"
                  : "bg-rose-800"
                  }`}
              >
                {campus.tagline}
              </span>

              <h1 className="mt-4 text-3xl sm:text-6xl font-black tracking-tight">
                {campus.name}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-stone-200 max-w-2xl">
                {campus.location.display}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          <div>
            {campus.images.length > 1 && (
              <section>
                <h2 className="text-2xl font-black">
                  Property Photos
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                  {campus.images.map(
                    (image, index) => (
                      <div
                        key={`${campus.id}-gallery-${index}`}
                        className="overflow-hidden rounded-2xl h-40 sm:h-52 bg-stone-200"
                      >
                        <img
                          src={image}
                          alt={`${campus.name} property ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            <section className="mt-10 sm:mt-12">
              <h2 className="text-2xl font-black">
                Amenities
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {campus.amenities.map(
                  (amenity) => (
                    <div
                      key={amenity}
                      className="rounded-xl bg-white border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700"
                    >
                      ✓ {amenity}
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="mt-10 sm:mt-12">
              <h2 className="text-2xl font-black">
                Nearby Places
              </h2>

              <div className="mt-5 space-y-3">
                {campus.nearbyPlaces.map(
                  (place) => (
                    <div
                      key={place.name}
                      className="flex justify-between items-center rounded-xl bg-white border border-stone-200 px-4 py-4 gap-4"
                    >
                      <div>
                        <p className="font-bold text-stone-800">
                          {place.name}
                        </p>

                        <p className="text-xs text-stone-400 mt-1">
                          {place.type}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-stone-600 text-right">
                        {place.travelTime}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="mt-10 sm:mt-12">
              <h2 className="text-2xl font-black">
                Room Pricing
              </h2>

              <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                {campus.roomOptions.map(
                  (option) => (
                    <div
                      key={option.type}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b last:border-b-0 border-stone-100"
                    >
                      <p className="font-bold">
                        {option.type}
                      </p>

                      <div className="flex gap-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                            Non-AC
                          </p>

                          <p className="font-black">
                            {formatPrice(
                              option.nonAcPrice
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                            AC
                          </p>

                          <p className="font-black">
                            {formatPrice(
                              option.acPrice
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28 rounded-[2rem] bg-white border border-stone-200 p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
                Interested in this property?
              </p>

              <h2 className="text-2xl font-black mt-2">
                Check Availability
              </h2>

              <p className="text-sm text-stone-500 mt-2">
                Contact this Nandu PG property directly.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex justify-center rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white ${isMen
                    ? "bg-slate-800 hover:bg-slate-900"
                    : "bg-rose-800 hover:bg-rose-900"
                    }`}
                >
                  WhatsApp
                </a>

                <a
                  href={`tel:${campus.contact.phone}`}
                  className="flex justify-center rounded-full border border-stone-300 px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-50"
                >
                  Call Now
                </a>

                <a
                  href={campus.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center rounded-full border border-stone-300 px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-50"
                >
                  Get Directions
                </a>
              </div>

              <div className="mt-6 border-t border-stone-100 pt-5">
                <p className="text-xs font-bold text-stone-800">
                  {campus.location.area}
                </p>

                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {campus.location.display}
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
