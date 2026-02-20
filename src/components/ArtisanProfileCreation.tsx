import { useState } from 'react';
import { NavigationProps } from '../App';
import { ArrowLeft, Camera, MapPin, DollarSign, Clock, Wrench } from 'lucide-react';
import { trades } from '../data/mockData';

export function ArtisanProfileCreation({ onNavigate }: NavigationProps) {
  const [formData, setFormData] = useState({
    name: '',
    trade: '',
    phone: '',
    location: '',
    experience: '',
    hourlyRate: '',
    availability: 'Disponible',
    skills: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('artisan-dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <button
          onClick={() => onNavigate('artisan-onboarding')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-1">Créer mon profil</h1>
        <p className="text-blue-100">Remplissez vos informations</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Photo */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <label className="block text-gray-900 mb-3">Photo de profil</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Ajouter une photo
            </button>
          </div>
        </div>

        {/* Informations de base */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-gray-900">Informations de base</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">Nom complet *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Patrick Kabamba"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Métier *</label>
            <select
              required
              value={formData.trade}
              onChange={(e) => handleChange('trade', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="">Sélectionnez votre métier</option>
              {trades.map(trade => (
                <option key={trade.id} value={trade.name}>
                  {trade.icon} {trade.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Téléphone WhatsApp *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Ex: +243 999 123 456"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-amber-500" />
            <label className="text-gray-900">Localisation *</label>
          </div>
          <select
            required
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sélectionnez votre quartier</option>
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
            <label className="block text-sm text-gray-600 mb-2">Années d'expérience *</label>
            <input
              type="text"
              required
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              placeholder="Ex: 8 ans"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <label className="text-sm text-gray-600">Tarif horaire *</label>
            </div>
            <input
              type="text"
              required
              value={formData.hourlyRate}
              onChange={(e) => handleChange('hourlyRate', e.target.value)}
              placeholder="Ex: 25 USD/h"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Disponibilité */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <label className="text-gray-900">Disponibilité *</label>
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
            <label className="text-gray-900">Compétences *</label>
          </div>
          <textarea
            required
            value={formData.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            placeholder="Ex: Installation électrique, Dépannage, Panneaux solaires, Câblage"
            rows={3}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">Séparez les compétences par des virgules</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <label className="block text-gray-900 mb-3">Présentation *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Décrivez votre expérience et ce qui vous distingue..."
            rows={4}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <span className="text-lg">Créer mon profil</span>
        </button>
      </form>
    </div>
  );
}
