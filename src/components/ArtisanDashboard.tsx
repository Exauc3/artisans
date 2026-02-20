import { User, LogOut, Clock, MessageCircle, Phone, Star, TrendingUp, Eye, Settings } from 'lucide-react';
import { useState } from 'react';

interface ArtisanDashboardProps {
  onNavigateToProfile: () => void;
  onNavigateToAvailability: () => void;
  onNavigateToRequests: () => void;
  onLogout: () => void;
}

export function ArtisanDashboard({ 
  onNavigateToProfile, 
  onNavigateToAvailability, 
  onNavigateToRequests,
  onLogout 
}: ArtisanDashboardProps) {
  const [availability, setAvailability] = useState<'Disponible' | 'Occupé'>('Disponible');

  // Mock data
  const stats = {
    profileViews: 234,
    totalContacts: 18,
    rating: 4.9,
    reviewCount: 87
  };

  const recentRequests = [
    {
      id: '1',
      clientName: 'Marie Kabila',
      service: 'Installation électrique',
      date: '07 déc 2024',
      time: '14:30',
      status: 'new' as const
    },
    {
      id: '2',
      clientName: 'Jean-Paul Kabeya',
      service: 'Dépannage urgent',
      date: '06 déc 2024',
      time: '16:15',
      status: 'contacted' as const
    },
    {
      id: '3',
      clientName: 'Grace Ntumba',
      service: 'Devis installation',
      date: '05 déc 2024',
      time: '11:20',
      status: 'contacted' as const
    }
  ];

  const newRequestsCount = recentRequests.filter(r => r.status === 'new').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 pt-10 pb-8 rounded-b-[2rem]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-200 mb-1">Bonjour,</p>
            <h1 className="text-white mb-1">Patrick Mbuyi</h1>
            <p className="text-blue-200">Électricien • Kampemba</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all active:scale-95"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Availability Toggle - Prominent */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-blue-100">Statut actuel</p>
                <p>{availability}</p>
              </div>
            </div>
            <button
              onClick={() => setAvailability(availability === 'Disponible' ? 'Occupé' : 'Disponible')}
              className={`relative w-20 h-10 rounded-full transition-all ${
                availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              <div className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg transition-transform ${
                availability === 'Disponible' ? 'left-1' : 'left-11'
              }`} />
            </button>
          </div>
          <button
            onClick={onNavigateToAvailability}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl transition-all active:scale-95"
          >
            Gérer ma disponibilité
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6">
        <h2 className="mb-4 text-gray-900">Vos statistiques</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="bg-blue-100 p-3 rounded-xl inline-flex mb-3">
              <Eye size={22} className="text-blue-700" />
            </div>
            <p className="text-gray-600 mb-1">Vues profil</p>
            <p className="text-gray-900">{stats.profileViews}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="bg-green-100 p-3 rounded-xl inline-flex mb-3">
              <MessageCircle size={22} className="text-green-700" />
            </div>
            <p className="text-gray-600 mb-1">Contacts</p>
            <p className="text-gray-900">{stats.totalContacts}</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="bg-amber-100 p-3 rounded-xl inline-flex mb-3">
              <Star size={22} className="text-amber-600" />
            </div>
            <p className="text-gray-600 mb-1">Note moyenne</p>
            <p className="text-gray-900">{stats.rating}/5</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="bg-purple-100 p-3 rounded-xl inline-flex mb-3">
              <TrendingUp size={22} className="text-purple-700" />
            </div>
            <p className="text-gray-600 mb-1">Avis reçus</p>
            <p className="text-gray-900">{stats.reviewCount}</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Demandes récentes</h2>
          {newRequestsCount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full">
              {newRequestsCount} nouvelle(s)
            </span>
          )}
        </div>
        <div className="space-y-3 mb-8">
          {recentRequests.map((request) => (
            <div key={request.id} className="bg-white p-5 rounded-2xl shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">{request.clientName}</h3>
                  <p className="text-gray-600">{request.service}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  request.status === 'new' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  <p>{request.status === 'new' ? 'Nouveau' : 'Contacté'}</p>
                </div>
              </div>
              <p className="text-gray-500">{request.date} à {request.time}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onNavigateToRequests}
          className="w-full bg-white border-2 border-amber-300 text-gray-800 py-4 rounded-2xl hover:bg-amber-50 transition-all active:scale-95 mb-8"
        >
          Voir toutes les demandes
        </button>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onNavigateToProfile}
            className="w-full bg-white border-2 border-gray-200 text-gray-800 py-5 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <User size={22} />
            Modifier mon profil
          </button>
          
          <button
            className="w-full bg-white border-2 border-gray-200 text-gray-800 py-5 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Settings size={22} />
            Paramètres
          </button>
        </div>
      </div>
    </div>
  );
}
