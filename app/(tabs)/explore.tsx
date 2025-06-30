import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Map, List, Filter, ArrowUpDown, Star, MapPin, Clock, Phone } from 'lucide-react-native';
import MapViewComponent from '../../components/MapView';
import ShopDrawer from '../../components/ShopDrawer';

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

const mockShops: Shop[] = [
  {
    id: 1,
    name: 'Ten Ren Tea',
    rating: 4.8,
    location: 'Floor 2, 9 On Pong Rd, Tai Po',
    latitude: 22.4534,
    longitude: 114.1675,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 11:00-22:00',
    isOpen: true,
    distance: '0.2 km',
    phone: '+852 2345 6789',
    website: 'tenren.com.hk',
    description: 'Ten Ren Tea Co. Ltd. is dedicated to the fine art of enjoying Chinese tea and the distribution of the finest teas available worldwide. Founded in Taiwan in 1953, Ten Ren Tea has quickly expanded to more than 100 retail stores worldwide and more than 20 stores in North America to provide convenient access to its fine teas and ginseng.',
    featuredItems: [
      {
        name: 'Bubble Milk Tea',
        price: 'HK$28',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Oolong Tea',
        price: 'HK$25',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Green Tea Latte',
        price: 'HK$32',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Sarah Chen',
        rating: 5,
        comment: 'Amazing bubble tea! The pearls are perfectly chewy and the tea has great flavor.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 2,
        user: 'Mike Wong',
        rating: 4,
        comment: 'Good quality tea, authentic taste. Staff is friendly and service is quick.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 3,
        user: 'Lisa Kim',
        rating: 5,
        comment: 'Best tea shop in the area! Love their seasonal specials.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  },
  {
    id: 2,
    name: 'Tiger Sugar',
    rating: 4.9,
    location: 'Shop 15, Tai Po Plaza',
    latitude: 22.4584,
    longitude: 114.1725,
    image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 10:00-23:00',
    isOpen: true,
    distance: '0.5 km',
    phone: '+852 2876 5432',
    website: 'tigersugar.com',
    description: 'Tiger Sugar is famous for its signature brown sugar boba milk tea with unique tiger stripe pattern. Each cup is carefully crafted with premium ingredients.',
    featuredItems: [
      {
        name: 'Brown Sugar Boba',
        price: 'HK$35',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Tiger Milk Tea',
        price: 'HK$38',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Jenny Liu',
        rating: 5,
        comment: 'The brown sugar boba is incredible! Worth the wait.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  },
  {
    id: 3,
    name: 'CHICHA San Chen',
    rating: 4.7,
    location: 'G/F, 123 Kwong Fuk Road',
    latitude: 22.4484,
    longitude: 114.1625,
    image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 11:30-21:30',
    isOpen: false,
    distance: '0.8 km',
    phone: '+852 2987 6543',
    website: 'chichasanchen.com',
    description: 'CHICHA San Chen specializes in premium tea drinks with a focus on traditional Taiwanese tea culture and modern brewing techniques.',
    featuredItems: [
      {
        name: 'Cheese Tea',
        price: 'HK$42',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'David Park',
        rating: 4,
        comment: 'Unique flavors and high quality ingredients. A bit pricey but worth it.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  },
  {
    id: 4,
    name: 'Gong Cha',
    rating: 4.6,
    location: 'Unit 5, Tai Po Market',
    latitude: 22.4434,
    longitude: 114.1575,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 09:00-22:30',
    isOpen: true,
    distance: '1.2 km',
    phone: '+852 2765 4321',
    website: 'gongcha.com.hk',
    description: 'Gong Cha offers a wide variety of freshly brewed teas with customizable sweetness and ice levels.',
    featuredItems: [
      {
        name: 'Taro Milk Tea',
        price: 'HK$30',
        image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Amy Zhang',
        rating: 4,
        comment: 'Consistent quality and good value for money.',
        userImage: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  },
];

interface ShopCardProps {
  shop: Shop;
  onPress: () => void;
}

function ShopCard({ shop, onPress }: ShopCardProps) {
  return (
    <TouchableOpacity 
      className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        {/* Shop Image */}
        <Image
          source={{ uri: shop.image }}
          className="w-24 h-24 rounded-l-2xl"
          resizeMode="cover"
        />
        
        {/* Shop Info */}
        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-primary-text text-lg font-bold flex-1 mr-2" numberOfLines={1}>
              {shop.name}
            </Text>
            <View className={`px-2 py-1 rounded-full ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              <Text className="text-white text-xs font-bold">
                {shop.isOpen ? 'OPEN' : 'CLOSED'}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text className="text-accent-text text-sm ml-1 mr-3">
              {shop.rating}
            </Text>
            <Text className="text-accent-text text-sm">
              {shop.distance}
            </Text>
          </View>
          
          <View className="flex-row items-start mb-2">
            <MapPin size={12} color="#707070" className="mt-0.5 mr-1" />
            <Text className="text-accent-text text-xs flex-1" numberOfLines={2}>
              {shop.location}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Clock size={12} color="#707070" />
            <Text className="text-accent-text text-xs ml-1">
              {shop.hours}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleShopPress = (shop: Shop) => {
    setSelectedShop(shop);
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setTimeout(() => setSelectedShop(null), 300);
  };

  const sortedShops = [...mockShops].sort((a, b) => {
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

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#fffcf6" />
      
      {/* Floating Toggle Buttons */}
      <View className="absolute top-16 left-6 right-6 z-10">
        <View className="bg-white rounded-2xl shadow-lg p-1 flex-row">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-xl ${
              viewMode === 'map' ? 'bg-secondary-primary' : 'bg-transparent'
            }`}
            onPress={() => setViewMode('map')}
            activeOpacity={0.7}
          >
            <Map 
              size={18} 
              color={viewMode === 'map' ? '#ffffff' : '#707070'} 
              className="mr-2"
            />
            <Text className={`text-sm font-semibold ${
              viewMode === 'map' ? 'text-white' : 'text-accent-text'
            }`}>
              Map View
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-xl ${
              viewMode === 'list' ? 'bg-secondary-primary' : 'bg-transparent'
            }`}
            onPress={() => setViewMode('list')}
            activeOpacity={0.7}
          >
            <List 
              size={18} 
              color={viewMode === 'list' ? '#ffffff' : '#707070'} 
              className="mr-2"
            />
            <Text className={`text-sm font-semibold ${
              viewMode === 'list' ? 'text-white' : 'text-accent-text'
            }`}>
              List View
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {viewMode === 'map' ? (
          <MapViewComponent shops={mockShops} onShopPress={handleShopPress} />
        ) : (
          <View className="flex-1 pt-28">
            {/* Sort and Filter Controls */}
            <View className="flex-row items-center justify-between px-6 mb-4">
              <TouchableOpacity 
                className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-sm"
                onPress={() => {
                  const sortOptions = ['distance', 'rating', 'name'] as const;
                  const currentIndex = sortOptions.indexOf(sortBy);
                  const nextIndex = (currentIndex + 1) % sortOptions.length;
                  setSortBy(sortOptions[nextIndex]);
                }}
                activeOpacity={0.7}
              >
                <ArrowUpDown size={16} color="#707070" />
                <Text className="text-accent-text text-sm ml-2 font-medium">
                  Sort by {getSortLabel()}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-sm"
                onPress={() => setFilterOpen(!filterOpen)}
                activeOpacity={0.7}
              >
                <Filter size={16} color="#707070" />
                <Text className="text-accent-text text-sm ml-2 font-medium">
                  Filter
                </Text>
              </TouchableOpacity>
            </View>

            {/* Filter Options (when expanded) */}
            {filterOpen && (
              <View className="mx-6 mb-4 bg-white rounded-2xl p-4 shadow-sm">
                <Text className="text-primary-text text-base font-semibold mb-3">
                  Filter Options
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  <TouchableOpacity className="bg-gray-100 rounded-full px-3 py-2">
                    <Text className="text-accent-text text-sm">Open Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-100 rounded-full px-3 py-2">
                    <Text className="text-accent-text text-sm">Nearby</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-100 rounded-full px-3 py-2">
                    <Text className="text-accent-text text-sm">High Rated</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-100 rounded-full px-3 py-2">
                    <Text className="text-accent-text text-sm">Bubble Tea</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Shop List */}
            <ScrollView 
              className="flex-1 px-6" 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              <Text className="text-primary-text text-lg font-bold mb-4">
                {sortedShops.length} shops found
              </Text>
              
              {sortedShops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  onPress={() => handleShopPress(shop)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Shop Drawer */}
      <ShopDrawer
        shop={selectedShop}
        isVisible={isDrawerVisible}
        onClose={handleCloseDrawer}
      />
    </View>
  );
}