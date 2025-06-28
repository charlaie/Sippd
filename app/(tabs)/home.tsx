import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const highlightBanner = [
  {
    id: '1',
    title: 'New record:',
    subtitle: '5 shops visited this month!',
  },
];

const trendingShops = [
  {
    id: '1',
    name: 'Ten Ren Tea',
    rating: 5,
    location: 'Floor 2, 9 On Pong Rd, Tai Po',
  },
  {
    id: '2',
    name: 'Tiger Sugar',
    rating: 4,
    location: 'Floor 2, 9 On Pong Rd, Tai Po',
  },
  {
    id: '3',
    name: 'CHICHA San',
    rating: 5,
    location: 'Floor 2, 9 On Pong Rd, Tai Po',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fffcf6]">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <Text className="text-lg font-bold text-[#4f4f4f]">Home</Text>
          {/* Placeholder for profile icon or other header elements */}
        </View>

        {/* Welcome Section */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-semibold text-[#d86a2b]">Welcome back, Charli</Text>
          <Text className="mt-1 text-2xl font-bold text-[#4f4f4f]">Ready for your next sip?</Text>
        </View>

        {/* Highlight Banner */}
        <View className="mt-6">
          <FlatList
            data={highlightBanner}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mx-4 w-[350px] rounded-lg bg-[#ffecbc] p-4">
                <View>
                  <View className="self-start rounded-md bg-[#d86a2b] px-2 py-1">
                    <Text className="text-xs font-bold text-white">HIGHLIGHT</Text>
                  </View>
                  <Text className="mt-2 text-lg font-bold text-[#4f4f4f]">{item.title}</Text>
                  <Text className="mt-1 text-base text-[#d86a2b]">{item.subtitle}</Text>
                </View>
              </View>
            )}
          />
          <View className="mt-2 flex-row justify-center">
            {highlightBanner.map((_, index) => (
              <View
                key={index}
                className={`mx-1 h-2 w-2 rounded-full ${index === 0 ? 'bg-[#d86a2b]' : 'bg-gray-300'}`}
              />
            ))}
          </View>
        </View>

        {/* Trending Shops */}
        <View className="mt-8 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-[#4f4f4f]">Trending Shops</Text>
            <TouchableOpacity>
              <Text className="text-base text-[#d86a2b]">See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingShops}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mr-4 h-52 w-40 rounded-lg bg-white shadow-md" />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
