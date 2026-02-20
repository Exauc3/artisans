export interface Artisan {
  id: string;
  name: string;
  trade: string;
  photo: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  hourlyRate?: string;
  availability: 'Disponible' | 'Occupé' | 'Disponible dans 2 jours';
  location: string;
  verified: boolean;
  skills: string[];
  description: string;
  phone: string;
  whatsapp: string;
  experience: string;
  completedJobs: number;
  distance?: string;
}

export interface ClientRequest {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  description: string;
  location: string;
  urgency: 'Urgent' | 'Cette semaine' | 'Flexible';
  budget: string;
  date: string;
  status: 'new' | 'viewed' | 'responded';
}

export interface Trade {
  id: string;
  name: string;
  icon: string;
  count: number;
}