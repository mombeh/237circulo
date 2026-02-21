'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Star,
  Heart,
  Package,
  Truck,
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Recycled Plastic Pellets',
    category: 'Recycled Materials',
    price: 45000,
    unit: 'per ton',
    image: '/trash1.jpg',
    rating: 4.8,
    reviews: 124,
    seller: 'GreenTech Cameroon',
    location: 'Douala',
    inStock: true,
  },
  {
    id: 2,
    name: 'Compost Organic Fertilizer',
    category: 'Organic Products',
    price: 15000,
    unit: 'per 50kg bag',
    image: '/trash1.jpg',
    rating: 4.9,
    reviews: 89,
    seller: 'EcoFarm Solutions',
    location: 'Yaoundé',
    inStock: true,
  },
  {
    id: 3,
    name: 'Recycled Paper Bales',
    category: 'Recycled Materials',
    price: 35000,
    unit: 'per ton',
    image: '/trash1.jpg',
    rating: 4.6,
    reviews: 56,
    seller: 'PaperRecycle Ltd',
    location: 'Douala',
    inStock: true,
  },
  {
    id: 4,
    name: 'Metal Scraps (Aluminum)',
    category: 'Metal Recycling',
    price: 80000,
    unit: 'per ton',
    image: '/trash1.jpg',
    rating: 4.7,
    reviews: 203,
    seller: 'MetalWorks CM',
    location: 'Kribi',
    inStock: true,
  },
  {
    id: 5,
    name: 'Biodegradable Bags',
    category: 'Eco Products',
    price: 2500,
    unit: 'per pack (100 pcs)',
    image: '/trash1.jpg',
    rating: 4.5,
    reviews: 178,
    seller: 'EcoPack Africa',
    location: 'Douala',
    inStock: false,
  },
  {
    id: 6,
    name: 'Glass Cullet',
    category: 'Glass Recycling',
    price: 25000,
    unit: 'per ton',
    image: '/trash1.jpg',
    rating: 4.4,
    reviews: 67,
    seller: 'GlassRecycle CM',
    location: 'Bafoussam',
    inStock: true,
  },
];

const categories = [
  'All Categories',
  'Recycled Materials',
  'Organic Products',
  'Metal Recycling',
  'Eco Products',
  'Glass Recycling',
  'E-Waste',
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      favorites.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Marketplace</h1>
          <p className="text-[var(--color-text-dim)]">Buy and sell recycled materials and eco-products</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-border)]">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <ShoppingBag className="h-4 w-4" />
            Sell Item
          </button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-dim)]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-10 pr-4 text-sm outline-none focus:border-green-600"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-dim)] hover:bg-[var(--color-border)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-all hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-[var(--color-background)]">
              <div className="flex h-full w-full items-center justify-center text-[var(--color-text-dim)]">
                <Package className="h-16 w-16" />
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                    Out of Stock
                  </span>
                </div>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute right-2 top-2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <p className="text-xs text-[var(--color-text-dim)]">{product.category}</p>
              <h3 className="font-semibold text-[var(--color-foreground)]">{product.name}</h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-[var(--color-text-dim)]">({product.reviews} reviews)</span>
              </div>

              {/* Seller Info */}
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-dim)]">
                <span>{product.seller}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  {product.location}
                </span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-lg font-bold text-green-600">
                    {product.price.toLocaleString()} XAF
                  </span>
                  <span className="text-xs text-[var(--color-text-dim)]"> {product.unit}</span>
                </div>
                <button
                  disabled={!product.inStock}
                  className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
