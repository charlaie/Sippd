import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface ButtonGroupItem {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

interface RoundedButtonGroupProps {
  items: ButtonGroupItem[];
  className?: string;
}

export default function RoundedButtonGroup({ items, className = '' }: RoundedButtonGroupProps) {
  return (
    <View className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center justify-between p-4 ${
            index < items.length - 1 ? 'border-b border-gray-100' : ''
          }`}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
              {item.icon}
            </View>
            <Text className="text-primary-text text-base font-medium flex-1">
              {item.title}
            </Text>
          </View>
          <ChevronRight size={20} color="#707070" />
        </TouchableOpacity>
      ))}
    </View>
  );
}