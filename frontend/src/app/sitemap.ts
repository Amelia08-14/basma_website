import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://basmalearning.com';
  
  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add other routes as needed
  ];
}
