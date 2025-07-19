import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, CircleAlert as AlertCircle } from 'lucide-react-native';

interface DatePickerFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
}

export function DatePickerField({
  label,
  value,
  onChange,
  error,
  required = false,
}: DatePickerFieldProps) {
  const [dateText, setDateText] = useState('');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDateChange = (text: string) => {
    setDateText(text);
    // Try to parse the date
    const parsedDate = new Date(text);
    if (!isNaN(parsedDate.getTime())) {
      onChange(parsedDate);
    }
  };

  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <View className="flex-row items-center rounded-2xl border-2 border-gray-200 bg-white px-4 py-4">
        <Calendar size={18} color="#707070" />
        <TextInput
          value={dateText || formatDate(value)}
          onChangeText={handleDateChange}
          placeholder="MM/DD/YYYY"
          placeholderTextColor="#a0a0a0"
          className="ml-2 flex-1 text-base text-primary-text"
        />
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
