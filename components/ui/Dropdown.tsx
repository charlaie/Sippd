import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { ChevronDown, Check, CircleAlert as AlertCircle } from 'lucide-react-native';

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | undefined;
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  error,
  required = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.id === value);

  const handleSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
  };

  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={`
          h-14 flex-row items-center justify-between rounded-2xl border-2 bg-white px-4
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}>
        <Text className={`text-base ${selectedOption ? 'text-primary-text' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown
          size={20}
          color={error ? '#ef4444' : '#707070'}
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity
          className="flex-1 justify-center bg-black/50 px-8"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}>
          <TouchableOpacity activeOpacity={1} className="max-h-80 rounded-2xl bg-white">
            <View className="border-b border-gray-200 p-4">
              <Text className="text-center text-lg font-semibold text-primary-text">{label}</Text>
            </View>

            <ScrollView className="max-h-64">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option.id)}
                  className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
                  <Text className="flex-1 text-base text-primary-text">{option.label}</Text>
                  {value === option.id && <Check size={20} color="#10b981" />}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="border-t border-gray-200 p-4">
              <Text className="text-center text-base font-medium text-gray-600">Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {error && (
        <View className="mt-2 flex-row items-center">
          <AlertCircle size={14} color="#ef4444" />
          <Text className="ml-1 text-xs text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
}
