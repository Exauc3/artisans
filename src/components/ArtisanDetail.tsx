import { NavigationProps } from '../App';
import { ArrowLeft, Star, MapPin, BadgeCheck, Clock, Briefcase, Phone } from 'lucide-react';

export function ArtisanDetail({ onNavigate, navigationData }: NavigationProps) {
  const artisan = navigationData?.artisan;

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Artisan non trouvé</p>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Disponible') return 'bg-green-100 text-green-700';
    if (availability === 'Occupé') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour ${artisan.name}, j'ai trouvé votre profil sur ArtisanConnect. J'aimerais discuter d'un projet.`
    );
    window.open(`https://wa.me/${artisan.phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    onNavigate('contact-confirmation', { artisan });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec photo */}
      <div className="relative">
        <img
          src={artisan.photo}
          alt={artisan.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        
        <button
          onClick={() => onNavigate('artisan-list', { trade: artisan.trade })}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl">{artisan.name}</h1>
            {artisan.verified && (
              <BadgeCheck className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <p className="text-white/90 mb-2">{artisan.trade}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{artisan.rating}</span>
            </div>
            <span className="text-white/80">({artisan.reviewCount} avis)</span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-6">
        {/* Disponibilité et prix */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Disponibilité</span>
            <span className={`text-sm px-3 py-1 rounded-full ${getAvailabilityColor(artisan.availability)}`}>
              <Clock className="w-3 h-3 inline mr-1" />
              {artisan.availability}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tarif horaire</span>
            <span className="text-gray-900">{artisan.hourlyRate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Fourchette de prix</span>
            <span className="text-gray-900">{artisan.priceRange}</span>
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm mb-1">Localisation</p>
              <p className="text-gray-900">{artisan.location}</p>
            </div>
          </div>
        </div>

        {/* Expérience */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <span className="text-gray-900">Expérience</span>
            </div>
            <span className="text-gray-900">{artisan.experience}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Travaux réalisés</span>
            <span className="text-gray-900">{artisan.completedJobs} projets</span>
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-900 mb-3">Compétences</h3>
          <div className="flex flex-wrap gap-2">
            {artisan.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-900 mb-3">À propos</h3>
          <p className="text-gray-600 leading-relaxed">{artisan.description}</p>
        </div>

        {/* Bouton WhatsApp */}
        <button
          onClick={handleWhatsAppContact}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Phone className="w-6 h-6" />
          <span className="text-lg">Contacter sur WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
