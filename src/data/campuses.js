import ashwa1 from "../assets/ashwamedha-1.jpg";
import ashwa2 from "../assets/ashwamedha-2.jpg";
import ashwa3 from "../assets/ashwamedha-3.jpg";
import ashwa4 from "../assets/ashwamedha-4.jpg";
import ashwa5 from "../assets/ashwamedha-5.jpg";
import ashwa6 from "../assets/ashwamedha-6.jpg";

import tri1 from "../assets/trinetra-1.jpg";
import tri2 from "../assets/trinetra-2.jpg";
import tri3 from "../assets/trinetra-3.jpg";
import tri4 from "../assets/trinetra-4.jpg";

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
          "Patrika Nagar, HITEC City, Hyderabad",
      },

      contact: {
        phone: "7569913989",

        // WhatsApp number must contain country code
        whatsapp: "917569913989",
      },

      mapLink:
        "https://maps.app.goo.gl/toGoRZRHaNWJv3dC7?g_st=ic",

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
          travelTime: "5 mins",
          type: "IT Park",
        },

        {
          name: "Raidurg Metro",
          travelTime: "10 mins",
          type: "Metro",
        },
      ],

      roomOptions: [
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
      ],

      dailyPricing: {
        nonAcPrice: 500,
        acPrice: 800,
      },

      amenities: [],

      seo: {
        title:
          "Campus Ashwamedha Men's PG in HITEC City | Nandu PG",

        description:
          "Men's PG accommodation in Patrika Nagar, HITEC City, Hyderabad near Raheja Mindspace and Raidurg Metro.",
      },
    },

    {
      id: "trinetra",

      slug: "trinetra-mens-pg-raidurg",

      name: "Campus Trinetra",

      gender: "men",

      tagline: "Independent Men's PG",

      location: {
        locality: "Rai Durg",
        area: "Khajaguda - Nanakramguda Road",
        city: "Hyderabad",

        display:
          "Khajaguda - Nanakramguda Rd, Rai Durg, Hyderabad",
      },

      contact: {
        // CHANGE THIS TO TRINETRA'S ACTUAL NUMBER
        phone: "7569913989",

        // CHANGE THIS TO TRINETRA'S ACTUAL WHATSAPP NUMBER
        whatsapp: "917569913989",
      },

      mapLink:
        "https://maps.app.goo.gl/W93VqEoiVtTGbPas7",

      images: [
        tri1,
        tri2,
        tri3,
        tri4,
      ],

      nearbyPlaces: [
        {
          name: "Financial District",
          travelTime: "5 mins",
          type: "Business District",
        },

        {
          name: "Starbucks",
          travelTime: "2 mins",
          type: "Cafe",
        },
      ],

      roomOptions: [
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
      ],

      dailyPricing: {
        nonAcPrice: 500,
        acPrice: 800,
      },

      amenities: [],

      seo: {
        title:
          "Campus Trinetra Men's PG in Rai Durg | Nandu PG",

        description:
          "Men's PG accommodation in Rai Durg, Hyderabad near Financial District and Nanakramguda.",
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
          "Ayyappa Society, Mega Hills, Madhapur, Hyderabad",
      },

      contact: {
        // CHANGE THIS TO SINDHOOR'S ACTUAL NUMBER
        phone: "7569913989",

        // CHANGE THIS TO SINDHOOR'S ACTUAL WHATSAPP NUMBER
        whatsapp: "917569913989",
      },

      mapLink:
        "https://maps.app.goo.gl/aEGCvCFps7VJvMhb6",

      images: [
        sindhoor1,
        sindhoor2,
        sindhoor3,
        sindhoor4,
      ],

      nearbyPlaces: [
        {
          name: "Ratnadeep Supermarket",
          travelTime: "2 mins",
          type: "Supermarket",
        },

        {
          name: "Madhapur Metro",
          travelTime: "8 mins",
          type: "Metro",
        },
      ],

      roomOptions: [
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
      ],

      dailyPricing: {
        nonAcPrice: 500,
        acPrice: 800,
      },

      amenities: [],

      seo: {
        title:
          "Campus Sindhoor Women's PG in Madhapur | Nandu PG",

        description:
          "Women's PG accommodation in Madhapur, Hyderabad near Ayyappa Society and Madhapur Metro.",
      },
    },

    {
      id: "skanda",

      slug: "skanda-womens-pg-raidurg",

      name: "Campus Skanda",

      gender: "women",

      tagline: "Secure Women's PG",

      location: {
        locality: "Rai Durg",
        area: "Rai Durg",
        city: "Hyderabad",

        display:
          "Rai Durg, Hyderabad",
      },

      contact: {
        // CHANGE THIS TO SKANDA'S ACTUAL NUMBER
        phone: "7569913989",

        // CHANGE THIS TO SKANDA'S ACTUAL WHATSAPP NUMBER
        whatsapp: "917569913989",
      },

      mapLink:
        "https://maps.app.goo.gl/jWMHjRkthCGGvorq9",

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
          name: "Knowledge City",
          travelTime: "5 mins",
          type: "IT Park",
        },

        {
          name: "Care Hospitals",
          travelTime: "3 mins",
          type: "Hospital",
        },
      ],

      roomOptions: [
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
      ],

      dailyPricing: {
        nonAcPrice: 500,
        acPrice: 800,
      },

      amenities: [],

      seo: {
        title:
          "Campus Skanda Women's PG in Rai Durg | Nandu PG",

        description:
          "Women's PG accommodation in Rai Durg, Hyderabad near Knowledge City and Care Hospitals.",
      },
    },
  ],
};