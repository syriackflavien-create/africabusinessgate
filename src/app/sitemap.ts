import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: 'https://abg-rca.com',
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: 'https://abg-rca.com/about',
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: 'https://abg-rca.com/services',
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: 'https://abg-rca.com/contact',
      lastModified: new Date(),
      priority: 0.7,
    },

    {
      url: 'https://abg-rca.com/invest-in-rca',
      lastModified: new Date(),
      priority: 0.9,
    },
  ]
}