export const siteConfig = {
  name: "DOMIQ",
  legalName: "DOMIQ — Official Sleek Distributor",
  tagline: "Sleek Interiors, Engineered for Luxury Living",
  description:
    "Official Sleek (Asian Paints) distributor for South Gujarat. Premium modular kitchens, wardrobes, walk-in closets and interior hardware — crafted with 25+ years of dealership expertise.",
  url: "https://domiq.example",
  contact: {
    phoneDisplay: "+91 90545 17477",
    phoneHref: "tel:+919054517477",
    whatsappNumber: "919054517477",
    whatsappHref:
      "https://wa.me/919054517477?text=Hello%20DOMIQ%2C%20I%27d%20like%20to%20know%20more%20about%20Sleek%20modular%20kitchens.",
    email: "hello@domiq.example",
    emailHref: "mailto:hello@domiq.example",
    address: "Surat, South Gujarat · Serving Surat, Bharuch, Navsari, Valsad & Vapi",
    city: "Surat",
    pincode: "395004",
  },
  cities: ["Surat", "Bharuch", "Navsari", "Valsad", "Vapi"] as const,
  yearsOfExperience: 25,
  // South Gujarat pincode prefixes (392–396 cover Bharuch, Surat, Navsari, Valsad, Vapi districts)
  serviceablePincodePrefixes: ["392", "393", "394", "395", "396"] as const,
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  nav: [
    { label: "Experience", href: "#experience" },
    { label: "Showroom", href: "#showroom" },
    { label: "Projects", href: "#projects" },
    { label: "Coverage", href: "#coverage" },
    { label: "Studio", href: "#studio" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
