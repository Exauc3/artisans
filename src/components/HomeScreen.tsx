import { Search, Wrench, Zap, Hammer, Paintbrush, Droplet, Users } from 'lucide-react';

interface HomeScreenProps {
  onNavigateToSearch: (category?: string) => void;
  onNavigateToLogin: () => void;
}

export function HomeScreen({ onNavigateToSearch, onNavigateToLogin }: HomeScreenProps) {
  const categories = [
    { name: 'Plombier', icon: Droplet, color: 'bg-blue-500' },
    { name: 'Électricien', icon: Zap, color: 'bg-yellow-500' },
    { name: 'Menuisier', icon: Hammer, color: 'bg-orange-500' },
    { name: 'Peintre', icon: Paintbrush, color: 'bg-purple-500' },
    { name: 'Maçon', icon: Wrench, color: 'bg-gray-600' },
    { name: 'Tous', icon: Users, color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="opacity-90">Bienvenue sur</p>
            <h1>ArtisanConnect</h1>
          </div>
          <button 
            onClick={onNavigateToLogin}
            className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            Artisan
          </button>
        </div>
        
        {/* Search Bar */}
        <button
          onClick={() => onNavigateToSearch()}
          className="w-full bg-white text-gray-800 px-4 py-4 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <Search className="text-gray-400" size={20} />
          <span className="text-gray-500">Rechercher un artisan...</span>
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-8">
        <h2 className="mb-6 text-gray-800">Catégories populaires</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => onNavigateToSearch(category.name === 'Tous' ? '' : category.name)}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`${category.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-gray-800 text-center">{category.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="mb-4">Pourquoi ArtisanConnect ?</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="opacity-90">Artisans</p>
              <p>500+</p>
            </div>
            <div className="text-center border-l border-r border-blue-400">
              <p className="opacity-90">Villes</p>
              <p>50+</p>
            </div>
            <div className="text-center">
              <p className="opacity-90">Avis</p>
              <p>2000+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
