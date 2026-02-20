import { NavigationProps } from '../App';
import { ArrowLeft, MapPin, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { clientRequests } from '../data/mockData';

export function ArtisanRequests({ onNavigate }: NavigationProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">Nouveau</span>;
      case 'viewed':
        return <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">Vu</span>;
      case 'responded':
        return <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">Répondu</span>;
      default:
        return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'Urgent') return 'text-red-600';
    if (urgency === 'Cette semaine') return 'text-amber-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <button
          onClick={() => onNavigate('artisan-dashboard')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-1">Demandes reçues</h1>
        <p className="text-blue-100">{clientRequests.length} demande(s) au total</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Filtres */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-blue-900 text-white rounded-xl whitespace-nowrap">
            Toutes
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl whitespace-nowrap border-2 border-gray-200">
            Nouvelles
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl whitespace-nowrap border-2 border-gray-200">
            Vues
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl whitespace-nowrap border-2 border-gray-200">
            Répondues
          </button>
        </div>

        {/* Liste des demandes */}
        {clientRequests.map((request) => (
          <button
            key={request.id}
            onClick={() => onNavigate('request-detail', { request })}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98 p-5 text-left"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900 truncate">{request.service}</h3>
                  {request.status === 'new' && (
                    <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{request.clientName}</p>
              </div>
              {getStatusBadge(request.status)}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {request.description}
            </p>

            {/* Infos */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{request.location}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{request.budget}</span>
                </div>
                <div className={`flex items-center gap-1 ${getUrgencyColor(request.urgency)}`}>
                  <AlertCircle className="w-4 h-4" />
                  <span>{request.urgency}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{request.date}</span>
                </div>
                <span className="text-blue-600">Voir détails →</span>
              </div>
            </div>
          </button>
        ))}

        {clientRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <p className="text-gray-500 mb-2">Aucune demande pour le moment</p>
            <p className="text-sm text-gray-400">Les nouvelles demandes apparaîtront ici</p>
          </div>
        )}
      </div>
    </div>
  );
}
