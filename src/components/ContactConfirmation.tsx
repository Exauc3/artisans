import { NavigationProps } from '../App';
import { CheckCircle, Home, Search } from 'lucide-react';

export function ContactConfirmation({ onNavigate, navigationData }: NavigationProps) {
  const artisan = navigationData?.artisan;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icône de succès */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl text-gray-900">
            Demande envoyée !
          </h1>
          <p className="text-gray-600">
            Vous allez être redirigé vers WhatsApp pour discuter avec{' '}
            <span className="text-gray-900">{artisan?.name || "l'artisan"}</span>
          </p>
        </div>

        {/* Conseils */}
        <div className="bg-white rounded-2xl shadow-md p-5 text-left space-y-3">
          <h3 className="text-gray-900">Conseils pour votre discussion :</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Décrivez clairement votre besoin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Demandez un devis détaillé</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Convenez d'un rendez-vous pour une visite</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Vérifiez les disponibilités et délais</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => onNavigate('client-search')}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5" />
            <span>Chercher un autre artisan</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
