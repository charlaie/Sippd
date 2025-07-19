import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Map, List } from 'lucide-react-native';
import MapViewComponent from '../../components/MapView';
import ShopDrawer from '../../components/ShopDrawer';
import ShopListView from '../../components/ShopListView';

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

const mockShops: Shop[] = [
  {
    id: 1,
    name: 'Ten Ren Tea',
    rating: 4.8,
    location: 'Floor 2, 9 On Pong Rd, Tai Po',
    latitude: 22.4534,
    longitude: 114.1675,
    image:
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 11:00-22:00',
    isOpen: true,
    distance: '0.2 km',
    phone: '+852 2345 6789',
    website: 'tenren.com.hk',
    description:
      'Ten Ren Tea Co. Ltd. is dedicated to the fine art of enjoying Chinese tea and the distribution of the finest teas available worldwide. Founded in Taiwan in 1953, Ten Ren Tea has quickly expanded to more than 100 retail stores worldwide and more than 20 stores in North America to provide convenient access to its fine teas and ginseng.',
    featuredItems: [
      {
        name: 'Bubble Milk Tea',
        price: 'HK$28',
        image:
          'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Oolong Tea',
        price: 'HK$25',
        image:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Green Tea Latte',
        price: 'HK$32',
        image:
          'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Sarah Chen',
        rating: 5,
        comment: 'Amazing bubble tea! The pearls are perfectly chewy and the tea has great flavor.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 2,
        user: 'Mike Wong',
        rating: 4,
        comment: 'Good quality tea, authentic taste. Staff is friendly and service is quick.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
      {
        id: 3,
        user: 'Lisa Kim',
        rating: 5,
        comment: 'Best tea shop in the area! Love their seasonal specials.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
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
    image:
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 10:00-23:00',
    isOpen: true,
    distance: '0.5 km',
    phone: '+852 2876 5432',
    website: 'tigersugar.com',
    description:
      'Tiger Sugar is famous for its signature brown sugar boba milk tea with unique tiger stripe pattern. Each cup is carefully crafted with premium ingredients.',
    featuredItems: [
      {
        name: 'Brown Sugar Boba',
        price: 'HK$35',
        image:
          'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'Tiger Milk Tea',
        price: 'HK$38',
        image:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Jenny Liu',
        rating: 5,
        comment: 'The brown sugar boba is incredible! Worth the wait.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
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
    image:
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 11:30-21:30',
    isOpen: false,
    distance: '0.8 km',
    phone: '+852 2987 6543',
    website: 'chichasanchen.com',
    description:
      'CHICHA San Chen specializes in premium tea drinks with a focus on traditional Taiwanese tea culture and modern brewing techniques.',
    featuredItems: [
      {
        name: 'Cheese Tea',
        price: 'HK$42',
        image:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'David Park',
        rating: 4,
        comment: 'Unique flavors and high quality ingredients. A bit pricey but worth it.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
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
    image:
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    hours: 'TODAY 09:00-22:30',
    isOpen: true,
    distance: '1.2 km',
    phone: '+852 2765 4321',
    website: 'gongcha.com.hk',
    description:
      'Gong Cha offers a wide variety of freshly brewed teas with customizable sweetness and ice levels.',
    featuredItems: [
      {
        name: 'Taro Milk Tea',
        price: 'HK$30',
        image:
          'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Amy Zhang',
        rating: 4,
        comment: 'Consistent quality and good value for money.',
        userImage:
          'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100',
      },
    ],
  },
];

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleShopPress = (shop: Shop) => {
    setSelectedShop(shop);
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setTimeout(() => setSelectedShop(null), 300);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#fffcf6" />

      {/* Floating Toggle Buttons */}
      <View className="absolute left-6 right-6 top-16 z-10">
        <View className="flex-row rounded-2xl bg-white p-1 shadow-lg">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center rounded-xl px-4 py-3 ${
              viewMode === 'map' ? 'bg-secondary-primary' : 'bg-transparent'
            }`}
            onPress={() => setViewMode('map')}
            activeOpacity={0.7}>
            <Map size={18} color={viewMode === 'map' ? '#ffffff' : '#707070'} className="mr-2" />
            <Text
              className={`text-sm font-semibold ${
                viewMode === 'map' ? 'text-white' : 'text-accent-text'
              }`}>
              Map View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center rounded-xl px-4 py-3 ${
              viewMode === 'list' ? 'bg-secondary-primary' : 'bg-transparent'
            }`}
            onPress={() => setViewMode('list')}
            activeOpacity={0.7}>
            <List size={18} color={viewMode === 'list' ? '#ffffff' : '#707070'} className="mr-2" />
            <Text
              className={`text-sm font-semibold ${
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
          <ShopListView shops={mockShops} onShopPress={handleShopPress} />
        )}
      </View>

      {/* Shop Drawer */}
      <ShopDrawer shop={selectedShop} isVisible={isDrawerVisible} onClose={handleCloseDrawer} />
    </View>
  );
}
