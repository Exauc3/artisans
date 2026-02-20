import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

export function LoginScreen({ onBack, onLogin }: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="px-6 py-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Espace Artisan</h1>
          <p className="text-gray-600">
            {isSignup ? 'Créez votre profil artisan' : 'Connectez-vous à votre compte'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="exemple@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {!isSignup && (
            <div className="text-right">
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors shadow-lg"
          >
            {isSignup ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>

        {/* Toggle Sign up / Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignup ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?'}
            {' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isSignup ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-blue-900 mb-2">Pourquoi créer un profil artisan ?</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Recevez des demandes de clients locaux</li>
            <li>✓ Gérez votre disponibilité en temps réel</li>
            <li>✓ Développez votre réputation avec les avis</li>
            <li>✓ Augmentez votre visibilité</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
