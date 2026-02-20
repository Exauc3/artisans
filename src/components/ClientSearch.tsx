import { useState } from 'react';
import { NavigationProps } from '../App';
import { Search, ArrowLeft } from 'lucide-react';
import { trades } from '../data/mockData';

export function ClientSearch({ onNavigate }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrades = trades.filter(trade =>
    trade.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 pb-8 shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className="mb-4 p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl mb-2">Quel service cherchez-vous ?</h1>
        <p className="text-amber-100">Sélectionnez un métier</p>
      </div>

      <div className="p-6 -mt-4">
        {/* Barre de recherche */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un métier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Liste des métiers */}
        <div className="grid grid-cols-2 gap-4">
          {filteredTrades.map((trade) => (
            <button
              key={trade.id}
              onClick={() => onNavigate('artisan-list', { trade: trade.name })}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <div className="text-4xl mb-3">{trade.icon}</div>
              <h3 className="text-gray-900 mb-1">{trade.name}</h3>
              <p className="text-sm text-gray-500">{trade.count} artisans</p>
            </button>
          ))}
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun métier trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
