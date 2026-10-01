import ashwa1 from "../assets/ashwamedha-1.jpg";
import ashwa2 from "../assets/ashwamedha-2.jpg";
import ashwa3 from "../assets/ashwamedha-3.jpg";
import ashwa4 from "../assets/ashwamedha-4.jpg";
import ashwa5 from "../assets/ashwamedha-5.jpg";
import ashwa6 from "../assets/ashwamedha-6.jpg";

import himavana1 from "../assets/trinetra-1.jpg";
import himavana2 from "../assets/trinetra-2.jpg";
import himavana3 from "../assets/trinetra-3.jpg";
import himavana4 from "../assets/trinetra-4.jpg";

import sindhoor1 from "../assets/sindhoor-1.jpg";
import sindhoor2 from "../assets/sindhoor-2.jpg";
import sindhoor3 from "../assets/sindhoor-3.jpg";
import sindhoor4 from "../assets/sindhoor-4.jpg";

import skanda1 from "../assets/skanda-1.jpg";
import skanda2 from "../assets/skanda-2.jpg";
import skanda3 from "../assets/skanda-3.jpg";
import skanda4 from "../assets/skanda-4.jpg";
import skanda5 from "../assets/skanda-5.jpg";
import skanda6 from "../assets/skanda-6.jpg";

import fallbackPropertyImage from "../assets/main.jpg";

const DEFAULT_ROOM_OPTIONS = [
  {
    type: "Single Room",
    nonAcPrice: 15000,
    acPrice: 17000,
  },
  {
    type: "Two Sharing",
    nonAcPrice: 8500,
    acPrice: 10500,
  },
  {
    type: "Three Sharing",
    nonAcPrice: 6500,
    acPrice: 8500,
  },
  {
    type: "Four Sharing",
    nonAcPrice: 5500,
    acPrice: 7500,
  },
];

const DEFAULT_DAILY_PRICING = {
  nonAcPrice: 500,
  acPrice: 800,
};

const BASIC_AMENITIES = [
  "Wi-Fi",
  "Food",
  "Housekeeping",
  "Hot Water",
  "Power Backup",
  "CCTV",
];

export const CAMPUS_DATA = {
  men: [
    {
      id: "ashwamedha",
      slug: "ashwamedha-mens-pg-hitec-city",
      name: "Campus Ashwamedha",
      gender: "men",
      tagline: "Independent Men's PG",

      location: {
        locality: "Patrika Nagar",
        area: "HITEC City",
        city: "Hyderabad",
        display:
          "Patrika Nagar, HITEC City, Hyderabad, Telangana 500081",
      },

      contact: {
        phone: "9133199933",
        whatsapp: "919133199933",
      },

      mapLink:
        "https://maps.app.goo.gl/ANdyFUyT8QXQ6sA88?g_st=ic",

      images: [
        ashwa1,
        ashwa2,
        ashwa3,
        ashwa4,
        ashwa5,
        ashwa6,
      ],

      nearbyPlaces: [
        {
          name: "Raheja Mindspace",
          travelTime: "~0.8 km",
          type: "IT Park",
        },
        {
          name: "HITEC City Metro",
          travelTime: "Under 1 km",
          type: "Metro",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Ashwamedha Men's PG in HITEC City | Nandu PG",
        description:
          "Nandu Men's PG in Patrika Nagar, HITEC City, Hyderabad, near Raheja Mindspace and HITEC City Metro.",
      },
    },

    {
      id: "indraprastha",
      slug: "indraprastha-mens-pg-madhapur",
      name: "Campus Indraprastha",
      gender: "men",
      tagline: "Independent Men's PG",

      location: {
        locality: "Siddhi Vinayak Nagar",
        area: "Madhapur",
        city: "Hyderabad",
        display:
          "59, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081",
      },

      contact: {
        phone: "9666579933",
        whatsapp: "919666579933",
      },

      mapLink:
        "https://maps.app.goo.gl/oXco6QaqDXRs4dKB8?g_st=ic",

      images: [fallbackPropertyImage],

      nearbyPlaces: [
        {
          name: "Yashoda Hospitals HITEC City",
          travelTime: "~0.7 km",
          type: "Hospital",
        },
        {
          name: "HITEC City Metro",
          travelTime: "~1.2 km",
          type: "Metro",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Indraprastha Men's PG in Madhapur | Nandu PG",
        description:
          "Nandu Men's PG in Siddhi Vinayak Nagar, Madhapur, Hyderabad, near HITEC City Metro and major IT offices.",
      },
    },

    {
      id: "samaveda",
      slug: "samaveda-mens-pg-hitec-city",
      name: "Campus Samaveda",
      gender: "men",
      tagline: "Independent Men's PG",

      location: {
        locality: "Vittal Rao Nagar",
        area: "HITEC City",
        city: "Hyderabad",
        display:
          "Plot No 53, Vittal Rao Nagar, HITEC City, Hyderabad, Telangana 500081",
      },

      contact: {
        phone: "9966677570",
        whatsapp: "919966677570",
      },

      mapLink:
        "https://maps.app.goo.gl/GbCtfFNEjB8E653F8?g_st=ic",

      images: [fallbackPropertyImage],

      nearbyPlaces: [
        {
          name: "Durgam Cheruvu Metro",
          travelTime: "~0.3 km",
          type: "Metro",
        },
        {
          name: "HITEC City Metro",
          travelTime: "~0.6 km",
          type: "Metro",
        },
        {
          name: "Inorbit Mall",
          travelTime: "~1.1 km",
          type: "Shopping",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Samaveda Men's PG in HITEC City | Nandu PG",
        description:
          "Nandu Men's PG in Vittal Rao Nagar, HITEC City, Hyderabad, close to Durgam Cheruvu Metro, HITEC City Metro and Inorbit Mall.",
      },
    },

    {
      id: "himavana",
      slug: "himavana-mens-pg-raidurg",
      name: "Campus Himavana",
      gender: "men",
      tagline: "Independent Men's PG",

      location: {
        locality: "Prashant Hills",
        area: "Rai Durg",
        city: "Hyderabad",
        display:
          "Khajaguda - Nanakramguda Rd, Timber Lake Colony, Prashant Hills, Rai Durg, Hyderabad, Telangana 500104",
      },

      contact: {
        phone: "9133199966",
        whatsapp: "919133199966",
      },

      mapLink:
        "https://maps.app.goo.gl/3WhzKpbyZM3LgFYB8?g_st=ic",

      images: [
        himavana1,
        himavana2,
        himavana3,
        himavana4,
      ],

      nearbyPlaces: [
        {
          name: "Hyderabad Knowledge City",
          travelTime: "Short drive",
          type: "IT Hub",
        },
        {
          name: "Financial District",
          travelTime: "Short drive",
          type: "Business District",
        },
        {
          name: "Raidurg Metro",
          travelTime: "Nearby",
          type: "Metro",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Himavana Men's PG in Rai Durg | Nandu PG",
        description:
          "Nandu Men's PG in Prashant Hills, Rai Durg, Hyderabad, with convenient access to Knowledge City and the Financial District.",
      },
    },
  ],

  women: [
    {
      id: "sindhoor",
      slug: "sindhoor-womens-pg-madhapur",
      name: "Campus Sindhoor",
      gender: "women",
      tagline: "Secure Women's PG",

      location: {
        locality: "Ayyappa Society",
        area: "Madhapur",
        city: "Hyderabad",
        display:
          "Plot No 168, Road No 9, opposite International Taika Martial Arts Academy, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081",
      },

      contact: {
        phone: "9133199977",
        whatsapp: "919133199977",
      },

      mapLink:
        "https://maps.app.goo.gl/vc1hXU2EftEC2aNb9?g_st=ic",

      images: [
        sindhoor1,
        sindhoor2,
        sindhoor3,
        sindhoor4,
      ],

      nearbyPlaces: [
        {
          name: "Durgam Cheruvu Metro",
          travelTime: "5-10 mins",
          type: "Metro",
        },
        {
          name: "Raheja Mindspace",
          travelTime: "~1.2 km",
          type: "IT Park",
        },
        {
          name: "Ratnadeep Supermarket",
          travelTime: "~1 km",
          type: "Supermarket",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Sindhoor Women's PG in Madhapur | Nandu PG",
        description:
          "Nandu Women's PG in Ayyappa Society, Madhapur, Hyderabad, near Durgam Cheruvu Metro and Raheja Mindspace.",
      },
    },

    {
      id: "skanda",
      slug: "skanda-womens-pg-raidurg",
      name: "Campus Skanda",
      gender: "women",
      tagline: "Secure Women's PG",

      location: {
        locality: "Prashant Hills",
        area: "Rai Durg",
        city: "Hyderabad",
        display:
          "Road No 4, Plot No 283, Prashant Hills, Rai Durg, Hyderabad, Telangana 500032",
      },

      contact: {
        phone: "9966677560",
        whatsapp: "919966677560",
      },

      mapLink:
        "https://maps.app.goo.gl/M2Za8iRkErmgUbVF7?g_st=ic",

      images: [
        skanda1,
        skanda2,
        skanda3,
        skanda4,
        skanda5,
        skanda6,
      ],

      nearbyPlaces: [
        {
          name: "Hyderabad Knowledge City",
          travelTime: "Short drive",
          type: "IT Hub",
        },
        {
          name: "Financial District",
          travelTime: "Short drive",
          type: "Business District",
        },
        {
          name: "Raidurg Metro",
          travelTime: "Nearby",
          type: "Metro",
        },
      ],

      roomOptions: DEFAULT_ROOM_OPTIONS,
      dailyPricing: DEFAULT_DAILY_PRICING,
      amenities: BASIC_AMENITIES,

      seo: {
        title:
          "Campus Skanda Women's PG in Rai Durg | Nandu PG",
        description:
          "Nandu Women's PG in Prashant Hills, Rai Durg, Hyderabad, with convenient access to Knowledge City and the Financial District.",
      },
    },
  ],
};
