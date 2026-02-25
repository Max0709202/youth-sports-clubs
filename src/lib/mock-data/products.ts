import type { Product } from "@/src/lib/types";

export const mockProducts: Product[] = [
  {
    id: "prod_wc_home_jersey",
    teamSlug: "wildcats",
    name: "Home Jersey",
    description:
      "Lightweight performance jersey in the official Wildcats home colors.",
    heroImageUrl: "/products/wildcats-home-jersey.png",
    galleryImageUrls: ["/products/wildcats-home-jersey.png"],
    category: "jersey",
    tags: ["home", "jersey"],
    isFeatured: true,
    variants: [
      {
        id: "var_wc_home_ys",
        sku: "WC-HOME-YS",
        size: "YS",
        colorLabel: "Home",
        colorHex: "#f97316",
        priceCents: 3800
      },
      {
        id: "var_wc_home_ym",
        sku: "WC-HOME-YM",
        size: "YM",
        colorLabel: "Home",
        colorHex: "#f97316",
        priceCents: 3800
      },
      {
        id: "var_wc_home_yl",
        sku: "WC-HOME-YL",
        size: "YL",
        colorLabel: "Home",
        colorHex: "#f97316",
        priceCents: 3800
      }
    ]
  },
  {
    id: "prod_wc_hoodie",
    teamSlug: "wildcats",
    name: "Sideline Hoodie",
    description: "Midweight fleece hoodie with bold Wildcats chest wordmark.",
    heroImageUrl: "/products/wildcats-hoodie.png",
    galleryImageUrls: ["/products/wildcats-hoodie.png"],
    category: "hoodie",
    tags: ["hoodie"],
    isFeatured: true,
    variants: [
      {
        id: "var_wc_hoodie_s",
        sku: "WC-HOODIE-S",
        size: "S",
        colorLabel: "Black",
        colorHex: "#020617",
        priceCents: 5200
      },
      {
        id: "var_wc_hoodie_m",
        sku: "WC-HOODIE-M",
        size: "M",
        colorLabel: "Black",
        colorHex: "#020617",
        priceCents: 5200
      },
      {
        id: "var_wc_hoodie_l",
        sku: "WC-HOODIE-L",
        size: "L",
        colorLabel: "Black",
        colorHex: "#020617",
        priceCents: 5200
      }
    ]
  },
  {
    id: "prod_wc_hat",
    teamSlug: "wildcats",
    name: "Snapback Cap",
    description: "Structured snapback with embroidered Wildcats crest.",
    heroImageUrl: "/products/wildcats-hat.png",
    galleryImageUrls: ["/products/wildcats-hat.png"],
    category: "hat",
    tags: ["hat", "accessory"],
    variants: [
      {
        id: "var_wc_hat_one",
        sku: "WC-HAT-ONE",
        size: "M",
        colorLabel: "Home",
        colorHex: "#f97316",
        priceCents: 2800
      }
    ]
  },
  {
    id: "prod_st_storm_jersey",
    teamSlug: "storm",
    name: "Storm Game Jersey",
    description: "Moisture-wicking jersey with electric Storm detailing.",
    heroImageUrl: "/products/storm-jersey.png",
    galleryImageUrls: ["/products/storm-jersey.png"],
    category: "jersey",
    tags: ["home", "jersey"],
    isFeatured: true,
    variants: [
      {
        id: "var_st_jersey_s",
        sku: "ST-JERSEY-S",
        size: "S",
        colorLabel: "Cyan",
        colorHex: "#38bdf8",
        priceCents: 4200
      },
      {
        id: "var_st_jersey_m",
        sku: "ST-JERSEY-M",
        size: "M",
        colorLabel: "Cyan",
        colorHex: "#38bdf8",
        priceCents: 4200
      },
      {
        id: "var_st_jersey_l",
        sku: "ST-JERSEY-L",
        size: "L",
        colorLabel: "Cyan",
        colorHex: "#38bdf8",
        priceCents: 4200
      }
    ]
  },
  {
    id: "prod_st_shooting_shirt",
    teamSlug: "storm",
    name: "Shooting Shirt",
    description: "Lightweight long-sleeve shooting top with gradient sleeves.",
    heroImageUrl: "/products/storm-shooting-shirt.png",
    galleryImageUrls: ["/products/storm-shooting-shirt.png"],
    category: "accessory",
    tags: ["warmup"],
    variants: [
      {
        id: "var_st_shirt_m",
        sku: "ST-SHOOT-M",
        size: "M",
        colorLabel: "Storm",
        colorHex: "#38bdf8",
        priceCents: 3600
      }
    ]
  },
  {
    id: "prod_ke_alt_jersey",
    teamSlug: "kestrels",
    name: "Alternate Jersey",
    description:
      "Classic pinstripe alternate jersey inspired by ballpark traditions.",
    heroImageUrl: "/products/kestrels-alt-jersey.png",
    galleryImageUrls: ["/products/kestrels-alt-jersey.png"],
    category: "jersey",
    tags: ["alternate", "jersey"],
    isFeatured: true,
    variants: [
      {
        id: "var_ke_alt_s",
        sku: "KE-ALT-S",
        size: "S",
        colorLabel: "Home",
        colorHex: "#22c55e",
        priceCents: 4000
      },
      {
        id: "var_ke_alt_m",
        sku: "KE-ALT-M",
        size: "M",
        colorLabel: "Home",
        colorHex: "#22c55e",
        priceCents: 4000
      }
    ]
  },
  {
    id: "prod_ke_beanie",
    teamSlug: "kestrels",
    name: "Winter Beanie",
    description: "Cuffed knit beanie with Harbor Kestrels crest patch.",
    heroImageUrl: "/products/kestrels-beanie.png",
    galleryImageUrls: ["/products/kestrels-beanie.png"],
    category: "hat",
    tags: ["winter", "accessory"],
    variants: [
      {
        id: "var_ke_beanie_one",
        sku: "KE-BEANIE-ONE",
        size: "M",
        colorLabel: "Forest",
        colorHex: "#064e3b",
        priceCents: 2400
      }
    ]
  }
];

