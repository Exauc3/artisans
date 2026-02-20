import { NavigationProps } from '../App';
import { ArrowLeft, Star, MapPin, BadgeCheck, Clock } from 'lucide-react';
import { artisans } from '../data/mockData';

export function ArtisanList({ onNavigate, navigationData }: NavigationProps) {
  const trade = navigationData?.trade || 'Tous';
  
  const filteredArtisans = trade === 'Tous' 
    ? artisans 
    : artisans.filter(a => a.trade === trade);

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Disponible') return 'bg-green-100 text-green-700';
    if (availability === 'Occupé') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 shadow-lg">
        <button
          onClick={() => onNavigate('client-search')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-1">{trade}</h1>
        <p className="text-amber-100">{filteredArtisans.length} artisan(s) trouvé(s)</p>
      </div>

      <div className="p-6 space-y-4">
        {filteredArtisans.map((artisan) => (
          <button
            key={artisan.id}
            onClick={() => onNavigate('artisan-detail', { artisan })}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98 p-5 text-left"
          >
            <div className="flex gap-4">
              {/* Photo */}
              <img
                src={artisan.photo}
                alt={artisan.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-gray-900 truncate">{artisan.name}</h3>
                    {artisan.verified && (
                      <BadgeCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-gray-900">{artisan.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({artisan.reviewCount} avis)</span>
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{artisan.location}</span>
                </div>

                {/* Disponibilité et prix */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-3 py-1 rounded-full ${getAvailabilityColor(artisan.availability)}`}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {artisan.availability}
                  </span>
                  <span className="text-sm text-gray-700">
                    {artisan.priceRange}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}

        {filteredArtisans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun artisan trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
