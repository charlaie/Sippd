import { View, Text } from 'react-native';

export default function AddPage() {
  // This component will never be rendered because we use a custom tabBarButton
  // But it's required by Expo Router for the tab to exist
  return (
    <View>
      <Text>Add Page</Text>
      <Text>This page should not be visible</Text>
    </View>
  );
}