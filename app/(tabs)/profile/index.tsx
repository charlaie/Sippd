import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ticket, User, MessageSquare, ChartBar as BarChart3, Circle as HelpCircle, Settings } from 'lucide-react-native';
import RoundedButtonGroup from '@/components/RoundedButtonGroup';

export default function ProfilePage() {
  const menuItems = [
    {
      icon: <Ticket size={20} color="#707070" />,
      title: 'Vouchers',
      onPress: () => router.push('/profile/vouchers')
    },
    {
      icon: <User size={20} color="#707070" />,
      title: 'My Payment Details',
      onPress: () => router.push('/profile/payment-details')
    },
    {
      icon: <MessageSquare size={20} color="#707070" />,
      title: 'Reviews',
      onPress: () => router.push('/profile/reviews')
    },
    {
      icon: <BarChart3 size={20} color="#707070" />,
      title: 'My Tier List',
      onPress: () => router.push('/profile/tier-list')
    },
  ];

  const supportItems = [
    {
      icon: <HelpCircle size={20} color="#707070" />,
      title: 'Help Centre',
      onPress: () => router.push('/profile/help-centre')
    },
    {
      icon: <Settings size={20} color="#707070" />,
      title: 'Settings',
      onPress: () => router.push('/profile/settings')
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-primary-text text-2xl font-bold text-center">
            Profile
          </Text>
        </View>

        {/* Profile Section */}
        <View className="px-6 mb-8">
          <View className="items-center">
            {/* Profile Image */}
            <View className="w-24 h-24 rounded-full border-2 border-secondary-primary mb-4 overflow-hidden">
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            
            {/* Name */}
            <Text className="text-primary-text text-2xl font-bold mb-4">
              Charli
            </Text>
            
            {/* Update Button */}
            <TouchableOpacity 
              className="border border-secondary-primary rounded-full px-6 py-2"
              onPress={() => router.push('/profile/edit-profile')}
              activeOpacity={0.7}
            >
              <Text className="text-secondary-primary text-sm font-medium">
                Update personal info
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items Group */}
        <View className="px-6 mb-6">
          <RoundedButtonGroup items={menuItems} />
        </View>

        {/* Support Section Group */}
        <View className="px-6 mb-8">
          <RoundedButtonGroup items={supportItems} />
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}