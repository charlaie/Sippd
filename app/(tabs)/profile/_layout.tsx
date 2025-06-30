import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
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
        }} 
      />
    </Stack>
  );
}