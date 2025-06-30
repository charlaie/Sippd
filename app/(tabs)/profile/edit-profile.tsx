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

function InputField({ label, value, onChangeText, placeholder, multiline = false, maxLength }: InputFieldProps) {
  return (
    <View className="mb-6">
      <Text className="text-primary-text text-base font-semibold mb-3">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        multiline={multiline}
        maxLength={maxLength}
        className={`bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-primary-text text-base ${
          multiline ? 'min-h-[80px]' : 'h-12'
        }`}
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
      {maxLength && (
        <Text className="text-xs text-accent-text mt-1 text-right">
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
  const [bio, setBio] = useState('Bubble tea enthusiast exploring Hong Kong\'s best drink spots! 🧋');
  const [location, setLocation] = useState('Hong Kong');

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile...');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View className="items-center mb-8 mt-4">
          <View className="relative">
            <View className="w-24 h-24 rounded-full border-2 border-secondary-primary overflow-hidden">
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary-primary rounded-full items-center justify-center">
              <Camera size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="text-accent-text text-sm mt-3">
            Tap to change profile picture
          </Text>
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
          <Text className="text-primary-text text-xl font-bold mb-4">
            Preferences
          </Text>
          
          <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-primary-text text-base font-medium mb-1">
                  Favorite Drink Type
                </Text>
                <Text className="text-accent-text text-sm">
                  Milk Tea
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-secondary-primary text-sm font-medium">
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-primary-text text-base font-medium mb-1">
                  Preferred Sugar Level
                </Text>
                <Text className="text-accent-text text-sm">
                  50%
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-secondary-primary text-sm font-medium">
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-secondary-primary rounded-2xl p-4 items-center mb-6"
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <Save size={20} color="#ffffff" />
            <Text className="text-white text-base font-bold ml-2">
              Save Changes
            </Text>
          </View>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}