import { ArrowLeft, User, MapPin, Phone, Plus, X, Camera } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileManagementScreenProps {
  onBack: () => void;
}

export function ProfileManagementScreen({ onBack }: ProfileManagementScreenProps) {
  const [profile, setProfile] = useState({
    name: 'Patrick Mbuyi',
    category: 'Électricien',
    phone: '+243997123456',
    whatsapp: '+243997123456',
    location: 'Quartier Kampemba, Lubumbashi',
    experience: '5 ans',
    priceRange: 'Moyen',
    description: 'Électricien qualifié, intervention rapide à Lubumbashi. Travail soigné et garanti.',
    photo: 'https://images.unsplash.com/photo-1757697654584-544e1246d796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTEzMTE5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['Installation électrique', 'Dépannage', 'Câblage']
  });

  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  const categories = ['Électricien', 'Plombier', 'Menuisier', 'Mécanicien', 'Peintre', 'Maçon'];
  const priceRanges = ['Économique', 'Moyen', 'Premium'];

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const handleRemoveSkill = (index: number) => {
    setProfile({ 
      ...profile, 
      skills: profile.skills.filter((_, i) => i !== index) 
    });
  };

  const handleSave = () => {
    alert('Profil mis à jour avec succès !');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full active:scale-95">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h2 className="text-gray-900">Mon profil</h2>
          </div>
          <button
            onClick={handleSave}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full transition-all active:scale-95"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Photo */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="mb-4 text-gray-900">Photo de profil</h3>
          <div className="flex items-center gap-5">
            <div className="relative">
              <ImageWithFallback
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 rounded-3xl object-cover"
              />
              <button className="absolute -bottom-2 -right-2 bg-amber-500 hover:bg-amber-600 p-3 rounded-full shadow-lg transition-all active:scale-95">
                <Camera size={18} className="text-white" />
              </button>
            </div>
            <div>
              <p className="text-gray-700 mb-2">Changez votre photo</p>
              <button className="text-amber-600 hover:text-amber-700">
                Choisir une nouvelle photo
              </button>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="mb-5 text-gray-900">Informations de base</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Localisation
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Expérience
              </label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                placeholder="Ex: 5 ans"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="mb-4 text-gray-900">Gamme de prix</h3>
          <div className="grid grid-cols-3 gap-3">
            {priceRanges.map((price) => (
              <button
                key={price}
                onClick={() => setProfile({ ...profile, priceRange: price })}
                className={`py-4 rounded-2xl transition-all active:scale-95 ${
                  profile.priceRange === price
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="mb-4 text-gray-900">Description</h3>
          <textarea
            value={profile.description}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            rows={5}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors resize-none"
            placeholder="Décrivez votre expertise..."
          />
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="mb-4 text-gray-900">Compétences</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-amber-50 border-2 border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="hover:text-amber-900 active:scale-95"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {showSkillInput ? (
            <div className="space-y-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Nouvelle compétence"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAddSkill}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl transition-all active:scale-95"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => {
                    setShowSkillInput(false);
                    setNewSkill('');
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl transition-all active:scale-95"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowSkillInput(true)}
              className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-4 rounded-2xl hover:border-amber-400 hover:text-amber-600 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Plus size={22} />
              Ajouter une compétence
            </button>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 rounded-2xl shadow-xl transition-all active:scale-95"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
