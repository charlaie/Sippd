import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <MapPin size={48} color="#d86a2b" />
        <Text style={styles.placeholderTitle}>Map View</Text>
        <Text style={styles.placeholderSubtitle}>
          Interactive map is available on mobile devices
        </Text>
      </View>
      
      <View style={styles.shopsList}>
        <Text style={styles.shopsListTitle}>Nearby Shops</Text>
        {shops.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={styles.shopItem}
            onPress={() => onShopPress(shop)}
          >
            <View style={styles.shopMarker} />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopLocation}>{shop.location}</Text>
              <Text style={styles.shopDistance}>{shop.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    margin: 16,
    borderRadius: 12,
    padding: 32,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  shopsList: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '40%',
  },
  shopsListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  shopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  shopMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#d86a2b',
    marginRight: 12,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  shopLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  shopDistance: {
    fontSize: 12,
    color: '#999',
  },
});