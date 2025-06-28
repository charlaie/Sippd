import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
  const [region] = useState({
    latitude: 22.4534,
    longitude: 114.1675,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            onPress={() => onShopPress(shop)}
          >
            <View className="items-center justify-center">
              <View className="w-6 h-6 rounded-full bg-secondary-primary border-3 border-white shadow-lg items-center justify-center">
                <View className="w-2 h-2 rounded-full bg-white" />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}