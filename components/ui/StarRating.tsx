import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Star, CircleAlert as AlertCircle } from 'lucide-react-native';

interface StarRatingProps {
  label: string;
  value: number;
  onChange: (rating: number) => void;
  error?: string;
  required?: boolean;
  maxRating?: number;
}

export function StarRating({
  label,
  value,
  onChange,
  error,
  required = false,
  maxRating = 5,
}: StarRatingProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <View className="flex-row items-center gap-2">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= value;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onChange(starValue)}
              className="rounded-lg p-2">
              <Star
                size={32}
                color={isFilled ? '#FFD700' : '#D1D5DB'}
                fill={isFilled ? '#FFD700' : 'none'}
              />
            </TouchableOpacity>
          );
        })}

        {value > 0 && (
          <Text className="ml-2 text-base text-accent-text">
            {value} out of {maxRating}
          </Text>
        )}
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
