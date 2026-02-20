import { useState } from 'react';
import { NavigationProps } from '../App';
import { ArrowLeft, Camera, MapPin, DollarSign, Clock, Wrench, Save } from 'lucide-react';

export function ArtisanProfileEdit({ onNavigate }: NavigationProps) {
  const [formData, setFormData] = useState({
    name: 'Patrick Kabamba',
    trade: 'Électricien',
    phone: '+243 999 123 456',
    location: 'Quartier Industriel',
    experience: '8 ans',
    hourlyRate: '25 USD/h',
    availability: 'Disponible',
    skills: 'Installation électrique, Dépannage, Panneaux solaires, Câblage',
    description: 'Électricien professionnel avec 8 ans d\'expérience. Spécialisé dans les installations résidentielles et commerciales. Interventions rapides et prix honnêtes.'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      onNavigate('artisan-dashboard');
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <button
          onClick={() => onNavigate('artisan-dashboard')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-1">Modifier mon profil</h1>
        <p className="text-blue-100">Mettez à jour vos informations</p>
      </div>

      {saved && (
        <div className="bg-green-500 text-white p-4 text-center">
          ✓ Profil enregistré avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Photo */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <label className="block text-gray-900 mb-3">Photo de profil</label>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
              alt="Profile"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Changer la photo
            </button>
          </div>
        </div>

        {/* Informations de base */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-gray-900">Informations de base</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">Nom complet</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Métier</label>
            <input
              type="text"
              value={formData.trade}
              onChange={(e) => handleChange('trade', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Téléphone WhatsApp</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-amber-500" />
            <label className="text-gray-900">Localisation</label>
          </div>
          <select
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="Quartier Industriel">Quartier Industriel</option>
            <option value="Kenya">Kenya</option>
            <option value="Ruashi">Ruashi</option>
            <option value="Katuba">Katuba</option>
            <option value="Kampemba">Kampemba</option>
            <option value="Annexe">Annexe</option>
            <option value="Golf">Golf</option>
            <option value="Lubumbashi">Lubumbashi Centre</option>
          </select>
        </div>

        {/* Expérience et tarifs */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-gray-900">Expérience et tarifs</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Années d'expérience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <label className="text-sm text-gray-600">Tarif horaire</label>
            </div>
            <input
              type="text"
              value={formData.hourlyRate}
              onChange={(e) => handleChange('hourlyRate', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Disponibilité */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <label className="text-gray-900">Disponibilité</label>
          </div>
          <div className="space-y-2">
            {['Disponible', 'Occupé', 'Disponible dans 2 jours'].map(option => (
              <label key={option} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="availability"
                  value={option}
                  checked={formData.availability === option}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-5 h-5 text-amber-500" />
            <label className="text-gray-900">Compétences</label>
          </div>
          <textarea
            value={formData.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            rows={3}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">Séparez les compétences par des virgules</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <label className="block text-gray-900 mb-3">Présentation</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* Boutons */}
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            <span className="text-lg">Enregistrer les modifications</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('artisan-dashboard')}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
