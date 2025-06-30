import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 300,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          animation: 'none', // No animation for the main profile page
        }} 
      />
      <Stack.Screen 
        name="vouchers" 
        options={{ 
          title: 'Vouchers',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          animationDuration: 250,
        }} 
      />
      <Stack.Screen 
        name="payment-details" 
        options={{ 
          title: 'My Payment Details',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          animationDuration: 250,
        }} 
      />
      <Stack.Screen 
        name="reviews" 
        options={{ 
          title: 'Reviews',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          animationDuration: 250,
        }} 
      />
      <Stack.Screen 
        name="tier-list" 
        options={{ 
          title: 'My Tier List',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          animationDuration: 250,
        }} 
      />
      <Stack.Screen 
        name="help-centre" 
        options={{ 
          title: 'Help Centre',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
          animationDuration: 250,
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_bottom',
          animationDuration: 300,
        }} 
      />
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          title: 'Update Personal Info',
          headerStyle: {
            backgroundColor: '#fffcf6',
          },
          headerTintColor: '#4f4f4f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_bottom',
          animationDuration: 300,
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}