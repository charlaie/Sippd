import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet } from 'react-native';
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

// Ultra-minimal debug version
export default function MapViewDebug({ shops, onShopPress }: MapViewComponentProps) {
  const [mapReady, setMapReady] = useState(false);
  
  const region = {
    latitude: 22.4534,
    longitude: 114.1675,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>
        Platform: {Platform.OS} | Map Ready: {mapReady ? 'Yes' : 'No'}
      </Text>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        onMapReady={() => {
          console.log('Map ready on', Platform.OS);
          setMapReady(true);
        }}
        onError={(error) => {
          console.error('Map error:', error);
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor="#d86a2b"
        loadingBackgroundColor="#fffcf6"
      >
        {/* Single test marker */}
        <Marker
          coordinate={{
            latitude: 22.4534,
            longitude: 114.1675,
          }}
          title="Test Location"
          description="Testing marker visibility"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  debugText: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 4,
    zIndex: 1000,
    fontSize: 12,
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
});