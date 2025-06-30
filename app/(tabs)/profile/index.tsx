import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Ticket, 
  User, 
  MessageSquare, 
  BarChart3, 
  HelpCircle, 
  Settings, 
  ChevronRight 
} from 'lucide-react-native';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity 
      className="flex-row items-center justify-between bg-white rounded-2xl p-4 mb-3 shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
          {icon}
        </View>
        <Text className="text-primary-text text-base font-medium flex-1">
          {title}
        </Text>
      </View>
      <ChevronRight size={20} color="#707070" />
    </TouchableOpacity>
  );
}

export default function ProfilePage() {
  const menuItems = [
    {
      icon: <Ticket size={20} color="#707070" />,
      title: 'Vouchers',
      route: '/profile/vouchers'
    },
    {
      icon: <User size={20} color="#707070" />,
      title: 'My Payment Details',
      route: '/profile/payment-details'
    },
    {
      icon: <MessageSquare size={20} color="#707070" />,
      title: 'Reviews',
      route: '/profile/reviews'
    },
    {
      icon: <BarChart3 size={20} color="#707070" />,
      title: 'My Tier List',
      route: '/profile/tier-list'
    },
  ];

  const supportItems = [
    {
      icon: <HelpCircle size={20} color="#707070" />,
      title: 'Help Centre',
      route: '/profile/help-centre'
    },
    {
      icon: <Settings size={20} color="#707070" />,
      title: 'Settings',
      route: '/profile/settings'
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

        {/* Menu Items */}
        <View className="px-6 mb-6">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => router.push(item.route as any)}
            />
          ))}
        </View>

        {/* Support Section */}
        <View className="px-6 mb-8">
          {supportItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => router.push(item.route as any)}
            />
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}