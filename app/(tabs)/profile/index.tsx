import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Ticket,
  User,
  MessageSquare,
  ChartBar as BarChart3,
  Circle as HelpCircle,
  Settings,
} from 'lucide-react-native';
import RoundedButtonGroup from '@/components/RoundedButtonGroup';

export default function ProfilePage() {
  const menuItems = [
    {
      icon: <Ticket size={20} color="#707070" />,
      title: 'Vouchers',
      onPress: () => router.push('/profile/vouchers'),
    },
    {
      icon: <User size={20} color="#707070" />,
      title: 'My Payment Details',
      onPress: () => router.push('/profile/payment-details'),
    },
    {
      icon: <MessageSquare size={20} color="#707070" />,
      title: 'Reviews',
      onPress: () => router.push('/profile/reviews'),
    },
    {
      icon: <BarChart3 size={20} color="#707070" />,
      title: 'My Tier List',
      onPress: () => router.push('/profile/tier-list'),
    },
  ];

  const supportItems = [
    {
      icon: <HelpCircle size={20} color="#707070" />,
      title: 'Help Centre',
      onPress: () => router.push('/profile/help-centre'),
    },
    {
      icon: <Settings size={20} color="#707070" />,
      title: 'Settings',
      onPress: () => router.push('/profile/settings'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-6 pt-4">
          <Text className="text-center text-2xl font-bold text-primary-text">Profile</Text>
        </View>

        {/* Profile Section */}
        <View className="mb-8 px-6">
          <View className="items-center">
            {/* Profile Image */}
            <View className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-secondary-primary">
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200',
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            {/* Name */}
            <Text className="mb-4 text-2xl font-bold text-primary-text">Charli</Text>

            {/* Update Button */}
            <TouchableOpacity
              className="rounded-full border border-secondary-primary px-6 py-2"
              onPress={() => router.push('/profile/edit-profile')}
              activeOpacity={0.7}>
              <Text className="text-sm font-medium text-secondary-primary">
                Update personal info
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items Group */}
        <View className="mb-6 px-6">
          <RoundedButtonGroup items={menuItems} />
        </View>

        {/* Support Section Group */}
        <View className="mb-8 px-6">
          <RoundedButtonGroup items={supportItems} />
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
