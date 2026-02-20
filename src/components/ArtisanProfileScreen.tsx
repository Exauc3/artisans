import { ArrowLeft, MapPin, Star, Briefcase, CheckCircle, Shield } from 'lucide-react';
import { Artisan } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtisanProfileScreenProps {
  artisan: Artisan;
  onBack: () => void;
  onContact: () => void;
}

export function ArtisanProfileScreen({ artisan, onBack, onContact }: ArtisanProfileScreenProps) {
  // Mock reviews
  const reviews = [
    {
      id: '1',
      author: 'Marie Kabila',
      rating: 5,
      date: '2 déc 2024',
      comment: 'Excellent travail ! Très professionnel et ponctuel. Je recommande fortement.'
    },
    {
      id: '2',
      author: 'Pierre Mulamba',
      rating: 5,
      date: '28 nov 2024',
      comment: 'Service rapide et de qualité. Prix honnête.'
    },
    {
      id: '3',
      author: 'Grace Ntumba',
      rating: 4,
      date: '20 nov 2024',
      comment: 'Bon artisan, travail soigné. Très satisfaite.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full inline-flex active:scale-95">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-6 py-6 border-b-8 border-gray-50">
        <div className="flex gap-5 mb-6">
          <div className="relative">
            <ImageWithFallback
              src={artisan.photo}
              alt={artisan.name}
              className="w-28 h-28 rounded-3xl object-cover flex-shrink-0 shadow-lg"
            />
            {artisan.verified && (
              <div className="absolute -bottom-2 -right-2 bg-blue-700 rounded-full p-2 shadow-lg">
                <CheckCircle size={20} className="text-white" fill="white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-gray-900 mb-1">{artisan.name}</h1>
            <p className="text-gray-600 mb-3">{artisan.trade}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                <Star size={18} className="text-amber-500" fill="currentColor" />
                <span className="text-gray-900">{artisan.rating}</span>
                <span className="text-gray-600">({artisan.reviewCount})</span>
              </div>
            </div>
            {artisan.verified && (
              <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full inline-flex">
                <Shield size={14} />
                <span>Vérifié</span>
              </div>
            )}
          </div>
        </div>

        {/* Status and Price */}
        <div className="flex gap-3 mb-6">
          <div className={`flex-1 px-4 py-3 rounded-2xl ${
            artisan.availability === 'Disponible' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            <p className="text-center">{artisan.availability}</p>
          </div>
          <div className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 text-gray-800">
            <p className="text-center">{artisan.priceRange}</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 py-6 space-y-5">
        {/* Location & Experience */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="mb-4 text-gray-900">Informations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <MapPin size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-gray-600">Localisation</p>
                <p className="text-gray-900">{artisan.location}</p>
                {artisan.distance && (
                  <p className="text-gray-600">À {artisan.distance} de vous</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Briefcase size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-gray-600">Expérience</p>
                <p className="text-gray-900">{artisan.experience} d&apos;expérience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="mb-3 text-gray-900">À propos</h3>
          <p className="text-gray-700 leading-relaxed">{artisan.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="mb-4 text-gray-900">Compétences</h3>
          <div className="flex flex-wrap gap-3">
            {artisan.skills.map((skill, index) => (
              <span key={index} className="bg-amber-50 text-amber-800 px-4 py-2.5 rounded-xl border border-amber-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="mb-5 text-gray-900">Avis clients ({artisan.reviewCount})</h3>
          <div className="space-y-5">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">{review.author}</p>
                  <p className="text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-amber-500' : 'text-gray-300'}
                      fill={i < review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Contact Button - Sticky */}
      <div className="sticky bottom-0 bg-white px-6 py-5 shadow-2xl border-t-2 border-gray-100">
        <button
          onClick={onContact}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-5 rounded-2xl shadow-xl transition-all active:scale-95"
        >
          Contacter maintenant
        </button>
      </div>
    </div>
  );
}