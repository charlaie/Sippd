import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Coffee,
  Save,
  CircleAlert as AlertCircle,
  Check,
  Droplets,
  CupSoda as Cup,
} from 'lucide-react-native';
import { useDrinkStore } from '@/store/drinkStore';
import { useUIStore } from '@/store/uiStore';
import { TextInputField } from '@/components/ui/TextInputField';
import { Dropdown } from '@/components/ui/Dropdown';
import { DatePickerField } from '@/components/ui/DatePicker';
import { StarRating } from '@/components/ui/StarRating';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { NumberInput } from '@/components/ui/NumberInput';

// Base form data that's always present
const baseDrinkSchema = z.object({
  drinkName: z.string().min(1, 'Drink name is required').max(100, 'Name too long'),
  date: z.date(),
  storeLocation: z.string().max(100, 'Location name too long').optional(),
  notes: z.string().max(500, 'Notes too long').optional(),
  rating: z.number().min(1, 'Please provide a rating').max(5),
});

// Coffee-specific schema
const coffeeSchema = baseDrinkSchema.extend({
  drinkType: z.literal('coffee'),
  coffeeTemp: z.string().min(1, 'Temperature is required'),
  coffeeSize: z.string().min(1, 'Size is required'),
  coffeeMilkType: z.string().optional(),
  coffeeSweetener: z.string().optional(),
  espressoShots: z.number().optional(),
  coffeePrice: z.number().optional(),
});

// Tea-specific schema
const teaSchema = baseDrinkSchema.extend({
  drinkType: z.literal('tea'),
  teaTemp: z.string().min(1, 'Temperature is required'),
  teaType: z.string().min(1, 'Tea type is required'),
  teaSize: z.string().optional(),
  teaSweetness: z.string().optional(),
  teaMilkType: z.string().optional(),
  lemonFruit: z.boolean().optional(),
  teaPrice: z.number().optional(),
});

// Boba-specific schema
const bobaSchema = baseDrinkSchema.extend({
  drinkType: z.literal('boba'),
  bobaTemp: z.string().min(1, 'Temperature is required'),
  bobaSize: z.string().min(1, 'Size is required'),
  bobaSugarLevel: z.string().min(1, 'Sugar level is required'),
  bobaIceLevel: z.string().min(1, 'Ice level is required'),
  bobaToppings: z.array(z.string()).optional(),
  bobaDrinkBase: z.string().min(1, 'Drink base is required'),
  bobaPrice: z.number().optional(),
});

// Smoothie-specific schema
const smoothieSchema = baseDrinkSchema.extend({
  drinkType: z.literal('smoothie'),
  smoothieSize: z.string().min(1, 'Size is required'),
  smoothieFlavor: z.string().min(1, 'Flavor is required'),
  smoothieAddIns: z.array(z.string()).optional(),
  smoothieSweetness: z.string().optional(),
  smoothieBaseLiquid: z.string().min(1, 'Base liquid is required'),
  smoothiePrice: z.number().optional(),
});

// Juice-specific schema
const juiceSchema = baseDrinkSchema.extend({
  drinkType: z.literal('juice'),
  juiceSize: z.string().min(1, 'Size is required'),
  juiceCarbonation: z.string().min(1, 'Carbonation type is required'),
  juiceFlavor: z.string().min(1, 'Flavor is required'),
  juicePrice: z.number().optional(),
});

// Discriminated union schema
const drinkSchema = z.discriminatedUnion('drinkType', [
  coffeeSchema,
  teaSchema,
  bobaSchema,
  smoothieSchema,
  juiceSchema,
]);

type DrinkFormData = z.infer<typeof drinkSchema>;
type DrinkType = DrinkFormData['drinkType'];

// Options for different drink types and their conditional fields
const drinkTypes = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'boba', label: 'Boba/Bubble Tea' },
  { id: 'smoothie', label: 'Smoothie' },
  { id: 'juice', label: 'Juice' },
];

const temperatureOptions = [
  { id: 'hot', label: 'Hot' },
  { id: 'iced', label: 'Iced' },
  { id: 'blended', label: 'Blended' },
];

const sizeOptions = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
  { id: 'grande', label: 'Grande' },
  { id: 'venti', label: 'Venti' },
];

const milkTypeOptions = [
  { id: 'whole', label: 'Whole Milk' },
  { id: 'skim', label: 'Skim Milk' },
  { id: 'oat', label: 'Oat Milk' },
  { id: 'almond', label: 'Almond Milk' },
  { id: 'soy', label: 'Soy Milk' },
  { id: 'half-and-half', label: 'Half & Half' },
  { id: 'none', label: 'None' },
];

const teaTypeOptions = [
  { id: 'black', label: 'Black Tea' },
  { id: 'green', label: 'Green Tea' },
  { id: 'herbal', label: 'Herbal Tea' },
  { id: 'oolong', label: 'Oolong Tea' },
  { id: 'white', label: 'White Tea' },
  { id: 'chai', label: 'Chai' },
];

const sweetnessOptions = [
  { id: 'unsweetened', label: 'Unsweetened' },
  { id: 'light', label: 'Light Sweet' },
  { id: 'regular', label: 'Regular Sweet' },
  { id: 'extra', label: 'Extra Sweet' },
];

const bobaSugarLevels = [
  { id: '0', label: '0%' },
  { id: '25', label: '25%' },
  { id: '50', label: '50%' },
  { id: '75', label: '75%' },
  { id: '100', label: '100%' },
];

const bobaIceLevels = [
  { id: 'no-ice', label: 'No Ice' },
  { id: 'less-ice', label: 'Less Ice' },
  { id: 'regular-ice', label: 'Regular Ice' },
  { id: 'extra-ice', label: 'Extra Ice' },
];

const bobaToppingsOptions = [
  { id: 'boba-pearls', label: 'Boba/Pearls' },
  { id: 'lychee-jelly', label: 'Lychee Jelly' },
  { id: 'grass-jelly', label: 'Grass Jelly' },
  { id: 'pudding', label: 'Pudding' },
  { id: 'red-bean', label: 'Red Bean' },
  { id: 'cheese-foam', label: 'Cheese Foam' },
  { id: 'aloe-vera', label: 'Aloe Vera' },
  { id: 'popping-boba', label: 'Popping Boba' },
];

const bobaDrinkBaseOptions = [
  { id: 'milk-tea', label: 'Milk Tea' },
  { id: 'fruit-tea', label: 'Fruit Tea' },
  { id: 'slush', label: 'Slush' },
  { id: 'yakult', label: 'Yakult' },
];

const smoothieAddInsOptions = [
  { id: 'protein-powder', label: 'Protein Powder' },
  { id: 'spinach', label: 'Spinach' },
  { id: 'chia-seeds', label: 'Chia Seeds' },
  { id: 'yogurt', label: 'Yogurt' },
  { id: 'almond-butter', label: 'Almond Butter' },
  { id: 'spirulina', label: 'Spirulina' },
  { id: 'collagen', label: 'Collagen' },
];

const smoothieBaseLiquidOptions = [
  { id: 'water', label: 'Water' },
  { id: 'milk', label: 'Milk' },
  { id: 'juice', label: 'Juice' },
  { id: 'yogurt', label: 'Yogurt' },
  { id: 'coconut-water', label: 'Coconut Water' },
];

const juiceCarbonationOptions = [
  { id: 'carbonated', label: 'Carbonated' },
  { id: 'still', label: 'Still' },
];

const juiceSizeOptions = [
  ...sizeOptions,
  { id: 'can', label: 'Can' },
  { id: 'bottle', label: 'Bottle' },
  { id: '1-liter', label: '1 Liter' },
];

export default function RefactoredDrinkLogForm() {
  const { addDrink, isLoading, error, clearError } = useDrinkStore();
  const { closeDrinkLogDrawer } = useUIStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentDrinkType, setCurrentDrinkType] = useState<DrinkType>('coffee');

  // Create separate forms for each drink type to avoid TypeScript issues
  const createForm = (drinkType: DrinkType) => {
    const getSchema = () => {
      switch (drinkType) {
        case 'coffee':
          return coffeeSchema;
        case 'tea':
          return teaSchema;
        case 'boba':
          return bobaSchema;
        case 'smoothie':
          return smoothieSchema;
        case 'juice':
          return juiceSchema;
      }
    };

    const getDefaultValues = () => {
      const base = {
        drinkName: '',
        date: new Date(),
        storeLocation: '',
        notes: '',
        rating: 0,
      };

      switch (drinkType) {
        case 'coffee':
          return {
            ...base,
            drinkType: 'coffee' as const,
            coffeeTemp: '',
            coffeeSize: '',
            coffeeMilkType: '',
            coffeeSweetener: '',
            espressoShots: undefined,
            coffeePrice: undefined,
          };
        case 'tea':
          return {
            ...base,
            drinkType: 'tea' as const,
            teaTemp: '',
            teaType: '',
            teaSize: '',
            teaSweetness: '',
            teaMilkType: '',
            lemonFruit: false,
            teaPrice: undefined,
          };
        case 'boba':
          return {
            ...base,
            drinkType: 'boba' as const,
            bobaTemp: '',
            bobaSize: '',
            bobaSugarLevel: '',
            bobaIceLevel: '',
            bobaToppings: [],
            bobaDrinkBase: '',
            bobaPrice: undefined,
          };
        case 'smoothie':
          return {
            ...base,
            drinkType: 'smoothie' as const,
            smoothieSize: '',
            smoothieFlavor: '',
            smoothieAddIns: [],
            smoothieSweetness: '',
            smoothieBaseLiquid: '',
            smoothiePrice: undefined,
          };
        case 'juice':
          return {
            ...base,
            drinkType: 'juice' as const,
            juiceSize: '',
            juiceCarbonation: '',
            juiceFlavor: '',
            juicePrice: undefined,
          };
      }
    };

    return useForm({
      resolver: zodResolver(getSchema()),
      defaultValues: getDefaultValues(),
      mode: 'onChange',
    });
  };

  const form = createForm(currentDrinkType);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const handleDrinkTypeChange = (newType: string) => {
    setCurrentDrinkType(newType as DrinkType);
  };

  const onSubmit = async (data: any) => {
    try {
      clearError();
      // Convert discriminated union data back to the format expected by addDrink
      const drinkData = {
        drinkName: data.drinkName,
        shopName: data.storeLocation || '',
        drinkType: data.drinkType,
        sugarLevel: '',
        iceLevel: '',
        milkType: '',
        size: '',
        cupType: '',
        extraNotes: data.notes || '',
      };
      await addDrink(drinkData);

      // Show success state
      setShowSuccess(true);

      // Reset form and close drawer after delay
      setTimeout(() => {
        reset();
        setShowSuccess(false);
        closeDrinkLogDrawer();
      }, 1500);
    } catch (error) {
      console.error('Failed to save drink:', error);
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
          Comprehensive drink tracking with detailed customization
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

      {/* Universal Fields - Always Shown */}
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
              placeholder="e.g. Espresso, Green Tea, Mango Smoothie"
              error={errors.drinkName?.message}
              maxLength={100}
              required
            />
          )}
        />

        <Dropdown
          label="Drink Type"
          options={drinkTypes}
          value={currentDrinkType}
          onSelect={handleDrinkTypeChange}
          required
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DatePickerField
              label="Date"
              value={value}
              onChange={onChange}
              error={errors.date?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="storeLocation"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Store/Location"
              value={value || ''}
              onChangeText={onChange}
              placeholder="e.g. Starbucks, Home, Local Cafe"
              error={errors.storeLocation?.message}
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <StarRating
              label="Rating"
              value={value}
              onChange={onChange}
              error={errors.rating?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInputField
              label="Notes"
              value={value || ''}
              onChangeText={onChange}
              placeholder="Personal thoughts, specific details..."
              error={errors.notes?.message}
              multiline
              maxLength={500}
            />
          )}
        />
      </View>

      {/* Conditional Fields Based on Drink Type */}
      {currentDrinkType === 'coffee' && (
        <View className="mb-10">
          <Text className="mb-6 text-xl font-bold text-primary-text">Coffee Details</Text>

          <Controller
            control={control}
            name="coffeeTemp"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Temperature"
                options={temperatureOptions}
                value={value}
                onSelect={onChange}
                error={errors.coffeeTemp?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="coffeeSize"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Size"
                options={sizeOptions}
                value={value}
                onSelect={onChange}
                error={errors.coffeeSize?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="coffeeMilkType"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Milk Type"
                options={milkTypeOptions}
                value={value}
                onSelect={onChange}
                error={errors.coffeeMilkType?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="coffeeSweetener"
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Sweetener/Syrup"
                value={value || ''}
                onChangeText={onChange}
                placeholder="e.g. Vanilla Syrup (2 pumps), Sugar, Honey"
                error={errors.coffeeSweetener?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="espressoShots"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Espresso Shots"
                value={value}
                onChange={onChange}
                error={errors.espressoShots?.message}
                min={0}
                max={6}
                step={1}
                showStepper
              />
            )}
          />

          <Controller
            control={control}
            name="coffeePrice"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Price"
                value={value}
                onChange={onChange}
                error={errors.coffeePrice?.message}
                min={0}
                max={50}
                prefix="$"
              />
            )}
          />
        </View>
      )}

      {currentDrinkType === 'tea' && (
        <View className="mb-10">
          <Text className="mb-6 text-xl font-bold text-primary-text">Tea Details</Text>

          <Controller
            control={control}
            name="teaTemp"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Temperature"
                options={temperatureOptions.slice(0, 2)}
                value={value}
                onSelect={onChange}
                error={errors.teaTemp?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="teaType"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Tea Type"
                options={teaTypeOptions}
                value={value}
                onSelect={onChange}
                error={errors.teaType?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="teaSize"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Size"
                options={sizeOptions}
                value={value}
                onSelect={onChange}
                error={errors.teaSize?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="teaSweetness"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Sweetness Level"
                options={sweetnessOptions}
                value={value}
                onSelect={onChange}
                error={errors.teaSweetness?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="teaMilkType"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Milk Type (for milk teas)"
                options={milkTypeOptions}
                value={value}
                onSelect={onChange}
                error={errors.teaMilkType?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lemonFruit"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Lemon/Fruit Slice"
                options={[
                  { id: 'true', label: 'Yes' },
                  { id: 'false', label: 'No' },
                ]}
                value={value ? 'true' : 'false'}
                onSelect={(val) => onChange(val === 'true')}
                error={errors.lemonFruit?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="teaPrice"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Price"
                value={value}
                onChange={onChange}
                error={errors.teaPrice?.message}
                min={0}
                max={50}
                prefix="$"
              />
            )}
          />
        </View>
      )}

      {currentDrinkType === 'boba' && (
        <View className="mb-10">
          <Text className="mb-6 text-xl font-bold text-primary-text">Boba/Bubble Tea Details</Text>

          <Controller
            control={control}
            name="bobaTemp"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Temperature"
                options={temperatureOptions}
                value={value}
                onSelect={onChange}
                error={errors.bobaTemp?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="bobaSize"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Size"
                options={sizeOptions}
                value={value}
                onSelect={onChange}
                error={errors.bobaSize?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="bobaSugarLevel"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Sugar Level"
                options={bobaSugarLevels}
                value={value}
                onSelect={onChange}
                error={errors.bobaSugarLevel?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="bobaIceLevel"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Ice Level"
                options={bobaIceLevels}
                value={value}
                onSelect={onChange}
                error={errors.bobaIceLevel?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="bobaToppings"
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                label="Toppings"
                options={bobaToppingsOptions}
                values={value || []}
                onChange={onChange}
                error={errors.bobaToppings?.message}
                columns={2}
              />
            )}
          />

          <Controller
            control={control}
            name="bobaDrinkBase"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Drink Base"
                options={bobaDrinkBaseOptions}
                value={value}
                onSelect={onChange}
                error={errors.bobaDrinkBase?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="bobaPrice"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Price"
                value={value}
                onChange={onChange}
                error={errors.bobaPrice?.message}
                min={0}
                max={50}
                prefix="$"
              />
            )}
          />
        </View>
      )}

      {currentDrinkType === 'smoothie' && (
        <View className="mb-10">
          <Text className="mb-6 text-xl font-bold text-primary-text">Smoothie Details</Text>

          <Controller
            control={control}
            name="smoothieSize"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Size"
                options={sizeOptions}
                value={value}
                onSelect={onChange}
                error={errors.smoothieSize?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="smoothieFlavor"
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Fruit/Flavor Profile"
                value={value || ''}
                onChangeText={onChange}
                placeholder="e.g. Berry Blend, Tropical, Green, Chocolate"
                error={errors.smoothieFlavor?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="smoothieAddIns"
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                label="Add-ins/Boosts"
                options={smoothieAddInsOptions}
                values={value || []}
                onChange={onChange}
                error={errors.smoothieAddIns?.message}
                columns={2}
              />
            )}
          />

          <Controller
            control={control}
            name="smoothieSweetness"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Sweetness Level"
                options={sweetnessOptions}
                value={value}
                onSelect={onChange}
                error={errors.smoothieSweetness?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="smoothieBaseLiquid"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Base Liquid"
                options={smoothieBaseLiquidOptions}
                value={value}
                onSelect={onChange}
                error={errors.smoothieBaseLiquid?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="smoothiePrice"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Price"
                value={value}
                onChange={onChange}
                error={errors.smoothiePrice?.message}
                min={0}
                max={50}
                prefix="$"
              />
            )}
          />
        </View>
      )}

      {currentDrinkType === 'juice' && (
        <View className="mb-10">
          <Text className="mb-6 text-xl font-bold text-primary-text">Juice Details</Text>

          <Controller
            control={control}
            name="juiceSize"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Size"
                options={juiceSizeOptions}
                value={value}
                onSelect={onChange}
                error={errors.juiceSize?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="juiceCarbonation"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Carbonated/Still"
                options={juiceCarbonationOptions}
                value={value}
                onSelect={onChange}
                error={errors.juiceCarbonation?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="juiceFlavor"
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Flavor/Type"
                value={value || ''}
                onChangeText={onChange}
                placeholder="e.g. Orange, Apple, Cola, Lemon-Lime, Grape"
                error={errors.juiceFlavor?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="juicePrice"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Price"
                value={value}
                onChange={onChange}
                error={errors.juicePrice?.message}
                min={0}
                max={50}
                prefix="$"
              />
            )}
          />
        </View>
      )}

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
