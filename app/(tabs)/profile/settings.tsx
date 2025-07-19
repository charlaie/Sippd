import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Shield,
  Globe,
  Moon,
  Volume2,
  ChevronRight,
  LogOut,
  Trash2,
} from 'lucide-react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  destructive?: boolean;
}

function SettingItem({
  icon,
  title,
  description,
  onPress,
  rightElement,
  destructive = false,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
            {icon}
          </View>
          <View className="flex-1">
            <Text
              className={`text-base font-medium ${destructive ? 'text-red-500' : 'text-primary-text'}`}>
              {title}
            </Text>
            {description && <Text className="mt-1 text-sm text-accent-text">{description}</Text>}
          </View>
        </View>
        {rightElement || <ChevronRight size={20} color="#707070" />}
      </View>
    </TouchableOpacity>
  );
}

interface ToggleSettingProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function ToggleSetting({ icon, title, description, value, onValueChange }: ToggleSettingProps) {
  return (
    <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
            {icon}
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-primary-text">{title}</Text>
            <Text className="mt-1 text-sm text-accent-text">{description}</Text>
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#e5e7eb', true: '#d86a2b' }}
          thumbColor={value ? '#ffffff' : '#ffffff'}
        />
      </View>
    </View>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const accountSettings = [
    {
      icon: <Shield size={20} color="#707070" />,
      title: 'Privacy & Security',
      description: 'Manage your privacy settings',
      onPress: () => console.log('Privacy settings'),
    },
    {
      icon: <Globe size={20} color="#707070" />,
      title: 'Language',
      description: 'English',
      onPress: () => console.log('Language settings'),
    },
  ];

  const appSettings = [
    {
      icon: <Bell size={20} color="#707070" />,
      title: 'Push Notifications',
      description: 'Get notified about new vouchers and updates',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      icon: <Volume2 size={20} color="#707070" />,
      title: 'Sound Effects',
      description: 'Play sounds for app interactions',
      value: soundEffects,
      onValueChange: setSoundEffects,
    },
    {
      icon: <Moon size={20} color="#707070" />,
      title: 'Dark Mode',
      description: 'Use dark theme throughout the app',
      value: darkMode,
      onValueChange: setDarkMode,
    },
  ];

  const dangerZone = [
    {
      icon: <LogOut size={20} color="#ef4444" />,
      title: 'Sign Out',
      onPress: () => console.log('Sign out'),
      destructive: true,
    },
    {
      icon: <Trash2 size={20} color="#ef4444" />,
      title: 'Delete Account',
      description: 'Permanently delete your account and all data',
      onPress: () => console.log('Delete account'),
      destructive: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        <View className="mb-6 mt-4">
          <Text className="mb-4 text-xl font-bold text-primary-text">Account</Text>
          {accountSettings.map((setting, index) => (
            <SettingItem key={index} {...setting} />
          ))}
        </View>

        {/* App Settings */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">App Settings</Text>
          {appSettings.map((setting, index) => (
            <ToggleSetting key={index} {...setting} />
          ))}
        </View>

        {/* About */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">About</Text>
          <SettingItem
            icon={<Globe size={20} color="#707070" />}
            title="Terms of Service"
            onPress={() => console.log('Terms of service')}
          />
          <SettingItem
            icon={<Shield size={20} color="#707070" />}
            title="Privacy Policy"
            onPress={() => console.log('Privacy policy')}
          />
          <SettingItem
            icon={<Bell size={20} color="#707070" />}
            title="App Version"
            description="1.0.0 (Build 2024.12.1)"
            rightElement={<View />}
          />
        </View>

        {/* Danger Zone */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-red-500">Danger Zone</Text>
          {dangerZone.map((setting, index) => (
            <SettingItem key={index} {...setting} />
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
