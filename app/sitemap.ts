import type { MetadataRoute } from "next";
import { ContentStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/config";

const ROUTE_CONFIG: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = {
  "": { priority: 1.0, changeFrequency: "daily" },
  "/emergency": { priority: 0.95, changeFrequency: "weekly" },
  "/doctors": { priority: 0.9, changeFrequency: "daily" },
  "/services": { priority: 0.9, changeFrequency: "weekly" },
  "/departments": { priority: 0.9, changeFrequency: "weekly" },
  "/contact": { priority: 0.85, changeFrequency: "weekly" },
  "/facilities": { priority: 0.8, changeFrequency: "monthly" },
  "/about": { priority: 0.8, changeFrequency: "monthly" },
  "/news": { priority: 0.8, changeFrequency: "daily" },
  "/events": { priority: 0.75, changeFrequency: "weekly" },
  "/careers": { priority: 0.7, changeFrequency: "weekly" },
  "/faqs": { priority: 0.7, changeFrequency: "monthly" },
  "/gallery": { priority: 0.65, changeFrequency: "monthly" },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [doctors, departments, services, news, events, facilities] = await Promise.all([
    db.doctor.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
    db.department.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
    db.service.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
    db.news.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
    db.hospitalEvent.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
    db.facility.findMany({ where: { status: ContentStatus.PUBLISHED }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPaths = Object.keys(ROUTE_CONFIG);
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const config = ROUTE_CONFIG[path];
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: config.changeFrequency,
        priority: config.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
            "x-default": `${SITE_URL}/en${path}`,
          },
        },
      });
    }
  }

  const addDynamic = (
    items: { slug: string; updatedAt: Date }[],
    prefix: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
  ) => {
    for (const item of items) {
      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}/${prefix}/${item.slug}`,
          lastModified: item.updatedAt,
          changeFrequency,
          priority,
          alternates: {
            languages: {
              ...Object.fromEntries(
                LOCALES.map((l) => [l, `${SITE_URL}/${l}/${prefix}/${item.slug}`])
              ),
              "x-default": `${SITE_URL}/en/${prefix}/${item.slug}`,
            },
          },
        });
      }
    }
  };

  addDynamic(doctors, "doctors", 0.85, "daily");
  addDynamic(services, "services", 0.85, "weekly");
  addDynamic(departments, "departments", 0.85, "weekly");
  addDynamic(facilities, "facilities", 0.8, "monthly");
  addDynamic(news, "news", 0.75, "daily");
  addDynamic(events, "events", 0.7, "weekly");

  return entries;
}
