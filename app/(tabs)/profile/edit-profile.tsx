import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Save, User } from 'lucide-react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  maxLength?: number;
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  maxLength,
}: InputFieldProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-base font-semibold text-primary-text">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        multiline={multiline}
        maxLength={maxLength}
        className={`rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-primary-text ${
          multiline ? 'min-h-[80px]' : 'h-12'
        }`}
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
      {maxLength && (
        <Text className="mt-1 text-right text-xs text-accent-text">
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
}

export default function EditProfilePage() {
  const [name, setName] = useState('Charli');
  const [email, setEmail] = useState('charli@example.com');
  const [phone, setPhone] = useState('+852 1234 5678');
  const [bio, setBio] = useState(
    "Bubble tea enthusiast exploring Hong Kong's best drink spots! 🧋"
  );
  const [location, setLocation] = useState('Hong Kong');

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile...');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View className="mb-8 mt-4 items-center">
          <View className="relative">
            <View className="h-24 w-24 overflow-hidden rounded-full border-2 border-secondary-primary">
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200',
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute -bottom-2 -right-2 h-8 w-8 items-center justify-center rounded-full bg-secondary-primary">
              <Camera size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-sm text-accent-text">Tap to change profile picture</Text>
        </View>

        {/* Form Fields */}
        <InputField
          label="Display Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          maxLength={50}
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />

        <InputField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
        />

        <InputField
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
        />

        <InputField
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself..."
          multiline
          maxLength={200}
        />

        {/* Preferences Section */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Preferences</Text>

          <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="mb-1 text-base font-medium text-primary-text">
                  Favorite Drink Type
                </Text>
                <Text className="text-sm text-accent-text">Milk Tea</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm font-medium text-secondary-primary">Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="mb-1 text-base font-medium text-primary-text">
                  Preferred Sugar Level
                </Text>
                <Text className="text-sm text-accent-text">50%</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm font-medium text-secondary-primary">Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="mb-6 items-center rounded-2xl bg-secondary-primary p-4"
          onPress={handleSave}
          activeOpacity={0.7}>
          <View className="flex-row items-center">
            <Save size={20} color="#ffffff" />
            <Text className="ml-2 text-base font-bold text-white">Save Changes</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
