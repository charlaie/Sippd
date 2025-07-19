import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

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

interface MapViewComponentProps {
  shops: Shop[];
  onShopPress: (shop: Shop) => void;
}

export default function MapViewComponent({ shops, onShopPress }: MapViewComponentProps) {
  return (
    <View className="flex-1 bg-gray-100">
      <View className="m-4 flex-1 items-center justify-center rounded-xl bg-blue-50 p-8">
        <MapPin size={48} color="#d86a2b" />
        <Text className="mb-2 mt-4 text-2xl font-bold text-primary-text">Map View</Text>
        <Text className="text-center text-base leading-6 text-accent-text">
          Interactive map is available on mobile devices
        </Text>
      </View>

      <View className="max-h-[40%] rounded-t-2xl bg-white p-4">
        <Text className="mb-4 text-xl font-bold text-primary-text">Nearby Shops</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              className="mb-2 flex-row items-center rounded-lg bg-gray-50 px-2 py-3"
              onPress={() => onShopPress(shop)}>
              <View className="mr-3 h-4 w-4 rounded-full bg-secondary-primary" />
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-primary-text">{shop.name}</Text>
                <Text className="mb-1 text-sm text-accent-text">{shop.location}</Text>
                <Text className="text-xs text-gray-400">{shop.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
