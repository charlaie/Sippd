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
  featuredItems: Array<{
    name: string;
    price: string;
    image: string;
  }>;
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    comment: string;
    userImage: string;
  }>;
}

interface MapViewComponentProps {
  shops: Shop[];
  onShopPress: (shop: Shop) => void;
}

export default function MapViewComponent({ shops, onShopPress }: MapViewComponentProps) {
  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center bg-blue-50 m-4 rounded-xl p-8">
        <MapPin size={48} color="#d86a2b" />
        <Text className="text-2xl font-bold text-primary-text mt-4 mb-2">
          Map View
        </Text>
        <Text className="text-base text-accent-text text-center leading-6">
          Interactive map is available on mobile devices
        </Text>
      </View>
      
      <View className="bg-white rounded-t-2xl p-4 max-h-[40%]">
        <Text className="text-xl font-bold text-primary-text mb-4">
          Nearby Shops
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              className="flex-row items-center py-3 px-2 rounded-lg mb-2 bg-gray-50"
              onPress={() => onShopPress(shop)}
            >
              <View className="w-4 h-4 rounded-full bg-secondary-primary mr-3" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-primary-text mb-1">
                  {shop.name}
                </Text>
                <Text className="text-sm text-accent-text mb-1">
                  {shop.location}
                </Text>
                <Text className="text-xs text-gray-400">
                  {shop.distance}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}