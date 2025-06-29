import { View, Text, StyleSheet } from 'react-native';

export default function AddPage() {
  // This component will never be rendered because we use a custom tabBarButton
  // But it's required by Expo Router for the tab to exist
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Page</Text>
      <Text style={styles.subtext}>This page should not be visible</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffcf6',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f4f4f',
  },
  subtext: {
    fontSize: 14,
    color: '#707070',
    marginTop: 8,
  },
});