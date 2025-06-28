import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrackPage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center">
        <Text className="text-primary-text text-xl font-bold">Track</Text>
        <Text className="text-accent-text text-sm mt-2">Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}