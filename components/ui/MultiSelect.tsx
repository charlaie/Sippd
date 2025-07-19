import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, Check } from 'lucide-react-native';

interface MultiSelectProps {
  label: string;
  options: { id: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
  columns?: number;
}

export function MultiSelect({
  label,
  options,
  values,
  onChange,
  error,
  required = false,
  columns = 2,
}: MultiSelectProps) {
  const handleToggle = (optionId: string) => {
    const newValues = values.includes(optionId)
      ? values.filter((id) => id !== optionId)
      : [...values, optionId];
    onChange(newValues);
  };

  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = values.includes(option.id);

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleToggle(option.id)}
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
              {isSelected && <Check size={18} color="#ffffff" className="mr-2" />}
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

      {values.length > 0 && (
        <Text className="mt-2 text-sm text-accent-text">
          Selected: {values.length} item{values.length > 1 ? 's' : ''}
        </Text>
      )}

      {error && (
        <View className="mt-2 flex-row items-center">
          <AlertCircle size={14} color="#ef4444" />
          <Text className="ml-1 text-xs text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
}
