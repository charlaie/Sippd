
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const highlightBanner = [
  { id: '1', image: 'https://via.placeholder.com/300x150.png?text=Highlight+1' },
  { id: '2', image: 'https://via.placeholder.com/300x150.png?text=Highlight+2' },
  { id: '3', image: 'https://via.placeholder.com/300x150.png?text=Highlight+3' },
];

const trendingShops = [
  { id: '1', name: 'Shop 1', image: 'https://via.placeholder.com/100x100.png?text=Shop+1' },
  { id: '2', name: 'Shop 2', image: 'https://via.placeholder.com/100x100.png?text=Shop+2' },
  { id: '3', name: 'Shop 3', image: 'https://via.placeholder.com/100x100.png?text=Shop+3' },
  { id: '4', name: 'Shop 4', image: 'https://via.placeholder.com/100x100.png?text=Shop+4' },
];

const vouchers = [
  { id: '1', title: 'Voucher 1', image: 'https://via.placeholder.com/150x100.png?text=Voucher+1' },
  { id: '2', title: 'Voucher 2', image: 'https://via.placeholder.com/150x100.png?text=Voucher+2' },
  { id: '3', title: 'Voucher 3', image: 'https://via.placeholder.com/150x100.png?text=Voucher+3' },
];

const tierList = [
  { id: '1', name: 'Tier 1', image: 'https://via.placeholder.com/50x50.png?text=T1' },
  { id: '2', name: 'Tier 2', image: 'https://via.placeholder.com/50x50.png?text=T2' },
  { id: '3', name: 'Tier 3', image: 'https://via.placeholder.com/50x50.png?text=T3' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-gray-100">
      <ScrollView>
        <View className="p-4">
          <Text className="text-2xl font-bold">Welcome back, Charlie!</Text>
        </View>

        <View>
          <FlatList
            data={highlightBanner}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} className="w-screen h-48" />
            )}
          />
        </View>

        <View className="p-4">
          <Text className="text-xl font-bold mb-2">Trending Shops</Text>
          <FlatList
            data={trendingShops}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mr-4 items-center">
                <Image source={{ uri: item.image }} className="w-24 h-24 rounded-full" />
                <Text className="mt-2">{item.name}</Text>
              </View>
            )}
          />
        </View>

        <View className="p-4">
          <Text className="text-xl font-bold mb-2">Vouchers</Text>
          <FlatList
            data={vouchers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} className="w-40 h-28 rounded-lg mr-4" />
            )}
          />
        </View>

        <View className="p-4">
          <Text className="text-xl font-bold mb-2">Tier List</Text>
          <View className="flex-row justify-around">
            {tierList.map((item) => (
              <View key={item.id} className="items-center">
                <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full" />
                <Text className="mt-2">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
