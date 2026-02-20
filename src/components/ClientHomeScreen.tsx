import { Search, Zap, Droplet, Hammer, Wrench, Car, Paintbrush, UserCircle } from 'lucide-react';

interface ClientHomeScreenProps {
  onNavigateToSearch: (category?: string) => void;
  onNavigateToArtisanLogin: () => void;
}

export function ClientHomeScreen({ onNavigateToSearch, onNavigateToArtisanLogin }: ClientHomeScreenProps) {
  const categories = [
    { name: 'Électricien', icon: Zap, color: 'bg-amber-500' },
    { name: 'Plombier', icon: Droplet, color: 'bg-blue-500' },
    { name: 'Menuisier', icon: Hammer, color: 'bg-orange-600' },
    { name: 'Mécanicien', icon: Car, color: 'bg-gray-700' },
    { name: 'Peintre', icon: Paintbrush, color: 'bg-purple-500' },
    { name: 'Maçon', icon: Wrench, color: 'bg-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-200 mb-1">Bienvenue à</p>
            <h1 className="text-white mb-1">ArtisanConnect</h1>
            <p className="text-blue-200">Lubumbashi</p>
          </div>
          <button 
            onClick={onNavigateToArtisanLogin}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full transition-all shadow-lg"
          >
            Artisan
          </button>
        </div>
        
        {/* Search Bar - Prominent */}
        <button
          onClick={() => onNavigateToSearch()}
          className="w-full bg-white text-gray-700 px-5 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-4"
        >
          <Search className="text-amber-500" size={24} />
          <span className="text-gray-600">Trouver un artisan...</span>
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900">Catégories</h2>
          <button className="text-amber-600 hover:text-amber-700">
            Voir tout
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => onNavigateToSearch(category.name)}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all active:scale-95"
              >
                <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <p className="text-gray-900 text-center">{category.name}</p>
              </button>
            );
          })}
        </div>

        {/* Quick CTA */}
        <button
          onClick={() => onNavigateToSearch()}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <Search size={22} />
          <span>Trouver un artisan maintenant</span>
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="px-6 pb-8">
        <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-4 text-center">Pourquoi nous choisir ?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-gray-700">Artisans vérifiés et qualifiés</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-gray-700">Contact direct par WhatsApp</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-gray-700">Avis clients authentiques</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-gray-700">Rapide et fiable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
