import { View, Text, TextInput } from 'react-native';
import { CircleAlert as AlertCircle } from 'lucide-react-native';

interface TextInputFieldProps {
  label: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  required?: boolean;
}

export function TextInputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  maxLength,
  required = false,
}: TextInputFieldProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-semibold text-primary-text">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        multiline={multiline}
        maxLength={maxLength}
        className={`
          rounded-2xl border-2 border-gray-200 bg-white px-4 py-4 text-base text-primary-text
          ${error ? 'outline outline-2 outline-red-500' : ''}
          ${multiline ? 'min-h-[100px]' : 'h-14'}
        `}
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
      {maxLength && (
        <Text className="mt-2 text-right text-xs text-accent-text">
          {value.length}/{maxLength}
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
