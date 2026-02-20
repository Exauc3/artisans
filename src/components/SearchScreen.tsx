import { ArrowLeft, Search, MapPin, DollarSign, Star, Clock } from 'lucide-react';

interface SearchScreenProps {
  onBack: () => void;
  onSearch: () => void;
  category: string;
  setCategory: (category: string) => void;
  filters: {
    maxDistance: string;
    maxPrice: string;
    minRating: number;
    availability: string;
  };
  setFilters: (filters: any) => void;
}

export function SearchScreen({ 
  onBack, 
  onSearch, 
  category, 
  setCategory, 
  filters, 
  setFilters 
}: SearchScreenProps) {
  const categories = ['Plombier', 'Électricien', 'Menuisier', 'Peintre', 'Maçon', 'Mécanicien'];
  const distances = ['5 km', '10 km', '20 km', '50 km'];
  const prices = ['€', '€€', '€€€'];
  const ratings = [3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h2>Rechercher</h2>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Entrez une catégorie..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-gray-800">Catégories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <h3 className="mb-4 text-gray-800">Filtres</h3>
          
          {/* Distance */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <MapPin size={18} />
              <p>Proximité</p>
            </div>
            <div className="flex gap-2">
              {distances.map((dist) => (
                <button
                  key={dist}
                  onClick={() => setFilters({ ...filters, maxDistance: dist })}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    filters.maxDistance === dist
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <DollarSign size={18} />
              <p>Prix</p>
            </div>
            <div className="flex gap-2">
              {prices.map((price) => (
                <button
                  key={price}
                  onClick={() => setFilters({ ...filters, maxPrice: price })}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filters.maxPrice === price
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <Star size={18} />
              <p>Note minimum</p>
            </div>
            <div className="flex gap-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, minRating: rating })}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-all ${
                    filters.minRating === rating
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star size={14} fill="currentColor" />
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <Clock size={18} />
              <p>Disponibilité</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ ...filters, availability: 'Disponible' })}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filters.availability === 'Disponible'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Disponible
              </button>
              <button
                onClick={() => setFilters({ ...filters, availability: '' })}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filters.availability === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Rechercher des artisans
        </button>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setCategory('');
            setFilters({ maxDistance: '', maxPrice: '', minRating: 0, availability: '' });
          }}
          className="w-full mt-3 text-gray-600 py-3 hover:text-gray-800 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
