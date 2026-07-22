import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://web-piano.vercel.app";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/piano`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
