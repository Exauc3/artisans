import { NavigationProps } from '../App';
import { Briefcase, Users } from 'lucide-react';

export function Home({ onNavigate }: NavigationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et titre */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900">
            ArtisanConnect
          </h1>
          <p className="text-gray-600">
            Trouvez le bon artisan à Lubumbashi
          </p>
        </div>

        {/* Boutons de choix */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('client-search')}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-between group"
          >
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-6 h-6" />
                <span className="text-xl">Je cherche un artisan</span>
              </div>
              <p className="text-amber-100 text-sm">
                Trouvez rapidement un professionnel
              </p>
            </div>
            <div className="text-3xl group-hover:translate-x-1 transition-transform">→</div>
          </button>

          <button
            onClick={() => onNavigate('artisan-onboarding')}
            className="w-full bg-white border-2 border-blue-900 text-blue-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-between group"
          >
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-6 h-6" />
                <span className="text-xl">Je suis artisan</span>
              </div>
              <p className="text-blue-700 text-sm">
                Créez votre profil professionnel
              </p>
            </div>
            <div className="text-3xl group-hover:translate-x-1 transition-transform">→</div>
          </button>
        </div>

        {/* Info supplémentaire */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Plus de 150 artisans vérifiés à Lubumbashi
          </p>
        </div>
      </div>
    </div>
  );
}
