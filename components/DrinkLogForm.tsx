import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Coffee,
  Droplets,
  Snowflake,
  Milk,
  Package,
  CupSoda as Cup,
  Save,
  CircleAlert as AlertCircle,
  Check,
} from 'lucide-react-native';
import { useDrinkStore } from '@/store/drinkStore';
import { useUIStore } from '@/store/uiStore';

const drinkSchema = z.object({
  drinkName: z.string().min(1, 'Drink name is required').max(50, 'Name too long'),
  shopName: z.string().min(1, 'Shop name is required').max(50, 'Name too long'),
  drinkType: z.string().min(1, 'Please select a drink type'),
  sugarLevel: z.string().min(1, 'Please select sugar level'),
  iceLevel: z.string().min(1, 'Please select ice level'),
  milkType: z.string().min(1, 'Please select milk type'),
  size: z.string().min(1, 'Please select size'),
  cupType: z.string().min(1, 'Please select cup type'),
  extraNotes: z.string().max(200, 'Notes too long').optional(),
});

type DrinkFormData = z.infer<typeof drinkSchema>;

const drinkTypes = [
  { id: 'milk-tea', label: 'Milk Tea', icon: Coffee },
  { id: 'tea', label: 'Tea', icon: Coffee },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'juice', label: 'Juice', icon: Droplets },
  { id: 'smoothie', label: 'Smoothie', icon: Droplets },
  { id: 'others', label: 'Others', icon: Coffee },
];

const sugarLevels = [
  { id: '0', label: '0%' },
  { id: '25', label: '25%' },
  { id: '50', label: '50%' },
  { id: '75', label: '75%' },
  { id: '100', label: '100%' },
];

const iceLevels = [
  { id: 'no', label: 'No Ice', icon: Snowflake },
  { id: 'light', label: 'Light', icon: Snowflake },
  { id: 'regular', label: 'Regular', icon: Snowflake },
  { id: 'extra', label: 'Extra', icon: Snowflake },
];

const milkTypes = [
  { id: 'dairy', label: 'Dairy Milk' },
  { id: 'oat', label: 'Oat Milk' },
  { id: 'almond', label: 'Almond Milk' },
  { id: 'soy', label: 'Soy Milk' },
  { id: 'coconut', label: 'Coconut Milk' },
  { id: 'no-milk', label: 'No Milk' },
];

const sizes = [
  { id: 'small', label: 'Small (12oz)' },
  { id: 'medium', label: 'Medium (16oz)' },
  { id: 'large', label: 'Large (20oz)' },
  { id: 'extra-large', label: 'Extra Large (24oz)' },
];

const cupTypes = [
  { id: 'plastic', label: 'Plastic Cup' },
  { id: 'paper', label: 'Paper Cup' },
  { id: 'glass', label: 'Glass' },
  { id: 'reusable', label: 'Reusable Cup' },
];

interface SelectionButtonsProps {
  options: { id: string; label: string; icon?: any }[];
  value: string;
  onSelect: (value: string) => void;
  error?: string;
  columns?: number;
}

function SelectionButtons({ options, value, onSelect, error, columns = 2 }: SelectionButtonsProps) {
  return (
    <View>
      <View className="flex-row flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = value === option.id;
          const IconComponent = option.icon;

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => onSelect(option.id)}
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

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  required?: boolean;
}

function TextInputField({
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

export default function DrinkLogForm() {
  const { addDrink, isLoading, error, clearError } = useDrinkStore();
  const { closeDrinkLogDrawer } = useUIStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<DrinkFormData>({
    resolver: zodResolver(drinkSchema),
    defaultValues: {
      drinkName: '',
      shopName: '',
      drinkType: '',
      sugarLevel: '',
      iceLevel: '',
      milkType: '',
      size: '',
      cupType: '',
      extraNotes: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: DrinkFormData) => {
    try {
      clearError();
      await addDrink(data);

      // Show success state
      setShowSuccess(true);

      // Reset form and close drawer after delay
      setTimeout(() => {
        reset();
        setShowSuccess(false);
        closeDrinkLogDrawer();
      }, 1500);
    } catch (error) {
      // Error is handled by the store
      if (Platform.OS === 'web') {
        // Web fallback for error display
        console.error('Failed to save drink:', error);
      }
    }
  };

  if (showSuccess) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-green-500">
          <Check size={40} color="#ffffff" />
        </View>
        <Text className="mb-2 text-2xl font-bold text-primary-text">Drink Logged!</Text>
        <Text className="text-center text-accent-text">
          Your drink has been successfully saved to your collection.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-6"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View className="mb-8 border-b border-gray-100 py-6">
        <Text className="text-center text-2xl font-bold text-primary-text">Log Your Drink</Text>
        <Text className="mt-2 text-center text-accent-text">
          Keep track of your favorite beverages
        </Text>
      </View>

      {/* Error Display */}
      {error && (
        <View className="mb-8 flex-row items-center rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle size={20} color="#ef4444" />
          <Text className="ml-2 flex-1 text-red-600">{error}</Text>
          <TouchableOpacity onPress={clearError}>
            <Text className="font-medium text-red-600">Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Basic Information */}
      <View className="mb-10">
        <Text className="mb-6 text-xl font-bold text-primary-text">Basic Information</Text>

        <Controller
          control={control}
          name="drinkName"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Drink Name"
              value={value}
              onChangeText={onChange}
              placeholder="e.g. Brown Sugar Milk Tea"
              error={errors.drinkName?.message}
              maxLength={50}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="shopName"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Shop Name"
              value={value}
              onChangeText={onChange}
              placeholder="e.g. Tiger Sugar"
              error={errors.shopName?.message}
              maxLength={50}
              required
            />
          )}
        />
      </View>

      {/* Drink Type */}
      <View className="mb-10">
        <Text className="mb-6 text-xl font-bold text-primary-text">Drink Type</Text>
        <Controller
          control={control}
          name="drinkType"
          render={({ field: { onChange, value } }) => (
            <SelectionButtons
              options={drinkTypes}
              value={value}
              onSelect={onChange}
              error={errors.drinkType?.message}
              columns={2}
            />
          )}
        />
      </View>

      {/* Customization */}
      <View className="mb-10">
        <Text className="mb-6 text-xl font-bold text-primary-text">Customization</Text>

        {/* Sugar Level */}
        <View className="mb-8">
          <Text className="mb-4 text-lg font-semibold text-primary-text">
            Sugar Level <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="sugarLevel"
            render={({ field: { onChange, value } }) => (
              <SelectionButtons
                options={sugarLevels}
                value={value}
                onSelect={onChange}
                error={errors.sugarLevel?.message}
                columns={3}
              />
            )}
          />
        </View>

        {/* Ice Level */}
        <View className="mb-8">
          <Text className="mb-4 text-lg font-semibold text-primary-text">
            Ice Level <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="iceLevel"
            render={({ field: { onChange, value } }) => (
              <SelectionButtons
                options={iceLevels}
                value={value}
                onSelect={onChange}
                error={errors.iceLevel?.message}
              />
            )}
          />
        </View>

        {/* Milk Type */}
        <View className="mb-8">
          <Text className="mb-4 text-lg font-semibold text-primary-text">
            Milk Type <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="milkType"
            render={({ field: { onChange, value } }) => (
              <SelectionButtons
                options={milkTypes}
                value={value}
                onSelect={onChange}
                error={errors.milkType?.message}
                columns={2}
              />
            )}
          />
        </View>
      </View>

      {/* Size & Cup */}
      <View className="mb-10">
        <Text className="mb-6 text-xl font-bold text-primary-text">Size & Cup</Text>

        {/* Size */}
        <View className="mb-8">
          <Text className="mb-4 text-lg font-semibold text-primary-text">
            Size <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="size"
            render={({ field: { onChange, value } }) => (
              <SelectionButtons
                options={sizes}
                value={value}
                onSelect={onChange}
                error={errors.size?.message}
              />
            )}
          />
        </View>

        {/* Cup Type */}
        <View className="mb-8">
          <Text className="mb-4 text-lg font-semibold text-primary-text">
            Cup Type <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="cupType"
            render={({ field: { onChange, value } }) => (
              <SelectionButtons
                options={cupTypes}
                value={value}
                onSelect={onChange}
                error={errors.cupType?.message}
              />
            )}
          />
        </View>
      </View>

      {/* Extra Notes */}
      <View className="mb-10">
        <Controller
          control={control}
          name="extraNotes"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Extra Notes"
              value={value || ''}
              onChangeText={onChange}
              placeholder="Any special requests or thoughts about this drink..."
              error={errors.extraNotes?.message}
              multiline
              maxLength={200}
            />
          )}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading || !isValid}
        className={`
          mb-8 flex-row items-center justify-center rounded-2xl py-4
          ${isLoading || !isValid ? 'bg-gray-300' : 'bg-secondary-primary'}
        `}>
        {isLoading ? (
          <>
            <View className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <Text className="text-lg font-bold text-white">Saving...</Text>
          </>
        ) : (
          <>
            <Save size={20} color="#ffffff" className="mr-2" />
            <Text className="text-lg font-bold text-white">Save Drink</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Bottom spacing for safe area */}
      <View className="h-8" />
    </ScrollView>
  );
}
