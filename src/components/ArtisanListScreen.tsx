import { ArrowLeft, Phone, MessageCircle, MapPin, Star, CheckCircle } from 'lucide-react';
import { Artisan } from '../types';
import { artisans } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtisanListScreenProps {
  onBack: () => void;
  onSelectArtisan: (artisan: Artisan) => void;
  onContact: (artisan: Artisan) => void;
  category: string;
  filters: {
    maxDistance: string;
    priceRange: string;
    minRating: number;
    availability: string;
  };
}

export function ArtisanListScreen({ onBack, onSelectArtisan, onContact, category, filters }: ArtisanListScreenProps) {
  // Filter artisans
  const filteredArtisans = artisans.filter(artisan => {
    if (category && artisan.trade !== category) return false;
    if (filters.availability && artisan.availability !== filters.availability) return false;
    if (filters.minRating && artisan.rating < filters.minRating) return false;
    if (filters.priceRange && artisan.priceRange !== filters.priceRange) return false;
    return true;
  });

  const handleWhatsApp = (e: React.MouseEvent, artisan: Artisan) => {
    e.stopPropagation();
    onContact(artisan);
  };

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full active:scale-95">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h2 className="text-gray-900">{category || 'Tous les artisans'}</h2>
            <p className="text-gray-600">{filteredArtisans.length} artisan(s) trouvé(s)</p>
          </div>
        </div>
      </div>

      {/* Artisan Cards */}
      <div className="px-6 py-6 space-y-4">
        {filteredArtisans.map((artisan) => (
          <div
            key={artisan.id}
            onClick={() => onSelectArtisan(artisan)}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer overflow-hidden border-2 border-transparent hover:border-amber-200"
          >
            <div className="p-5">
              <div className="flex gap-4 mb-4">
                {/* Photo */}
                <div className="relative">
                  <ImageWithFallback
                    src={artisan.photo}
                    alt={artisan.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  {artisan.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-700 rounded-full p-1">
                      <CheckCircle size={14} className="text-white" fill="white" />
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-900">{artisan.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{artisan.trade}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-500" fill="currentColor" />
                      <span className="text-gray-900">{artisan.rating}</span>
                      <span className="text-gray-500">({artisan.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin size={14} />
                    <p>{artisan.location} • {artisan.distance}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full ${
                      artisan.availability === 'Disponible' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {artisan.availability}
                    </span>
                    <span className="text-gray-700 px-3 py-1 bg-gray-100 rounded-full">
                      {artisan.priceRange}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Contact Buttons - Large and prominent */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleWhatsApp(e, artisan)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                <button
                  onClick={(e) => handleCall(e, artisan.phone)}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone size={20} />
                  Appeler
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredArtisans.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-800 mb-2">Aucun artisan trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres</p>
          </div>
        )}
      </div>
    </div>
  );
}