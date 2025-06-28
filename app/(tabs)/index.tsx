import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
    },
    {
      id: 2,
      title: 'Buy One Get One Free limited voucher',
      buttonText: 'Grab Now',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
    },
    {
      id: 3,
      title: '10% off selected drink items',
      buttonText: 'Grab Now',
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60',
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
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Shops</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {trendingShops.map((shop, index) => (
              <TouchableOpacity
                key={shop.id}
                style={[
                  styles.shopCard,
                  { marginRight: index === trendingShops.length - 1 ? 24 : 16 }
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: shop.image }}
                    style={styles.shopImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.shopInfo}>
                  <Text style={styles.shopName} numberOfLines={1}>
                    {shop.name}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{shop.rating}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin size={10} color="#707070" style={styles.locationIcon} />
                    <Text style={styles.locationText} numberOfLines={2}>
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
                className={`bg-white rounded-2xl shadow-sm mr-4 pt-6 px-4 pb-6 relative overflow-visible ${index === vouchers.length - 1 ? 'mr-6' : ''}`}
                style={{ width: 200 }}
              >
                <View className="items-center mb-6">
                  <View className="w-16 h-16 rounded-full bg-white items-center justify-center shadow-sm mb-3">
                    <Image
                      source={{ uri: voucher.image }}
                      className="w-10 h-10 rounded-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-primary-text text-sm font-medium text-center leading-5">
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
                  className="absolute w-6 h-6 rounded-full bg-white -left-3"
                  style={{ top: 'calc(60% - 12px)' }}
                />
                
                {/* Right circular cutout */}
                <View 
                  className="absolute w-6 h-6 rounded-full bg-white -right-3"
                  style={{ top: 'calc(60% - 12px)' }}
                />
                
                <TouchableOpacity className="bg-secondary-primary rounded-full py-2 self-center mt-4 w-40">
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