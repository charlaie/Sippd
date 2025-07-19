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
      image:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Tiger Sugar',
      rating: 4.9,
      location: 'Floor 2, 9 On Pong Rd, Tai Po',
      image:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'CHICHA San Chen',
      rating: 4.7,
      location: 'Floor 2, 9 On Pong Rd, Tai Po',
      image:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const vouchers = [
    {
      id: 1,
      title: "HKD 3 TenRen's Tea flash discount voucher",
      buttonText: 'Grab Now',
      image:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
    },
    {
      id: 2,
      title: 'Buy One Get One Free limited voucher',
      buttonText: 'Grab Now',
      image:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
    },
    {
      id: 3,
      title: '10% off selected drink items',
      buttonText: 'Grab Now',
      image:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-6 pt-4">
          <Text className="mb-2 text-lg font-medium text-secondary-primary">
            Welcome back, Charli
          </Text>
          <Text className="text-2xl font-bold text-primary-text">Ready for your next sip?</Text>
        </View>

        {/* Highlight Card */}
        <View className="mx-6 mb-6">
          <View className="relative overflow-hidden rounded-2xl border-2 border-blue-400 bg-secondary-background p-6">
            <View className="absolute left-4 top-4">
              <View className="rounded-full bg-secondary-primary px-3 py-1">
                <Text className="text-xs font-semibold text-white">HIGHLIGHT</Text>
              </View>
            </View>

            <View className="mt-8 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold text-secondary-primary">
                  New record:
                </Text>
                <Text className="text-lg font-semibold text-secondary-primary">
                  5 shops visited this month!
                </Text>
              </View>

              <View className="h-20 w-20">
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200',
                  }}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Pagination dots */}
            <View className="mt-4 flex-row justify-center space-x-2">
              <View className="h-2 w-2 rounded-full bg-secondary-primary" />
              <View className="h-2 w-2 rounded-full bg-gray-300" />
              <View className="h-2 w-2 rounded-full bg-gray-300" />
            </View>
          </View>
        </View>

        {/* Trending Shops */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between px-6">
            <Text className="text-xl font-bold text-primary-text">Trending Shops</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 text-sm font-medium text-secondary-primary">See all</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {trendingShops.map((shop, index) => (
              <TouchableOpacity
                key={shop.id}
                className={`mr-4 overflow-visible rounded-2xl bg-white p-3 shadow-sm ${index === trendingShops.length - 1 ? 'mr-6' : ''}`}
                style={{ width: 160 }}>
                <View className="mb-3 overflow-hidden rounded-xl">
                  <Image source={{ uri: shop.image }} className="h-20 w-full" resizeMode="cover" />
                </View>
                <View className="px-1">
                  <Text className="mb-2 text-sm font-semibold text-primary-text" numberOfLines={1}>
                    {shop.name}
                  </Text>
                  <View className="mb-2 flex-row items-center">
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text className="ml-1 text-xs text-accent-text">{shop.rating}</Text>
                  </View>
                  <View className="flex-row items-start">
                    <MapPin size={10} color="#707070" className="mr-1 mt-0.5" />
                    <Text className="flex-1 text-xs text-accent-text" numberOfLines={2}>
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
          <View className="mb-4 flex-row items-center justify-between px-6">
            <Text className="text-xl font-bold text-primary-text">Vouchers</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 text-sm font-medium text-secondary-primary">See all</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
            {vouchers.map((voucher, index) => (
              <View
                key={voucher.id}
                className={`relative mr-4 overflow-visible rounded-2xl bg-white px-4 pb-6 pt-6 shadow-sm ${index === vouchers.length - 1 ? 'mr-6' : ''}`}
                style={{ width: 200 }}>
                <View className="mb-6 items-center">
                  <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                    <Image
                      source={{ uri: voucher.image }}
                      className="h-10 w-10 rounded-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-center text-sm font-medium leading-5 text-primary-text">
                    {voucher.title}
                  </Text>
                </View>

                {/* Dashed separator line */}
                <View
                  className="absolute left-0 right-0 h-px border-b border-dashed border-gray-300"
                  style={{ top: '60%' }}
                />

                {/* Left circular cutout */}
                <View
                  className="absolute -left-3 h-6 w-6 rounded-full bg-white"
                  style={{ top: 'calc(60% - 12px)' }}
                />

                {/* Right circular cutout */}
                <View
                  className="absolute -right-3 h-6 w-6 rounded-full bg-white"
                  style={{ top: 'calc(60% - 12px)' }}
                />

                <TouchableOpacity className="mt-4 w-40 self-center rounded-full bg-secondary-primary py-2">
                  <Text className="text-center text-sm font-semibold text-white">
                    {voucher.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tier List */}
        <View className="mb-8 px-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Tier List</Text>
          <View className="relative overflow-hidden rounded-2xl bg-secondary-background p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="mb-2 text-lg font-semibold text-secondary-primary">
                  Bronze Tier
                </Text>
                <Text className="mb-4 text-sm text-accent-text">
                  Visit 3 more shops to reach Silver tier
                </Text>

                {/* Progress bar */}
                <View className="mb-4 h-2 rounded-full bg-white">
                  <View
                    className="h-2 rounded-full bg-secondary-primary"
                    style={{ width: '60%' }}
                  />
                </View>

                <Text className="text-xs text-accent-text">7/10 shops visited</Text>
              </View>

              <View className="ml-4 h-16 w-16 items-center justify-center rounded-full bg-amber-600">
                <Text className="text-2xl text-white">🥉</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
