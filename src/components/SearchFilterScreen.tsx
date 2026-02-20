import { ArrowLeft, Search, MapPin, DollarSign, Star } from 'lucide-react';

interface SearchFilterScreenProps {
  onBack: () => void;
  onSearch: () => void;
  category: string;
  setCategory: (category: string) => void;
  filters: {
    maxDistance: string;
    priceRange: string;
    minRating: number;
    availability: string;
  };
  setFilters: (filters: any) => void;
}

export function SearchFilterScreen({ 
  onBack, 
  onSearch, 
  category, 
  setCategory, 
  filters, 
  setFilters 
}: SearchFilterScreenProps) {
  const categories = ['Électricien', 'Plombier', 'Menuisier', 'Mécanicien', 'Peintre', 'Maçon'];
  const distances = ['2 km', '5 km', '10 km', '20 km'];
  const prices = ['Économique', 'Moyen', 'Premium'];
  const ratings = [3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full active:scale-95">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h2 className="text-gray-900">Rechercher</h2>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Quelle catégorie ?"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="mb-4 text-gray-900">Catégorie</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-full transition-all active:scale-95 ${
                  category === cat
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin size={20} className="text-blue-700" />
            </div>
            <h3 className="text-gray-900">Proximité</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {distances.map((dist) => (
              <button
                key={dist}
                onClick={() => setFilters({ ...filters, maxDistance: dist })}
                className={`py-3 rounded-xl transition-all active:scale-95 ${
                  filters.maxDistance === dist
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign size={20} className="text-green-700" />
            </div>
            <h3 className="text-gray-900">Gamme de prix</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {prices.map((price) => (
              <button
                key={price}
                onClick={() => setFilters({ ...filters, priceRange: price })}
                className={`py-3 rounded-xl transition-all active:scale-95 ${
                  filters.priceRange === price
                    ? 'bg-green-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Star size={20} className="text-amber-600" />
            </div>
            <h3 className="text-gray-900">Note minimum</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters({ ...filters, minRating: rating })}
                className={`py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  filters.minRating === rating
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star size={16} fill="currentColor" />
                {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={onSearch}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Search size={22} />
            Voir les artisans
          </button>

          <button
            onClick={() => {
              setCategory('');
              setFilters({ maxDistance: '', priceRange: '', minRating: 0, availability: '' });
            }}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
