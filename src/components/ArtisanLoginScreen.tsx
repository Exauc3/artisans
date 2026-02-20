import { ArrowLeft, User, Phone, Briefcase, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ArtisanLoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

export function ArtisanLoginScreen({ onBack, onLogin }: ArtisanLoginScreenProps) {
  const { signup, login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    category: '',
    skills: '',
    priceRange: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // Sign up as artisan
        await signup(formData.email, formData.password, formData.name, 'artisan', formData.phone);
        // Note: Les données supplémentaires (category, skills, etc.) seront ajoutées via ProfileManagement
      } else {
        // Sign in
        await login(formData.email, formData.password);
      }
      onLogin(); // Navigate to dashboard
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Électricien', 'Plombier', 'Menuisier', 'Mécanicien', 'Peintre', 'Maçon'];
  const priceRanges = ['Économique', 'Moyen', 'Premium'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <div className="px-6 py-4">
        <button onClick={onBack} className="p-3 hover:bg-white/50 rounded-full active:scale-95">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Espace Artisan</h1>
          <p className="text-gray-600">
            {isSignup ? 'Créez votre profil professionnel' : 'Connectez-vous à votre compte'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup ? (
            <>
              {/* Signup Form */}
              <div>
                <label className="block text-gray-800 mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom complet"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Votre email"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Numéro WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+243 997 123 456"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Profession *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                    required
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Compétences principales *
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Ex: Installation, Réparation, Dépannage urgent"
                  rows={3}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Gamme de prix *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {priceRanges.map((price) => (
                    <button
                      key={price}
                      type="button"
                      onClick={() => setFormData({ ...formData, priceRange: price })}
                      className={`py-3 rounded-xl transition-all active:scale-95 ${
                        formData.priceRange === price
                          ? 'bg-amber-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 border-2 border-gray-200'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Description courte
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez brièvement votre expertise..."
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>
            </>
          ) : (
            <>
              {/* Login Form */}
              <div>
                <label className="block text-gray-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Votre email"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2">
                  Code PIN
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl shadow-xl transition-all active:scale-95"
          >
            {loading ? 'Chargement...' : (isSignup ? 'Créer mon profil professionnel' : 'Se connecter')}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            {isSignup ? 'Vous avez déjà un compte ?' : 'Nouveau sur la plateforme ?'}
            {' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-amber-600 hover:text-amber-700"
            >
              {isSignup ? 'Se connecter' : 'Créer un profil'}
            </button>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white border-2 border-blue-100 rounded-2xl p-6">
          <h3 className="text-blue-900 mb-4">Avantages artisan</h3>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Profil vérifié et crédible</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Demandes de clients locaux</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Gestion simple de disponibilité</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500">✓</span>
              <span>Visibilité à Lubumbashi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}