import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle } from 'lucide-react-native';

interface SelectionButtonsProps {
  options: { id: string; label: string; icon?: any }[];
  value: string | undefined;
  onSelect: (value: string) => void;
  error?: string;
  columns?: number;
}

export function SelectionButtons({
  options,
  value,
  onSelect,
  error,
  columns = 2,
}: SelectionButtonsProps) {
  const handleSelect = (optionId: string) => {
    // If the option is already selected, unselect it
    if (value === optionId) {
      onSelect('');
    } else {
      onSelect(optionId);
    }
  };

  return (
    <View>
      <View className="flex-row flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = value === option.id;
          const IconComponent = option.icon;

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleSelect(option.id)}
              className={`
                min-w-[45%] flex-1 flex-row items-center justify-center rounded-2xl border-2 px-4 py-4
                ${
                  isSelected
                    ? 'border-secondary-primary bg-secondary-primary'
                    : 'border-gray-200 bg-white'
                }
                ${columns === 3 ? 'min-w-[30%]' : ''}
              `}
              style={{
                minHeight: 56,
                maxWidth: columns === 3 ? '30%' : '48%',
              }}>
              {IconComponent && (
                <IconComponent
                  size={18}
                  color={isSelected ? '#ffffff' : '#707070'}
                  className="mr-2"
                />
              )}
              <Text
                className={`text-center text-base font-medium ${
                  isSelected ? 'text-white' : 'text-accent-text'
                }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && (
        <View className="mt-2 flex-row items-center">
          <AlertCircle size={14} color="#ef4444" />
          <Text className="ml-1 text-xs text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
}
