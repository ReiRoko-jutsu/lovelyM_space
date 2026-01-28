// src/data/valentineData.ts
import type { LovelyUpdate } from '../types';

import princessPhoto from '../assets/lovely/valentineday.jpg';

export const VALENTINE_MOMENTS: LovelyUpdate[] = [
  {
    id: 101,
    date: "February 14, 2026",
    title: "Our Forever Promise",
    description: "The highlight of our journey. A day filled with laughter and the warmth of your hand in mine.",
    image: princessPhoto,
    tag: "Valentine 2026"
  },
  {
    id: 102,
    date: "February 14, 2025",
    title: "Dinner Under the Stars",
    description: "That quiet little bistro where we talked for hours. My favorite Valentine's memory so far.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tag: "Valentine 2025"
  },
  // Add more as the years go by...
];