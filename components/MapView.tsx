import React, { useState } from 'react';
import { View, Platform, Text } from 'react-native';
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
  const [region] = useState({
    latitude: 22.4534,
    longitude: 114.1675,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Simplified map style - removing custom styling temporarily
  const mapStyle = [];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        // Temporarily removing custom map style
        // customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        // Add some debugging props
        onMapReady={() => {
          console.log('Map is ready');
        }}
        onRegionChange={(region) => {
          console.log('Region changed:', region);
        }}>
        {/* Temporarily simplifying markers */}
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            onPress={() => onShopPress(shop)}
            title={shop.name}
            description={shop.location}
          />
        ))}
      </MapView>
    </View>
  );
}
