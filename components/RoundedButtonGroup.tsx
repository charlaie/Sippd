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
    <View className={`overflow-hidden rounded-2xl bg-white shadow-sm ${className}`}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center justify-between p-4 ${
            index < items.length - 1 ? 'border-b border-gray-100' : ''
          }`}
          onPress={item.onPress}
          activeOpacity={0.7}>
          <View className="flex-1 flex-row items-center">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              {item.icon}
            </View>
            <Text className="flex-1 text-base font-medium text-primary-text">{item.title}</Text>
          </View>
          <ChevronRight size={20} color="#707070" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
