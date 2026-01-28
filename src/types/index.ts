// src/types/index.ts

export interface LovelyUpdate {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  tag: 'Memory' | 'Daily Life' | 'Milestone' | 'Travel';
  link?: string; 
}