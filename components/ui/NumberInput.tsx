import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, Plus, Minus } from 'lucide-react-native';

interface NumberInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  showStepper?: boolean;
}

export function NumberInput({
  label,
  value,
  onChange,
  error,
  required = false,
  min = 0,
  max = 999,
  step = 1,
  prefix,
  suffix,
  showStepper = false,
}: NumberInputProps) {
  const handleTextChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const numericText = text.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(numericText);

    if (isNaN(numValue)) {
      onChange(0);
    } else {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, (value || 0) + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, (value || 0) - step);
    onChange(newValue);
  };

  const displayValue = value === undefined ? '' : value.toString();
  const formatDisplayValue = () => {
    let formatted = displayValue;
    if (prefix) formatted = prefix + formatted;
    if (suffix) formatted = formatted + suffix;
    return formatted;
  };

  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <View className="flex-row items-center">
        {showStepper && (
          <TouchableOpacity
            onPress={handleDecrement}
            disabled={(value || 0) <= min}
            className={`
              mr-3 h-12 w-12 items-center justify-center rounded-xl border-2
              ${(value || 0) <= min ? 'border-gray-200 bg-gray-100' : 'border-gray-200 bg-white'}
            `}>
            <Minus size={18} color={(value || 0) <= min ? '#D1D5DB' : '#707070'} />
          </TouchableOpacity>
        )}

        <View className="flex-1">
          <TextInput
            value={showStepper ? formatDisplayValue() : displayValue}
            onChangeText={handleTextChange}
            placeholder={prefix ? `${prefix}0${suffix || ''}` : `0${suffix || ''}`}
            placeholderTextColor="#a0a0a0"
            keyboardType="numeric"
            className={`
              h-14 rounded-2xl border-2 border-gray-200 bg-white px-4 text-base text-primary-text
              ${error ? 'outline outline-2 outline-red-500' : ''}
            `}
            editable={!showStepper}
          />
        </View>

        {showStepper && (
          <TouchableOpacity
            onPress={handleIncrement}
            disabled={(value || 0) >= max}
            className={`
              ml-3 h-12 w-12 items-center justify-center rounded-xl border-2
              ${(value || 0) >= max ? 'border-gray-200 bg-gray-100' : 'border-gray-200 bg-white'}
            `}>
            <Plus size={18} color={(value || 0) >= max ? '#D1D5DB' : '#707070'} />
          </TouchableOpacity>
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
