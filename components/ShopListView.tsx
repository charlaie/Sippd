import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  Star,
  MapPin,
  Clock,
  ArrowUpDown,
  ListFilter as Filter,
  ChevronDown,
  Check,
} from 'lucide-react-native';

interface Shop {
  id: number;
  name: string;
  rating: number;
  location: string;
  latitude: number;
  longitude: number;
  image: string;
  hours: string;
  isOpen: boolean;
  distance: string;
  phone: string;
  website: string;
  description: string;
  featuredItems: {
    name: string;
    price: string;
    image: string;
  }[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    userImage: string;
  }[];
}

interface ShopCardProps {
  shop: Shop;
  onPress: () => void;
}

function ShopCard({ shop, onPress }: ShopCardProps) {
  return (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="flex-row">
        {/* Shop Image */}
        <Image
          source={{ uri: shop.image }}
          className="h-24 w-24 rounded-l-2xl"
          resizeMode="cover"
        />

        {/* Shop Info */}
        <View className="flex-1 p-4">
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="mr-2 flex-1 text-lg font-bold text-primary-text" numberOfLines={1}>
              {shop.name}
            </Text>
            <View
              className={`rounded-full px-2 py-1 ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              <Text className="text-xs font-bold text-white">
                {shop.isOpen ? 'OPEN' : 'CLOSED'}
              </Text>
            </View>
          </View>

          <View className="mb-2 flex-row items-center">
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text className="ml-1 mr-3 text-sm text-accent-text">{shop.rating}</Text>
            <Text className="text-sm text-accent-text">{shop.distance}</Text>
          </View>

          <View className="mb-2 flex-row items-start">
            <MapPin size={12} color="#707070" className="mr-1 mt-0.5" />
            <Text className="flex-1 text-xs text-accent-text" numberOfLines={2}>
              {shop.location}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={12} color="#707070" />
            <Text className="ml-1 text-xs text-accent-text">{shop.hours}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface DropdownProps {
  isVisible: boolean;
  onClose: () => void;
  options: { id: string; label: string; selected?: boolean }[];
  onSelect: (id: string) => void;
  title: string;
}

function Dropdown({ isVisible, onClose, options, onSelect, title }: DropdownProps) {
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity className="absolute inset-0 z-40" onPress={onClose} activeOpacity={1} />

      {/* Dropdown Content */}
      <View className="absolute left-6 right-6 top-16 z-50 rounded-2xl border border-gray-100 bg-white shadow-lg">
        <View className="border-b border-gray-100 p-4">
          <Text className="text-lg font-bold text-primary-text">{title}</Text>
        </View>

        <ScrollView className="max-h-64">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="flex-row items-center justify-between border-b border-gray-50 p-4 last:border-b-0"
              onPress={() => {
                onSelect(option.id);
                onClose();
              }}
              activeOpacity={0.7}>
              <Text
                className={`text-base ${option.selected ? 'font-semibold text-secondary-primary' : 'text-primary-text'}`}>
                {option.label}
              </Text>
              {option.selected && <Check size={20} color="#d86a2b" />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

interface ShopListViewProps {
  shops: Shop[];
  onShopPress: (shop: Shop) => void;
}

export default function ShopListView({ shops, onShopPress }: ShopListViewProps) {
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const sortOptions = [
    { id: 'distance', label: 'Distance', selected: sortBy === 'distance' },
    { id: 'rating', label: 'Rating', selected: sortBy === 'rating' },
    { id: 'name', label: 'Name', selected: sortBy === 'name' },
  ];

  const filterOptions = [
    { id: 'open-now', label: 'Open Now', selected: selectedFilters.includes('open-now') },
    { id: 'nearby', label: 'Nearby (< 1km)', selected: selectedFilters.includes('nearby') },
    {
      id: 'high-rated',
      label: 'High Rated (4.5+)',
      selected: selectedFilters.includes('high-rated'),
    },
    { id: 'bubble-tea', label: 'Bubble Tea', selected: selectedFilters.includes('bubble-tea') },
    { id: 'coffee', label: 'Coffee', selected: selectedFilters.includes('coffee') },
    { id: 'juice', label: 'Fresh Juice', selected: selectedFilters.includes('juice') },
  ];

  const handleSortSelect = (sortId: string) => {
    setSortBy(sortId as 'distance' | 'rating' | 'name');
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'rating':
        return 'Rating';
      case 'name':
        return 'Name';
      case 'distance':
      default:
        return 'Distance';
    }
  };

  const getFilterLabel = () => {
    if (selectedFilters.length === 0) return 'Filter';
    if (selectedFilters.length === 1) {
      const filter = filterOptions.find((f) => f.id === selectedFilters[0]);
      return filter?.label || 'Filter';
    }
    return `${selectedFilters.length} Filters`;
  };

  // Apply sorting
  const sortedShops = [...shops].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
      default:
        return parseFloat(a.distance) - parseFloat(b.distance);
    }
  });

  // Apply filtering
  const filteredShops = sortedShops.filter((shop) => {
    if (selectedFilters.length === 0) return true;

    return selectedFilters.every((filter) => {
      switch (filter) {
        case 'open-now':
          return shop.isOpen;
        case 'nearby':
          return parseFloat(shop.distance) < 1;
        case 'high-rated':
          return shop.rating >= 4.5;
        case 'bubble-tea':
          return (
            shop.name.toLowerCase().includes('tea') || shop.name.toLowerCase().includes('bubble')
          );
        case 'coffee':
          return shop.name.toLowerCase().includes('coffee');
        case 'juice':
          return shop.name.toLowerCase().includes('juice');
        default:
          return true;
      }
    });
  });

  return (
    <View className="relative flex-1 pt-28">
      {/* Sort and Filter Controls */}
      <View className="mb-4 flex-row items-center justify-between px-6">
        <TouchableOpacity
          className="flex-row items-center rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm"
          onPress={() => {
            setShowFilterDropdown(false);
            setShowSortDropdown(!showSortDropdown);
          }}
          activeOpacity={0.7}>
          <ArrowUpDown size={14} color="#707070" />
          <Text className="ml-1.5 mr-1 text-xs font-medium text-accent-text">{getSortLabel()}</Text>
          <ChevronDown
            size={14}
            color="#707070"
            style={{
              transform: [{ rotate: showSortDropdown ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center rounded-xl border bg-white px-3 py-2 shadow-sm ${
            selectedFilters.length > 0 ? 'border-secondary-primary' : 'border-gray-100'
          }`}
          onPress={() => {
            setShowSortDropdown(false);
            setShowFilterDropdown(!showFilterDropdown);
          }}
          activeOpacity={0.7}>
          <Filter size={14} color={selectedFilters.length > 0 ? '#d86a2b' : '#707070'} />
          <Text
            className={`ml-1.5 mr-1 text-xs font-medium ${
              selectedFilters.length > 0 ? 'text-secondary-primary' : 'text-accent-text'
            }`}>
            {getFilterLabel()}
          </Text>
          <ChevronDown
            size={14}
            color={selectedFilters.length > 0 ? '#d86a2b' : '#707070'}
            style={{
              transform: [{ rotate: showFilterDropdown ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdowns */}
      <Dropdown
        isVisible={showSortDropdown}
        onClose={() => setShowSortDropdown(false)}
        options={sortOptions}
        onSelect={handleSortSelect}
        title="Sort by"
      />

      <Dropdown
        isVisible={showFilterDropdown}
        onClose={() => setShowFilterDropdown(false)}
        options={filterOptions}
        onSelect={handleFilterSelect}
        title="Filter options"
      />

      {/* Shop List */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-primary-text">
            {filteredShops.length} shops found
          </Text>
          {selectedFilters.length > 0 && (
            <TouchableOpacity
              onPress={() => setSelectedFilters([])}
              className="rounded-full bg-gray-100 px-3 py-1">
              <Text className="text-xs font-medium text-accent-text">Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} onPress={() => onShopPress(shop)} />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Filter size={48} color="#d86a2b" />
            <Text className="mb-2 mt-4 text-xl font-bold text-primary-text">No shops found</Text>
            <Text className="text-center text-accent-text">
              Try adjusting your filters or search criteria
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedFilters([])}
              className="mt-4 rounded-xl bg-secondary-primary px-6 py-3">
              <Text className="font-semibold text-white">Clear all filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
