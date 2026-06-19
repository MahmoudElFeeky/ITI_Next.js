import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../dev.db");
const dbUrl = `file:${dbPath}`;

const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // Delete all existing products first
  await prisma.product.deleteMany({});
  console.log("Cleared existing products.");

  // Insert seed data
  await prisma.product.createMany({
    data: [
      {
        name: "Apex Keyboards Pro",
        description: "A premium, minimalist wireless mechanical keyboard with modern custom keycaps, hot-swappable tactile switches, RGB lighting, and a solid anodized aluminum frame. Precision-engineered for developers.",
        price: 189.99,
        image: "/images/keyboard.png",
        rating: 4.8,
        category: "Keyboards",
        stock: 15,
      },
      {
        name: "AeroSound ANC Headphones",
        description: "High-end active noise-cancelling overhead headphones. Featuring custom 40mm dynamic drivers, premium memory foam earcups, 40 hours of battery life, and immersive spatial audio.",
        price: 299.99,
        image: "/images/headphones.png",
        rating: 4.9,
        category: "Audio",
        stock: 8,
      },
      {
        name: "Horizon Smartwatch X",
        description: "A premium modern smartwatch with a sleek circular titanium casing, vivid always-on AMOLED display, advanced heart rate & health tracking, and up to 7 days of active battery life.",
        price: 249.99,
        image: "/images/smartwatch.png",
        rating: 4.7,
        category: "Wearables",
        stock: 12,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
