import { NavigationProps } from '../App';
import { ArrowLeft, Briefcase, DollarSign, Users, TrendingUp } from 'lucide-react';

export function ArtisanOnboarding({ onNavigate }: NavigationProps) {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-amber-500" />,
      title: 'Plus de clients',
      description: 'Soyez visible par des milliers de clients à Lubumbashi'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: 'Augmentez vos revenus',
      description: 'Recevez plus de demandes et choisissez vos projets'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: 'Gérez votre activité',
      description: 'Profil professionnel, horaires et disponibilités'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-8 h-8" />
          <h1 className="text-2xl">Espace Artisan</h1>
        </div>
        <p className="text-blue-100">Développez votre activité avec nous</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Avantages */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-4"
            >
              <div className="flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-lg mb-4">ArtisanConnect en chiffres</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl mb-1">150+</div>
              <div className="text-amber-100 text-sm">Artisans actifs</div>
            </div>
            <div>
              <div className="text-3xl mb-1">500+</div>
              <div className="text-amber-100 text-sm">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl mb-1">1200+</div>
              <div className="text-amber-100 text-sm">Projets réalisés</div>
            </div>
            <div>
              <div className="text-3xl mb-1">4.7★</div>
              <div className="text-amber-100 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>

        {/* Processus */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-gray-900">Comment ça marche ?</h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-gray-900">Créez votre profil</p>
                <p className="text-sm text-gray-600">Présentez vos compétences et tarifs</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-gray-900">Recevez des demandes</p>
                <p className="text-sm text-gray-600">Les clients vous contactent directement</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-gray-900">Développez votre activité</p>
                <p className="text-sm text-gray-600">Construisez votre réputation</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => onNavigate('artisan-profile-creation')}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <span className="text-lg">Créer mon profil gratuitement</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Déjà inscrit ?{' '}
          <button
            onClick={() => onNavigate('artisan-dashboard')}
            className="text-blue-600 hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}
