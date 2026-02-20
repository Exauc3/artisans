import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AvailabilityScreenProps {
  onBack: () => void;
}

export function AvailabilityScreen({ onBack }: AvailabilityScreenProps) {
  const [availability, setAvailability] = useState<'Disponible' | 'Occupé'>('Disponible');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  if (saved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h2 className="text-gray-900 mb-3">Disponibilité mise à jour !</h2>
          <p className="text-gray-700">
            Votre statut est maintenant : <span className="text-gray-900">{availability}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full active:scale-95">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h2 className="text-gray-900">Gérer ma disponibilité</h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={36} className="text-blue-700" />
            </div>
            <h3 className="text-gray-900 mb-2">Statut actuel</h3>
            <p className="text-gray-600">
              Les clients verront votre disponibilité en temps réel
            </p>
          </div>

          {/* Toggle - Large and visual */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => setAvailability('Disponible')}
                className={`flex-1 py-6 rounded-2xl transition-all active:scale-95 ${
                  availability === 'Disponible'
                    ? 'bg-green-500 text-white shadow-xl'
                    : 'bg-white text-gray-700 border-2 border-gray-200'
                }`}
              >
                <Clock size={32} className="mx-auto mb-2" />
                <p>Disponible</p>
              </button>
              
              <button
                onClick={() => setAvailability('Occupé')}
                className={`flex-1 py-6 rounded-2xl transition-all active:scale-95 ${
                  availability === 'Occupé'
                    ? 'bg-orange-500 text-white shadow-xl'
                    : 'bg-white text-gray-700 border-2 border-gray-200'
                }`}
              >
                <Clock size={32} className="mx-auto mb-2" />
                <p>Occupé</p>
              </button>
            </div>

            <div className={`text-center p-5 rounded-2xl ${
              availability === 'Disponible' 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-orange-50 border-2 border-orange-200'
            }`}>
              <p className={availability === 'Disponible' ? 'text-green-900' : 'text-orange-900'}>
                {availability === 'Disponible' 
                  ? '✓ Vous recevrez des demandes de clients' 
                  : '⚠ Les clients verront que vous êtes occupé'}
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-blue-900 mb-3">À savoir</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Statut &quot;Disponible&quot; : Votre profil est mis en avant</li>
            <li>• Statut &quot;Occupé&quot; : Les clients peuvent toujours vous voir</li>
            <li>• Changez votre statut à tout moment</li>
            <li>• Soyez réactif pour gagner en crédibilité</li>
          </ul>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <CheckCircle size={24} />
          Enregistrer la disponibilité
        </button>
      </div>
    </div>
  );
}
