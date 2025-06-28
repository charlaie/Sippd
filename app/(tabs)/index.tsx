import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, ChevronRight } from 'lucide-react-native';

export default function HomePage() {
  const trendingShops = [
    {
      id: 1,
      name: 'Ten Ren Tea',
      rating: 4.8,
      location: 'Floor 2, 9 On Pong Rd, Tai Po',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Tiger Sugar',
      rating: 4.9,
      location: 'Floor 2, 9 On Pong Rd, Tai Po',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'CHICHA San Chen',
      rating: 4.7,
      location: 'Floor 2, 9 On Pong Rd, Tai Po',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const vouchers = [
    {
      id: 1,
      title: 'HKD 3 TenRen\'s Tea flash discount voucher',
      buttonText: 'Grab Now',
      icon: '🎯',
    },
    {
      id: 2,
      title: 'Buy One Get One Free limited voucher',
      buttonText: 'Grab Now',
      icon: '🎁',
    },
    {
      id: 3,
      title: '10% off selected drink items',
      buttonText: 'Grab Now',
      icon: '🎁',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-secondary-primary text-lg font-medium mb-2">
            Welcome back, Charli
          </Text>
          <Text className="text-primary-text text-2xl font-bold">
            Ready for your next sip?
          </Text>
        </View>

        {/* Highlight Card */}
        <View className="mx-6 mb-6">
          <View className="bg-secondary-background rounded-2xl p-6 border-2 border-blue-400 relative overflow-hidden">
            <View className="absolute top-4 left-4">
              <View className="bg-secondary-primary px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-semibold">HIGHLIGHT</Text>
              </View>
            </View>
            
            <View className="mt-8 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-secondary-primary text-lg font-semibold mb-1">
                  New record:
                </Text>
                <Text className="text-secondary-primary text-lg font-semibold">
                  5 shops visited this month!
                </Text>
              </View>
              
              <View className="w-20 h-20">
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            
            {/* Pagination dots */}
            <View className="flex-row justify-center mt-4 space-x-2">
              <View className="w-2 h-2 bg-secondary-primary rounded-full" />
              <View className="w-2 h-2 bg-gray-300 rounded-full" />
              <View className="w-2 h-2 bg-gray-300 rounded-full" />
            </View>
          </View>
        </View>

        {/* Trending Shops */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-primary-text text-xl font-bold">Trending Shops</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-secondary-primary text-sm font-medium mr-1">See all</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {trendingShops.map((shop, index) => (
              <TouchableOpacity
                key={shop.id}
                className={`bg-white rounded-2xl shadow-sm mr-4 ${index === trendingShops.length - 1 ? 'mr-6' : ''}`}
                style={{ width: 160 }}
              >
                <Image
                  source={{ uri: shop.image }}
                  className="w-full h-24 rounded-t-2xl"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <Text className="text-primary-text font-semibold text-sm mb-2" numberOfLines={1}>
                    {shop.name}
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text className="text-accent-text text-xs ml-1">{shop.rating}</Text>
                  </View>
                  <View className="flex-row items-start">
                    <MapPin size={10} color="#707070" className="mt-0.5 mr-1" />
                    <Text className="text-accent-text text-xs flex-1" numberOfLines={2}>
                      {shop.location}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Vouchers */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-primary-text text-xl font-bold">Vouchers</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-secondary-primary text-sm font-medium mr-1">See all</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {vouchers.map((voucher, index) => (
              <View
                key={voucher.id}
                className={`bg-white rounded-2xl shadow-sm mr-4 p-4 ${index === vouchers.length - 1 ? 'mr-6' : ''}`}
                style={{ width: 200 }}
              >
                <View className="items-center mb-3">
                  <Text className="text-3xl mb-2">{voucher.icon}</Text>
                  <Text className="text-primary-text text-sm font-medium text-center leading-5">
                    {voucher.title}
                  </Text>
                </View>
                <TouchableOpacity className="bg-secondary-primary rounded-full py-2 px-4">
                  <Text className="text-white text-sm font-semibold text-center">
                    {voucher.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tier List */}
        <View className="px-6 mb-8">
          <Text className="text-primary-text text-xl font-bold mb-4">Tier List</Text>
          <View className="bg-secondary-background rounded-2xl p-6 relative overflow-hidden">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-secondary-primary text-lg font-semibold mb-2">
                  Bronze Tier
                </Text>
                <Text className="text-accent-text text-sm mb-4">
                  Visit 3 more shops to reach Silver tier
                </Text>
                
                {/* Progress bar */}
                <View className="bg-white rounded-full h-2 mb-4">
                  <View className="bg-secondary-primary rounded-full h-2" style={{ width: '60%' }} />
                </View>
                
                <Text className="text-accent-text text-xs">7/10 shops visited</Text>
              </View>
              
              <View className="w-16 h-16 bg-amber-600 rounded-full items-center justify-center ml-4">
                <Text className="text-white text-2xl">🥉</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}