import { User, Settings, LogOut, Clock, MessageCircle, Phone, Star, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

interface DashboardScreenProps {
  onNavigateToProfileManagement: () => void;
  onLogout: () => void;
}

export function DashboardScreen({ onNavigateToProfileManagement, onLogout }: DashboardScreenProps) {
  const [availability, setAvailability] = useState<'Disponible' | 'Occupé'>('Disponible');

  // Mock data
  const stats = {
    totalViews: 342,
    totalContacts: 28,
    rating: 4.8,
    reviewCount: 127
  };

  const recentRequests = [
    {
      id: '1',
      clientName: 'Sophie Martin',
      type: 'WhatsApp',
      date: '07 déc 2024',
      time: '14:30',
      service: 'Dépannage urgent'
    },
    {
      id: '2',
      clientName: 'Marc Dubois',
      type: 'Appel',
      date: '06 déc 2024',
      time: '10:15',
      service: 'Devis installation'
    },
    {
      id: '3',
      clientName: 'Claire Laurent',
      type: 'WhatsApp',
      date: '05 déc 2024',
      time: '16:45',
      service: 'Rénovation salle de bain'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="opacity-90">Bonjour,</p>
            <h1>Jean Dupont</h1>
            <p className="opacity-90">Plombier • Paris 15ème</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={20} />
              <div>
                <p className="opacity-90">Statut</p>
                <p>{availability}</p>
              </div>
            </div>
            <button
              onClick={() => setAvailability(availability === 'Disponible' ? 'Occupé' : 'Disponible')}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                availability === 'Disponible' ? 'left-1' : 'left-9'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <h2 className="mb-4 text-gray-800">Statistiques</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp size={18} className="text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600">Vues profil</p>
            <p className="text-gray-900">{stats.totalViews}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <MessageCircle size={18} className="text-green-600" />
              </div>
            </div>
            <p className="text-gray-600">Contacts</p>
            <p className="text-gray-900">{stats.totalContacts}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star size={18} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-gray-600">Note moyenne</p>
            <p className="text-gray-900">{stats.rating}/5</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar size={18} className="text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600">Avis reçus</p>
            <p className="text-gray-900">{stats.reviewCount}</p>
          </div>
        </div>

        {/* Recent Requests */}
        <h2 className="mb-4 text-gray-800">Sollicitations récentes</h2>
        <div className="space-y-3 mb-6">
          {recentRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-gray-900">{request.clientName}</h3>
                  <p className="text-gray-600">{request.service}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  request.type === 'WhatsApp' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  <p>{request.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} />
                <span>{request.date} à {request.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onNavigateToProfileManagement}
            className="w-full bg-white border border-gray-300 text-gray-800 py-4 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-3"
          >
            <User size={20} />
            Gérer mon profil
          </button>
          
          <button
            className="w-full bg-white border border-gray-300 text-gray-800 py-4 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-3"
          >
            <Settings size={20} />
            Paramètres
          </button>
        </div>
      </div>
    </div>
  );
}
